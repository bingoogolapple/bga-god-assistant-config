// 按两次 Ctrl 翻译鼠标所在行数据
let lastCtrlTime = 0;
let lastMouseEvent = null;
const DOUBLE_CLICK_THRESHOLD = 300;
let currentTranslatePanel = null;

function addStyles() {
  if (document.getElementById('deepseek-translate-styles')) return;
  const style = document.createElement('style');
  style.id = 'deepseek-translate-styles';
  style.textContent = `
    .deepseek-translate-panel {
      opacity: 0;
      transform: translateY(-5px);
      transition: all 0.3s ease-out;
      cursor: pointer;
      display: block;
      box-sizing: border-box;
    }
    .deepseek-translate-panel.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}
addStyles();

document.addEventListener('mousemove', (event) => {
  lastMouseEvent = event;
});

document.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  if (event.key === 'Control' || event.key === 'Meta') {
    const currentTime = Date.now();
    if (currentTime - lastCtrlTime < DOUBLE_CLICK_THRESHOLD) {
      event.preventDefault();
      translateSelectedText();
    }
    lastCtrlTime = currentTime;
  }
});

function findParagraphElement(element) {
  const paragraphTags = ['P','DIV','ARTICLE','SECTION','LI','TD','TH','SPAN','A','H1','H2','H3','H4','H5','H6','HEADER','FOOTER','ASIDE','NAV','MAIN','BLOCKQUOTE','PRE','CODE','UL','OL','TABLE','ADDRESS','CAPTION','CITE','DFN','EM','STRONG'];
  let current = element && element.nodeType === Node.ELEMENT_NODE ? element : (element ? element.parentNode : null);
  while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body && current !== document.documentElement) {
    if (paragraphTags.includes(current.tagName) && current.textContent.trim().length > 0) {
      return current;
    }
    current = current.parentNode;
  }
  return null;
}

function getRangeFromElement(element) {
  const paragraphElement = findParagraphElement(element);
  if (!paragraphElement) return null;
  const range = document.createRange();
  range.selectNodeContents(paragraphElement);
  const text = range.toString().trim();
  if (!text) return null;
  return { text, range };
}

function getTextAtMousePosition() {
  if (!lastMouseEvent) return null;
  const element = document.elementFromPoint(lastMouseEvent.clientX, lastMouseEvent.clientY);
  if (!element) return null;
  return getRangeFromElement(element);
}

function getTextAtCursor() {
  const selection = window.getSelection();
  if (selection.isCollapsed && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let textNode = range.startContainer;
    if (textNode.nodeType === Node.TEXT_NODE) {
      const adjustedRange = range.cloneRange();
      adjustedRange.setStart(textNode, 0);
      adjustedRange.setEnd(textNode, textNode.textContent.length);
      const text = adjustedRange.toString().trim();
      if (text) return { text, range: adjustedRange };
    }
  }
  return null;
}

function getSelectionInfo() {
  const mouseInfo = getTextAtMousePosition();
  if (mouseInfo) return mouseInfo;
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  if (selectedText && selection.rangeCount > 0) {
    return { text: selectedText, range: selection.getRangeAt(0) };
  }
  return getTextAtCursor() || { text: '', range: null };
}

function cleanupTranslatePanel() {
  if (currentTranslatePanel) {
    currentTranslatePanel.remove();
    currentTranslatePanel = null;
  }
}

async function translateSelectedText() {
  try {
    const { text, range } = getSelectionInfo();
    if (!text || !range) return;
    cleanupTranslatePanel();
    currentTranslatePanel = createTranslatePanel('翻译中...', range);
    setTimeout(() => {
      if (currentTranslatePanel) currentTranslatePanel.classList.add('show');
    }, 50);
    speakWord(text);
    const translatedText = await translateWithAI(text);
    if (currentTranslatePanel) updateTranslatePanel(currentTranslatePanel, translatedText);
  } catch (error) {
    handleTranslationError(error);
  }
}

function handleTranslationError(error) {
  console.error('翻译出错:', error);
  const { range } = getSelectionInfo();
  cleanupTranslatePanel();
  if (range) {
    currentTranslatePanel = createTranslatePanel('翻译失败: ' + error.message, range);
    setTimeout(() => {
      if (currentTranslatePanel) currentTranslatePanel.classList.add('show');
    }, 50);
  }
}

function createTranslatePanel(text, range) {
  const selectedElement = range.commonAncestorContainer;
  const parentElement = selectedElement.nodeType === Node.TEXT_NODE ? selectedElement.parentNode : selectedElement;
  const panel = document.createElement('div');
  panel.className = 'deepseek-translate-panel';
  panel.textContent = text;
  panel.onclick = (e) => {
    e.stopPropagation();
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(-5px)';
    setTimeout(() => cleanupTranslatePanel(), 300);
  };
  copyElementStyle(parentElement, panel);
  insertPanelWithLineBreak(panel, range, parentElement);
  return panel;
}

function insertPanelWithLineBreak(panel, range, parentElement) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(panel);
  try {
    const newRange = document.createRange();
    newRange.setStartAfter(range.endContainer);
    newRange.collapse(true);
    newRange.insertNode(fragment);
  } catch (e) {
    if (parentElement && parentElement.parentNode) {
      parentElement.parentNode.insertBefore(fragment, parentElement.nextSibling);
    }
  }
}

function updateTranslatePanel(panel, text) {
  panel.textContent = text;
}

function copyElementStyle(source, target) {
  const computedStyle = window.getComputedStyle(source);
  const styleProperties = ['font-family','font-size','font-weight','font-style','color','line-height','text-align','text-decoration','margin','padding','border','display','white-space'];
  let styleText = '';
  styleProperties.forEach((prop) => {
    styleText += `${prop}: ${computedStyle[prop]};\n`;
  });
  styleText += 'box-sizing: border-box;\nwidth: 100%;\nmin-width: fit-content;\n';
  target.style.cssText = styleText;
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang.includes('en') && voice.localService === false);
  if (englishVoice) utterance.voice = englishVoice;
  window.speechSynthesis.speak(utterance);
}

const getSettings = async () => {
  try {
    const cacheKeyTranslateCardSettings = 'translateCardSettings';
    const res = await $chrome.storage.local.get(cacheKeyTranslateCardSettings);
    return res[cacheKeyTranslateCardSettings] || {};
  } catch (e) {
    console.error('获取缓存的翻译设置失败', e);
    return {};
  }
};

async function translateWithAI(text) {
  const settings = await getSettings();
  if (!settings.apiKey) throw new Error('请先在插件配置页面设置 AI apiKey');
  if (!settings.apiUrl) throw new Error('请先在插件配置页面设置 AI apiUrl');
  try {
    const response = await fetch(settings.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          { role: 'system', content: '你是一个专业的翻译助手，请将用户提供的文本翻译成中文。如果原文已经是中文，则翻译成英文。' },
          { role: 'user', content: text }
        ],
        stream: false
      })
    });
    if (!response.ok) {
      console.log('API 请求失败: ', response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    throw error;
  }
}

document.addEventListener('click', (event) => {
  if (currentTranslatePanel && !currentTranslatePanel.contains(event.target)) {
    currentTranslatePanel.remove();
    currentTranslatePanel = null;
  }
});
