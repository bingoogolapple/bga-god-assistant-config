declare type Subscriber<S> = (payload: S) => void;
interface Subscription<S> {
    notify?: (payload: S) => void | boolean;
    filter?: (payload: S) => any;
}

interface INode {
    type?: string;
    after?: Node;
    depth?: number;
}
declare type Node = IdentifierNode | WildcardOperatorNode | GroupExpressionNode | RangeExpressionNode | DestructorExpressionNode | ObjectPatternNode | ArrayPatternNode | DotOperatorNode | ExpandOperatorNode | INode;
declare type IdentifierNode = {
    type: 'Identifier';
    value: string;
    arrayIndex?: boolean;
} & INode;
declare type DotOperatorNode = {
    type: 'DotOperator';
} & INode;
declare type WildcardOperatorNode = {
    type: 'WildcardOperator';
    filter?: GroupExpressionNode | RangeExpressionNode;
    optional?: boolean;
} & INode;
declare type ExpandOperatorNode = {
    type: 'ExpandOperator';
} & INode;
declare type GroupExpressionNode = {
    type: 'GroupExpression';
    value: Node[];
    isExclude?: boolean;
} & INode;
declare type RangeExpressionNode = {
    type: 'RangeExpression';
    start?: IdentifierNode;
    end?: IdentifierNode;
} & INode;
declare type DestructorExpressionNode = {
    type: 'DestructorExpression';
    value?: ObjectPatternNode | ArrayPatternNode;
    source?: string;
} & INode;
declare type ObjectPatternNode = {
    type: 'ObjectPattern';
    properties: ObjectPatternPropertyNode[];
} & INode;
declare type ObjectPatternPropertyNode = {
    type: 'ObjectPatternProperty';
    key: IdentifierNode;
    value?: ObjectPatternNode[] | ArrayPatternNode[] | IdentifierNode;
} & INode;
declare type ArrayPatternNode = {
    type: 'ArrayPattern';
    elements: ObjectPatternNode[] | ArrayPatternNode[] | IdentifierNode[];
} & INode;
declare type MatcherFunction = ((path: Segments) => boolean) & {
    path: Path;
};
declare type Pattern = string | number | Path | Segments | MatcherFunction | RegExp;
declare type Segments = Array<string | number>;

declare class Path {
    entire: string | RegExp;
    segments: Segments;
    isMatchPattern: boolean;
    isWildMatchPattern: boolean;
    isRegExp: boolean;
    haveRelativePattern: boolean;
    haveExcludePattern: boolean;
    matchScore: number;
    tree: Node;
    private matchCache;
    private includesCache;
    constructor(input: Pattern, base?: Pattern);
    toString(): string;
    toArr(): (string | number)[];
    get length(): number;
    concat: (...args: Pattern[]) => Path;
    slice: (start?: number, end?: number) => Path;
    push: (...items: Pattern[]) => Path;
    pop: () => Path;
    splice: (start: number, deleteCount?: number, ...items: Array<string | number>) => Path;
    forEach: (callback: (key: string | number) => any) => void;
    map: (callback: (key: string | number) => any) => any[];
    reduce: <T>(callback: (buf: T, item: string | number, index: number) => T, initial: T) => T;
    parent: () => Path;
    includes: (pattern: Pattern) => any;
    transform: <T>(regexp: string | RegExp, callback: (...args: string[]) => T) => string | T;
    match: (pattern: Pattern) => boolean;
    matchAliasGroup: (name: Pattern, alias: Pattern) => boolean;
    existIn: (source?: any, start?: number | Path) => any;
    getIn: (source?: any) => any;
    setIn: (source?: any, value?: any) => any;
    deleteIn: (source?: any) => any;
    ensureIn: (source?: any, defaults?: any) => any;
    static match(pattern: Pattern): {
        (target: any): boolean;
        path: Path;
    };
    static isPathPattern(target: any): target is Pattern;
    static transform<T>(pattern: Pattern, regexp: string | RegExp, callback: (...args: string[]) => T): any;
    static parse(path?: Pattern, base?: Pattern): Path;
    static getIn: (source: any, pattern: Pattern) => any;
    static setIn: (source: any, pattern: Pattern, value: any) => any;
    static deleteIn: (source: any, pattern: Pattern) => any;
    static existIn: (source: any, pattern: Pattern, start?: number | Path) => any;
    static ensureIn: (source: any, pattern: Pattern, defaultValue?: any) => any;
}

declare class Subscribable<Payload = any> {
    subscribers: {
        index?: number;
        [key: number]: Subscriber<Payload>;
    };
    subscription: Subscription<Payload>;
    subscribe: (callback?: Subscriber<Payload>) => number;
    unsubscribe: (index?: number) => void;
    notify: (payload?: Payload, silent?: boolean) => void;
}

declare type ValidatorFormats = 'url' | 'email' | 'ipv6' | 'ipv4' | 'number' | 'integer' | 'idcard' | 'qq' | 'phone' | 'money' | 'zh' | 'date' | 'zip' | (string & {});
interface IValidateResult {
    type: 'error' | 'warning' | 'success' | (string & {});
    message: string;
}
declare type ValidatorFunctionResponse = null | string | boolean | IValidateResult;
declare type ValidatorFunction<Context = any> = (value: any, rule: IValidatorRules<Context>, ctx: Context, render: (message: string, scope?: any) => string) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null;
declare type ValidatorTriggerType = 'onInput' | 'onFocus' | 'onBlur' | (string & {});
interface IValidatorRules<Context = any> {
    triggerType?: ValidatorTriggerType;
    format?: ValidatorFormats;
    validator?: ValidatorFunction<Context>;
    required?: boolean;
    pattern?: RegExp | string;
    max?: number;
    maximum?: number;
    maxItems?: number;
    minItems?: number;
    maxLength?: number;
    minLength?: number;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    minimum?: number;
    min?: number;
    len?: number;
    whitespace?: boolean;
    enum?: any[];
    const?: any;
    multipleOf?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    message?: string;
    [key: string]: any;
}
interface IRegistryLocaleMessages {
    [key: string]: string | IRegistryLocaleMessages;
}
interface IRegistryLocales {
    [language: string]: IRegistryLocaleMessages;
}
interface IRegistryRules<Context = any> {
    [key: string]: ValidatorFunction<Context>;
}
interface IRegistryFormats {
    [key: string]: string | RegExp;
}
declare type ValidatorDescription<Context = any> = ValidatorFormats | ValidatorFunction<Context> | IValidatorRules<Context>;
declare type MultiValidator<Context = any> = ValidatorDescription<Context>[];
declare type Validator<Context = any> = ValidatorDescription<Context> | MultiValidator<Context>;

declare const getValidateLocaleIOSCode: (language: string) => any;
declare const setValidateLanguage: (lang: string) => void;
declare const getLocaleByPath: (path: string, lang?: string) => any;
declare const registerValidateLocale: (locale: IRegistryLocales) => void;
declare const registerValidateRules: (rules: IRegistryRules) => void;
declare const registerValidateFormats: (formats: IRegistryFormats) => void;
declare const registerValidateMessageTemplateEngine: (template: (message: ValidatorFunctionResponse, context: any) => any) => void;

declare type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any) => any ? never : K;
}[keyof T];
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
declare type AnyFunction = (...args: any[]) => any;
declare type JSXComponent = any;
declare type LifeCycleHandler<T> = (payload: T, context: any) => void;
declare type LifeCyclePayload<T> = (params: {
    type: string;
    payload: T;
}, context: any) => void;
declare enum LifeCycleTypes {
    /**
     * Form LifeCycle
     **/
    ON_FORM_INIT = "onFormInit",
    ON_FORM_MOUNT = "onFormMount",
    ON_FORM_UNMOUNT = "onFormUnmount",
    ON_FORM_INPUT_CHANGE = "onFormInputChange",
    ON_FORM_VALUES_CHANGE = "onFormValuesChange",
    ON_FORM_INITIAL_VALUES_CHANGE = "onFormInitialValuesChange",
    ON_FORM_SUBMIT = "onFormSubmit",
    ON_FORM_RESET = "onFormReset",
    ON_FORM_SUBMIT_START = "onFormSubmitStart",
    ON_FORM_SUBMITTING = "onFormSubmitting",
    ON_FORM_SUBMIT_END = "onFormSubmitEnd",
    ON_FORM_SUBMIT_VALIDATE_START = "onFormSubmitValidateStart",
    ON_FORM_SUBMIT_VALIDATE_SUCCESS = "onFormSubmitValidateSuccess",
    ON_FORM_SUBMIT_VALIDATE_FAILED = "onFormSubmitValidateFailed",
    ON_FORM_SUBMIT_VALIDATE_END = "onFormSubmitValidateEnd",
    ON_FORM_SUBMIT_SUCCESS = "onFormSubmitSuccess",
    ON_FORM_SUBMIT_FAILED = "onFormSubmitFailed",
    ON_FORM_VALIDATE_START = "onFormValidateStart",
    ON_FORM_VALIDATING = "onFormValidating",
    ON_FORM_VALIDATE_SUCCESS = "onFormValidateSuccess",
    ON_FORM_VALIDATE_FAILED = "onFormValidateFailed",
    ON_FORM_VALIDATE_END = "onFormValidateEnd",
    ON_FORM_GRAPH_CHANGE = "onFormGraphChange",
    ON_FORM_LOADING = "onFormLoading",
    /**
     * Field LifeCycle
     **/
    ON_FIELD_INIT = "onFieldInit",
    ON_FIELD_INPUT_VALUE_CHANGE = "onFieldInputValueChange",
    ON_FIELD_VALUE_CHANGE = "onFieldValueChange",
    ON_FIELD_INITIAL_VALUE_CHANGE = "onFieldInitialValueChange",
    ON_FIELD_SUBMIT = "onFieldSubmit",
    ON_FIELD_SUBMIT_START = "onFieldSubmitStart",
    ON_FIELD_SUBMITTING = "onFieldSubmitting",
    ON_FIELD_SUBMIT_END = "onFieldSubmitEnd",
    ON_FIELD_SUBMIT_VALIDATE_START = "onFieldSubmitValidateStart",
    ON_FIELD_SUBMIT_VALIDATE_SUCCESS = "onFieldSubmitValidateSuccess",
    ON_FIELD_SUBMIT_VALIDATE_FAILED = "onFieldSubmitValidateFailed",
    ON_FIELD_SUBMIT_VALIDATE_END = "onFieldSubmitValidateEnd",
    ON_FIELD_SUBMIT_SUCCESS = "onFieldSubmitSuccess",
    ON_FIELD_SUBMIT_FAILED = "onFieldSubmitFailed",
    ON_FIELD_VALIDATE_START = "onFieldValidateStart",
    ON_FIELD_VALIDATING = "onFieldValidating",
    ON_FIELD_VALIDATE_SUCCESS = "onFieldValidateSuccess",
    ON_FIELD_VALIDATE_FAILED = "onFieldValidateFailed",
    ON_FIELD_VALIDATE_END = "onFieldValidateEnd",
    ON_FIELD_LOADING = "onFieldLoading",
    ON_FIELD_RESET = "onFieldReset",
    ON_FIELD_MOUNT = "onFieldMount",
    ON_FIELD_UNMOUNT = "onFieldUnmount"
}
declare type HeartSubscriber = ({ type, payload, }: {
    type: string;
    payload: any;
}) => void;
interface INodePatch<T> {
    type: 'remove' | 'update';
    address: string;
    oldAddress?: string;
    payload?: T;
}
interface IHeartProps<Context> {
    lifecycles?: LifeCycle[];
    context?: Context;
}
interface IFieldFeedback {
    triggerType?: FieldFeedbackTriggerTypes;
    type?: FieldFeedbackTypes;
    code?: FieldFeedbackCodeTypes;
    messages?: FeedbackMessage;
}
declare type IFormFeedback = IFieldFeedback & {
    path?: string;
    address?: string;
};
interface ISearchFeedback {
    triggerType?: FieldFeedbackTriggerTypes;
    type?: FieldFeedbackTypes;
    code?: FieldFeedbackCodeTypes;
    address?: FormPathPattern;
    path?: FormPathPattern;
    messages?: FeedbackMessage;
}
declare type FeedbackMessage = any[];
declare type IFieldUpdate = {
    pattern: Path;
    callbacks: ((...args: any[]) => any)[];
};
interface IFormRequests {
    validate?: number;
    submit?: number;
    loading?: number;
    updates?: IFieldUpdate[];
    updateIndexes?: Record<string, number>;
}
declare type IFormFields = Record<string, GeneralField>;
declare type FieldFeedbackTypes = 'error' | 'success' | 'warning';
declare type FieldFeedbackTriggerTypes = ValidatorTriggerType;
declare type FieldFeedbackCodeTypes = 'ValidateError' | 'ValidateSuccess' | 'ValidateWarning' | 'EffectError' | 'EffectSuccess' | 'EffectWarning' | (string & {});
declare type FormPatternTypes = 'editable' | 'readOnly' | 'disabled' | 'readPretty' | ({} & string);
declare type FormDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string);
declare type FormPathPattern = string | number | Array<string | number> | Path | RegExp | (((address: Array<string | number>) => boolean) & {
    path: Path;
});
declare type OmitState<P> = Omit<P, 'selfDisplay' | 'selfPattern' | 'originValues' | 'originInitialValues' | 'id' | 'address' | 'path' | 'lifecycles' | 'disposers' | 'requests' | 'fields' | 'graph' | 'heart' | 'indexes' | 'props' | 'displayName' | 'setState' | 'getState' | 'getFormGraph' | 'setFormGraph' | 'setFormState' | 'getFormState'>;
declare type IFieldState = Partial<Pick<Field, NonFunctionPropertyNames<OmitState<Field<any, any, string, string>>>>>;
declare type IVoidFieldState = Partial<Pick<VoidField, NonFunctionPropertyNames<OmitState<VoidField<any, any, string>>>>>;
declare type IFormState<T extends Record<any, any> = any> = Pick<Form<T>, NonFunctionPropertyNames<OmitState<Form<{
    [key: string]: any;
}>>>>;
declare type IFormGraph = Record<string, IGeneralFieldState | IFormState>;
interface IFormProps<T extends object = any> {
    values?: Partial<T>;
    initialValues?: Partial<T>;
    pattern?: FormPatternTypes;
    display?: FormDisplayTypes;
    hidden?: boolean;
    visible?: boolean;
    editable?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    readPretty?: boolean;
    effects?: (form: Form<T>) => void;
    validateFirst?: boolean;
    designable?: boolean;
}
declare type IFormMergeStrategy = 'overwrite' | 'merge' | 'deepMerge' | 'shallowMerge';
interface IFieldFactoryProps<Decorator extends JSXComponent, Component extends JSXComponent, TextType = any, ValueType = any> extends IFieldProps<Decorator, Component, TextType, ValueType> {
    name: FormPathPattern;
    basePath?: FormPathPattern;
}
interface IVoidFieldFactoryProps<Decorator extends JSXComponent, Component extends JSXComponent, TextType = any> extends IVoidFieldProps<Decorator, Component, TextType> {
    name: FormPathPattern;
    basePath?: FormPathPattern;
}
interface IFieldRequests {
    validate?: number;
    submit?: number;
    loading?: number;
    batch?: () => void;
}
interface IFieldCaches {
    value?: any;
    initialValue?: any;
    inputting?: boolean;
}
declare type FieldDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string);
declare type FieldPatternTypes = 'editable' | 'readOnly' | 'disabled' | 'readPretty' | ({} & string);
declare type FieldValidatorContext = IValidatorRules & {
    field?: Field;
    form?: Form;
    value?: any;
};
declare type FieldValidator = Validator<FieldValidatorContext>;
declare type FieldDataSource = {
    label?: any;
    value?: any;
    title?: any;
    key?: any;
    text?: any;
    children?: FieldDataSource;
    [key: string]: any;
}[];
declare type FieldComponent<Component extends JSXComponent, ComponentProps = any> = [Component] | [Component, ComponentProps] | boolean | any[];
declare type FieldDecorator<Decorator extends JSXComponent, ComponentProps = any> = [Decorator] | [Decorator, ComponentProps] | boolean | any[];
declare type FieldReaction = (field: Field) => void;
interface IFieldProps<Decorator extends JSXComponent = any, Component extends JSXComponent = any, TextType = any, ValueType = any> {
    name: FormPathPattern;
    basePath?: FormPathPattern;
    title?: TextType;
    description?: TextType;
    value?: ValueType;
    initialValue?: ValueType;
    required?: boolean;
    display?: FieldDisplayTypes;
    pattern?: FieldPatternTypes;
    hidden?: boolean;
    visible?: boolean;
    editable?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    readPretty?: boolean;
    dataSource?: FieldDataSource;
    validateFirst?: boolean;
    validator?: FieldValidator;
    decorator?: FieldDecorator<Decorator>;
    component?: FieldComponent<Component>;
    reactions?: FieldReaction[] | FieldReaction;
    content?: any;
    data?: any;
}
interface IVoidFieldProps<Decorator extends JSXComponent = any, Component extends JSXComponent = any, TextType = any> {
    name: FormPathPattern;
    basePath?: FormPathPattern;
    title?: TextType;
    description?: TextType;
    display?: FieldDisplayTypes;
    pattern?: FieldPatternTypes;
    hidden?: boolean;
    visible?: boolean;
    editable?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    readPretty?: boolean;
    decorator?: FieldDecorator<Decorator>;
    component?: FieldComponent<Component>;
    reactions?: FieldReaction[] | FieldReaction;
    content?: any;
    data?: any;
}
interface IFieldResetOptions {
    forceClear?: boolean;
    validate?: boolean;
}
declare type IGeneralFieldState = IFieldState & IVoidFieldState;
declare type GeneralField = Field | VoidField | ArrayField | ObjectField;
declare type DataField = Field | ArrayField | ObjectField;
interface ISpliceArrayStateProps {
    startIndex?: number;
    deleteCount?: number;
    insertCount?: number;
}
interface IExchangeArrayStateProps {
    fromIndex?: number;
    toIndex?: number;
}
interface IQueryProps {
    pattern: FormPathPattern;
    base: FormPathPattern;
    form: Form;
}
interface IModelSetter<P = any> {
    (setter: (state: P) => void): void;
    (setter: Partial<P>): void;
    (): void;
}
interface IModelGetter<P = any> {
    <Getter extends (state: P) => any>(getter: Getter): ReturnType<Getter>;
    (): P;
}
declare type FieldMatchPattern = FormPathPattern | Query | GeneralField;
interface IFieldStateSetter {
    (pattern: FieldMatchPattern, setter: (state: IFieldState) => void): void;
    (pattern: FieldMatchPattern, setter: Partial<IFieldState>): void;
}
interface IFieldStateGetter {
    <Getter extends (state: IGeneralFieldState) => any>(pattern: FieldMatchPattern, getter: Getter): ReturnType<Getter>;
    (pattern: FieldMatchPattern): IGeneralFieldState;
}
interface IFieldActions {
    [key: string]: (...args: any[]) => any;
}

declare type LifeCycleParams<Payload> = Array<string | LifeCycleHandler<Payload> | {
    [key: string]: LifeCycleHandler<Payload>;
}>;
declare class LifeCycle<Payload = any> {
    private listener;
    constructor(...params: LifeCycleParams<Payload>);
    buildListener: (params: any[]) => (payload: {
        type: string;
        payload: Payload;
    }, ctx: any) => void;
    notify: <Payload_1>(type: any, payload?: Payload_1, ctx?: any) => void;
}

declare class Heart<Payload = any, Context = any> extends Subscribable {
    lifecycles: LifeCycle<Payload>[];
    outerLifecycles: Map<any, LifeCycle<Payload>[]>;
    context: Context;
    constructor({ lifecycles, context }?: IHeartProps<Context>);
    buildLifeCycles: (lifecycles: LifeCycle[]) => any;
    addLifeCycles: (id: any, lifecycles?: LifeCycle[]) => void;
    hasLifeCycles: (id: any) => boolean;
    removeLifeCycles: (id: any) => void;
    setLifeCycles: (lifecycles?: LifeCycle[]) => void;
    publish: <P, C>(type: any, payload?: P, context?: C) => void;
    clear: () => void;
}

declare class Query {
    private pattern;
    private addresses;
    private form;
    constructor(props: IQueryProps);
    take(): GeneralField | undefined;
    take<Result>(getter: (field: GeneralField, address: Path) => Result): Result;
    map(): GeneralField[];
    map<Result>(iterator?: (field: GeneralField, address: Path) => Result): Result[];
    forEach<Result>(iterator: (field: GeneralField, address: Path) => Result): void;
    reduce<Result>(reducer: (value: Result, field: GeneralField, address: Path) => Result, initial?: Result): Result;
    get<K extends keyof IGeneralFieldState>(key: K): IGeneralFieldState[K];
    getIn(pattern?: Pattern): any;
    value(): any;
    initialValue(): any;
}

declare class BaseField<Decorator = any, Component = any, TextType = any> {
    title: TextType;
    description: TextType;
    selfDisplay: FieldDisplayTypes;
    selfPattern: FieldPatternTypes;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    content: any;
    data: any;
    decoratorType: Decorator;
    decoratorProps: Record<string, any>;
    componentType: Component;
    componentProps: Record<string, any>;
    designable: boolean;
    address: Path;
    path: Path;
    form: Form;
    disposers: (() => void)[];
    actions: IFieldActions;
    locate(address: Pattern): void;
    get indexes(): number[];
    get index(): number;
    get records(): any[];
    get record(): any;
    get component(): FieldComponent<Component>;
    set component(value: FieldComponent<Component>);
    get decorator(): FieldDecorator<Decorator>;
    set decorator(value: FieldDecorator<Decorator>);
    get parent(): GeneralField;
    get display(): FieldDisplayTypes;
    get pattern(): FieldPatternTypes;
    get editable(): boolean;
    get disabled(): boolean;
    get readOnly(): boolean;
    get readPretty(): boolean;
    get hidden(): boolean;
    get visible(): boolean;
    get destroyed(): boolean;
    set hidden(hidden: boolean);
    set visible(visible: boolean);
    set editable(editable: boolean);
    set readOnly(readOnly: boolean);
    set disabled(disabled: boolean);
    set readPretty(readPretty: boolean);
    set pattern(pattern: FieldPatternTypes);
    set display(display: FieldDisplayTypes);
    setTitle: (title?: TextType) => void;
    setDescription: (description?: TextType) => void;
    setDisplay: (type?: FieldDisplayTypes) => void;
    setPattern: (type?: FieldPatternTypes) => void;
    setComponent: <C extends unknown, ComponentProps extends object = {}>(component?: C, props?: ComponentProps) => void;
    setComponentProps: <ComponentProps extends object = {}>(props?: ComponentProps) => void;
    setDecorator: <D extends unknown, ComponentProps extends object = {}>(component?: D, props?: ComponentProps) => void;
    setDecoratorProps: <ComponentProps extends object = {}>(props?: ComponentProps) => void;
    setData: (data: any) => void;
    setContent: (content: any) => void;
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    query: (pattern: Pattern | RegExp) => Query;
    notify: (type: LifeCycleTypes, payload?: any) => void;
    dispose: () => void;
    destroy: (forceClear?: boolean) => void;
    match: (pattern: Pattern) => boolean;
    inject: (actions: IFieldActions) => void;
    invoke: (name: string, ...args: any[]) => any;
}

declare class Field<Decorator extends JSXComponent = any, Component extends JSXComponent = any, TextType = any, ValueType = any> extends BaseField<Decorator, Component, TextType> {
    displayName: string;
    props: IFieldProps<Decorator, Component, TextType, ValueType>;
    loading: boolean;
    validating: boolean;
    submitting: boolean;
    active: boolean;
    visited: boolean;
    selfModified: boolean;
    modified: boolean;
    inputValue: ValueType;
    inputValues: any[];
    dataSource: FieldDataSource;
    validator: FieldValidator;
    feedbacks: IFieldFeedback[];
    caches: IFieldCaches;
    requests: IFieldRequests;
    constructor(address: Pattern, props: IFieldProps<Decorator, Component, TextType, ValueType>, form: Form, designable: boolean);
    protected initialize(): void;
    protected makeObservable(): void;
    protected makeReactive(): void;
    get selfErrors(): FeedbackMessage;
    get errors(): IFormFeedback[];
    get selfWarnings(): FeedbackMessage;
    get warnings(): IFormFeedback[];
    get selfSuccesses(): FeedbackMessage;
    get successes(): IFormFeedback[];
    get selfValid(): boolean;
    get valid(): boolean;
    get selfInvalid(): boolean;
    get invalid(): boolean;
    get value(): ValueType;
    get initialValue(): ValueType;
    get required(): boolean;
    get validateStatus(): "validating" | "error" | "warning" | "success";
    set required(required: boolean);
    set value(value: ValueType);
    set initialValue(initialValue: ValueType);
    set selfErrors(messages: FeedbackMessage);
    set selfWarnings(messages: FeedbackMessage);
    set selfSuccesses(messages: FeedbackMessage);
    setDataSource: (dataSource?: FieldDataSource) => void;
    setFeedback: (feedback?: IFieldFeedback) => void;
    setSelfErrors: (messages?: FeedbackMessage) => void;
    setSelfWarnings: (messages?: FeedbackMessage) => void;
    setSelfSuccesses: (messages?: FeedbackMessage) => void;
    setValidator: (validator?: FieldValidator) => void;
    setValidatorRule: (name: string, value: any) => void;
    setRequired: (required?: boolean) => void;
    setValue: (value?: ValueType) => void;
    setInitialValue: (initialValue?: ValueType) => void;
    setLoading: (loading?: boolean) => void;
    setValidating: (validating?: boolean) => void;
    setSubmitting: (submitting?: boolean) => void;
    setState: IModelSetter<IFieldState>;
    getState: IModelGetter<IFieldState>;
    onInput: (...args: any[]) => Promise<void>;
    onFocus: (...args: any[]) => Promise<void>;
    onBlur: (...args: any[]) => Promise<void>;
    validate: (triggerType?: ValidatorTriggerType) => any;
    submit: <T>(onSubmit?: (values: any) => void | Promise<T>) => Promise<T>;
    reset: (options?: IFieldResetOptions) => Promise<void>;
    queryFeedbacks: (search?: ISearchFeedback) => IFieldFeedback[];
    modify: () => void;
}

declare class ArrayField<Decorator extends JSXComponent = any, Component extends JSXComponent = any> extends Field<Decorator, Component, any, any[]> {
    displayName: string;
    constructor(address: FormPathPattern, props: IFieldProps<Decorator, Component>, form: Form, designable: boolean);
    protected makeAutoCleanable(): void;
    push: (...items: any[]) => Promise<void>;
    pop: () => Promise<void>;
    insert: (index: number, ...items: any[]) => Promise<void>;
    remove: (index: number) => Promise<void>;
    shift: () => Promise<void>;
    unshift: (...items: any[]) => Promise<void>;
    move: (fromIndex: number, toIndex: number) => Promise<void>;
    moveUp: (index: number) => Promise<void>;
    moveDown: (index: number) => Promise<void>;
}

declare class ObjectField<Decorator extends JSXComponent = any, Component extends JSXComponent = any> extends Field<Decorator, Component, any, Record<string, any>> {
    displayName: string;
    private additionalProperties;
    constructor(address: FormPathPattern, props: IFieldProps<Decorator, Component>, form: Form, designable: boolean);
    protected makeAutoCleanable(): void;
    addProperty: (key: string, value: any) => Promise<void>;
    removeProperty: (key: string) => Promise<void>;
    existProperty: (key: string) => any;
}

declare class VoidField<Decorator = any, Component = any, TextType = any> extends BaseField<Decorator, Component, TextType> {
    displayName: 'VoidField';
    props: IVoidFieldProps<Decorator, Component>;
    constructor(address: Pattern, props: IVoidFieldProps<Decorator, Component>, form: Form, designable: boolean);
    protected initialize(): void;
    protected makeObservable(): void;
    protected makeReactive(): void;
    setState: IModelSetter<IVoidFieldState>;
    getState: IModelGetter<IVoidFieldState>;
}

declare class Form<ValueType extends object = any> {
    displayName: string;
    id: string;
    initialized: boolean;
    validating: boolean;
    submitting: boolean;
    loading: boolean;
    modified: boolean;
    pattern: FormPatternTypes;
    display: FormDisplayTypes;
    values: ValueType;
    initialValues: ValueType;
    mounted: boolean;
    unmounted: boolean;
    props: IFormProps<ValueType>;
    heart: Heart;
    graph: Graph;
    fields: IFormFields;
    requests: IFormRequests;
    indexes: Record<string, string>;
    disposers: (() => void)[];
    constructor(props: IFormProps<ValueType>);
    protected initialize(props: IFormProps<ValueType>): void;
    protected makeValues(): void;
    protected makeObservable(): void;
    protected makeReactive(): void;
    get valid(): boolean;
    get invalid(): boolean;
    get errors(): IFormFeedback[];
    get warnings(): IFormFeedback[];
    get successes(): IFormFeedback[];
    get lifecycles(): LifeCycle<any>[];
    get hidden(): boolean;
    get visible(): boolean;
    set hidden(hidden: boolean);
    set visible(visible: boolean);
    get editable(): boolean;
    set editable(editable: boolean);
    get readOnly(): boolean;
    set readOnly(readOnly: boolean);
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get readPretty(): boolean;
    set readPretty(readPretty: boolean);
    /** 创建字段 **/
    createField: <Decorator extends unknown, Component extends unknown>(props: IFieldFactoryProps<Decorator, Component, any, any>) => Field<Decorator, Component, any, any>;
    createArrayField: <Decorator extends unknown, Component extends unknown>(props: IFieldFactoryProps<Decorator, Component, any, any>) => ArrayField<Decorator, Component>;
    createObjectField: <Decorator extends unknown, Component extends unknown>(props: IFieldFactoryProps<Decorator, Component, any, any>) => ObjectField<Decorator, Component>;
    createVoidField: <Decorator extends unknown, Component extends unknown>(props: IVoidFieldFactoryProps<Decorator, Component, any>) => VoidField<Decorator, Component, any>;
    /** 状态操作模型 **/
    setValues: (values: any, strategy?: IFormMergeStrategy) => void;
    setInitialValues: (initialValues: any, strategy?: IFormMergeStrategy) => void;
    setValuesIn: (pattern: Pattern, value: any) => void;
    deleteValuesIn: (pattern: Pattern) => void;
    existValuesIn: (pattern: Pattern) => any;
    getValuesIn: (pattern: Pattern) => any;
    setInitialValuesIn: (pattern: Pattern, initialValue: any) => void;
    deleteInitialValuesIn: (pattern: Pattern) => void;
    existInitialValuesIn: (pattern: Pattern) => any;
    getInitialValuesIn: (pattern: Pattern) => any;
    setLoading: (loading: boolean) => void;
    setSubmitting: (submitting: boolean) => void;
    setValidating: (validating: boolean) => void;
    setDisplay: (display: FormDisplayTypes) => void;
    setPattern: (pattern: FormPatternTypes) => void;
    addEffects: (id: any, effects: IFormProps['effects']) => void;
    removeEffects: (id: any) => void;
    setEffects: (effects: IFormProps['effects']) => void;
    clearErrors: (pattern?: Pattern) => void;
    clearWarnings: (pattern?: Pattern) => void;
    clearSuccesses: (pattern?: Pattern) => void;
    query: (pattern: Pattern) => Query;
    queryFeedbacks: (search: ISearchFeedback) => IFormFeedback[];
    notify: (type: string, payload?: any) => void;
    subscribe: (subscriber?: HeartSubscriber) => number;
    unsubscribe: (id: number) => void;
    /**事件钩子**/
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    setState: IModelSetter<IFormState<ValueType>>;
    getState: IModelGetter<IFormState<ValueType>>;
    setFormState: IModelSetter<IFormState<ValueType>>;
    getFormState: IModelGetter<IFormState<ValueType>>;
    setFieldState: IFieldStateSetter;
    getFieldState: IFieldStateGetter;
    getFormGraph: () => IFormGraph;
    setFormGraph: (graph: IFormGraph) => void;
    clearFormGraph: (pattern?: Pattern, forceClear?: boolean) => void;
    validate: (pattern?: Pattern) => any;
    submit: <T>(onSubmit?: (values: ValueType) => void | Promise<T>) => Promise<T>;
    reset: (pattern?: Pattern, options?: IFieldResetOptions) => Promise<void>;
}

declare class Graph {
    form: Form;
    constructor(form: Form);
    getGraph: () => IFormGraph;
    setGraph: (graph: IFormGraph) => void;
}

declare const createEffectHook: <F extends (payload: any, ...ctxs: any[]) => AnyFunction>(type: string, callback?: F) => (...args: Parameters<ReturnType<F>>) => void;
declare const createEffectContext: <T = any>(defaultValue?: T) => {
    provide(value?: T): void;
    consume(): T;
};
declare const useEffectForm: () => Form<any>;

declare const isForm: (node: any) => node is Form<any>;
declare const isGeneralField: (node: any) => node is GeneralField;
declare const isField: <Decorator extends unknown = any, Component extends unknown = any, TextType = any, ValueType = any>(node: any) => node is Field<Decorator, Component, TextType, ValueType>;
declare const isArrayField: <Decorator extends unknown = any, Component extends unknown = any>(node: any) => node is ArrayField<Decorator, Component>;
declare const isObjectField: <Decorator extends unknown = any, Component extends unknown = any>(node: any) => node is ObjectField<Decorator, Component>;
declare const isVoidField: <Decorator = any, Component = any, TextType = any>(node: any) => node is VoidField<Decorator, Component, TextType>;
declare const isFormState: <T extends Record<any, any> = any>(state: any) => state is IFormState<T>;
declare const isFieldState: (state: any) => state is Partial<Pick<Field<any, any, any, any>, NonFunctionPropertyNames<{
    loading: boolean;
    validating: boolean;
    submitting: boolean;
    active: boolean;
    visited: boolean;
    selfModified: boolean;
    modified: boolean;
    inputValue: string;
    inputValues: any[];
    dataSource: FieldDataSource;
    validator: FieldValidator;
    feedbacks: IFieldFeedback[];
    caches: IFieldCaches;
    selfErrors: FeedbackMessage;
    readonly errors: IFormFeedback[];
    selfWarnings: FeedbackMessage;
    readonly warnings: IFormFeedback[];
    selfSuccesses: FeedbackMessage;
    readonly successes: IFormFeedback[];
    readonly selfValid: boolean;
    readonly valid: boolean;
    readonly selfInvalid: boolean;
    readonly invalid: boolean;
    value: string;
    initialValue: string;
    required: boolean;
    readonly validateStatus: "validating" | "error" | "warning" | "success";
    setDataSource: (dataSource?: FieldDataSource) => void;
    setFeedback: (feedback?: IFieldFeedback) => void;
    setSelfErrors: (messages?: FeedbackMessage) => void;
    setSelfWarnings: (messages?: FeedbackMessage) => void;
    setSelfSuccesses: (messages?: FeedbackMessage) => void;
    setValidator: (validator?: FieldValidator) => void;
    setValidatorRule: (name: string, value: any) => void;
    setRequired: (required?: boolean) => void;
    setValue: (value?: string) => void;
    setInitialValue: (initialValue?: string) => void;
    setLoading: (loading?: boolean) => void;
    setValidating: (validating?: boolean) => void;
    setSubmitting: (submitting?: boolean) => void;
    onInput: (...args: any[]) => Promise<void>;
    onFocus: (...args: any[]) => Promise<void>;
    onBlur: (...args: any[]) => Promise<void>;
    validate: (triggerType?: ValidatorTriggerType) => any;
    submit: <T>(onSubmit?: (values: any) => void | Promise<T>) => Promise<T>;
    reset: (options?: IFieldResetOptions) => Promise<void>;
    queryFeedbacks: (search?: ISearchFeedback) => IFieldFeedback[];
    modify: () => void;
    title: string;
    description: string;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    content: any;
    data: any;
    decoratorType: any;
    decoratorProps: Record<string, any>;
    componentType: any;
    componentProps: Record<string, any>;
    designable: boolean;
    form: Form<any>;
    actions: IFieldActions;
    locate: (address: Pattern) => void;
    readonly index: number;
    readonly records: any[];
    readonly record: any;
    component: FieldComponent<any, any>;
    decorator: FieldDecorator<any, any>;
    readonly parent: GeneralField;
    display: FieldDisplayTypes;
    pattern: FieldPatternTypes;
    editable: boolean;
    disabled: boolean;
    readOnly: boolean;
    readPretty: boolean;
    hidden: boolean;
    visible: boolean;
    readonly destroyed: boolean;
    setTitle: (title?: string) => void;
    setDescription: (description?: string) => void;
    setDisplay: (type?: FieldDisplayTypes) => void;
    setPattern: (type?: FieldPatternTypes) => void;
    setComponent: <C extends unknown, ComponentProps extends object = {}>(component?: C, props?: ComponentProps) => void;
    setComponentProps: <ComponentProps_1 extends object = {}>(props?: ComponentProps_1) => void;
    setDecorator: <D extends unknown, ComponentProps_2 extends object = {}>(component?: D, props?: ComponentProps_2) => void;
    setDecoratorProps: <ComponentProps_3 extends object = {}>(props?: ComponentProps_3) => void;
    setData: (data: any) => void;
    setContent: (content: any) => void;
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    query: (pattern: Pattern) => Query;
    notify: (type: LifeCycleTypes, payload?: any) => void;
    dispose: () => void;
    destroy: (forceClear?: boolean) => void;
    match: (pattern: Pattern) => boolean;
    inject: (actions: IFieldActions) => void;
    invoke: (name: string, ...args: any[]) => any;
}>>>;
declare const isGeneralFieldState: (node: any) => node is IGeneralFieldState;
declare const isArrayFieldState: (state: any) => state is Partial<Pick<Field<any, any, any, any>, NonFunctionPropertyNames<{
    loading: boolean;
    validating: boolean;
    submitting: boolean;
    active: boolean;
    visited: boolean;
    selfModified: boolean;
    modified: boolean;
    inputValue: string;
    inputValues: any[];
    dataSource: FieldDataSource;
    validator: FieldValidator;
    feedbacks: IFieldFeedback[];
    caches: IFieldCaches;
    selfErrors: FeedbackMessage;
    readonly errors: IFormFeedback[];
    selfWarnings: FeedbackMessage;
    readonly warnings: IFormFeedback[];
    selfSuccesses: FeedbackMessage;
    readonly successes: IFormFeedback[];
    readonly selfValid: boolean;
    readonly valid: boolean;
    readonly selfInvalid: boolean;
    readonly invalid: boolean;
    value: string;
    initialValue: string;
    required: boolean;
    readonly validateStatus: "validating" | "error" | "warning" | "success";
    setDataSource: (dataSource?: FieldDataSource) => void;
    setFeedback: (feedback?: IFieldFeedback) => void;
    setSelfErrors: (messages?: FeedbackMessage) => void;
    setSelfWarnings: (messages?: FeedbackMessage) => void;
    setSelfSuccesses: (messages?: FeedbackMessage) => void;
    setValidator: (validator?: FieldValidator) => void;
    setValidatorRule: (name: string, value: any) => void;
    setRequired: (required?: boolean) => void;
    setValue: (value?: string) => void;
    setInitialValue: (initialValue?: string) => void;
    setLoading: (loading?: boolean) => void;
    setValidating: (validating?: boolean) => void;
    setSubmitting: (submitting?: boolean) => void;
    onInput: (...args: any[]) => Promise<void>;
    onFocus: (...args: any[]) => Promise<void>;
    onBlur: (...args: any[]) => Promise<void>;
    validate: (triggerType?: ValidatorTriggerType) => any;
    submit: <T>(onSubmit?: (values: any) => void | Promise<T>) => Promise<T>;
    reset: (options?: IFieldResetOptions) => Promise<void>;
    queryFeedbacks: (search?: ISearchFeedback) => IFieldFeedback[];
    modify: () => void;
    title: string;
    description: string;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    content: any;
    data: any;
    decoratorType: any;
    decoratorProps: Record<string, any>;
    componentType: any;
    componentProps: Record<string, any>;
    designable: boolean;
    form: Form<any>;
    actions: IFieldActions;
    locate: (address: Pattern) => void;
    readonly index: number;
    readonly records: any[];
    readonly record: any;
    component: FieldComponent<any, any>;
    decorator: FieldDecorator<any, any>;
    readonly parent: GeneralField;
    display: FieldDisplayTypes;
    pattern: FieldPatternTypes;
    editable: boolean;
    disabled: boolean;
    readOnly: boolean;
    readPretty: boolean;
    hidden: boolean;
    visible: boolean;
    readonly destroyed: boolean;
    setTitle: (title?: string) => void;
    setDescription: (description?: string) => void;
    setDisplay: (type?: FieldDisplayTypes) => void;
    setPattern: (type?: FieldPatternTypes) => void;
    setComponent: <C extends unknown, ComponentProps extends object = {}>(component?: C, props?: ComponentProps) => void;
    setComponentProps: <ComponentProps_1 extends object = {}>(props?: ComponentProps_1) => void;
    setDecorator: <D extends unknown, ComponentProps_2 extends object = {}>(component?: D, props?: ComponentProps_2) => void;
    setDecoratorProps: <ComponentProps_3 extends object = {}>(props?: ComponentProps_3) => void;
    setData: (data: any) => void;
    setContent: (content: any) => void;
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    query: (pattern: Pattern) => Query;
    notify: (type: LifeCycleTypes, payload?: any) => void;
    dispose: () => void;
    destroy: (forceClear?: boolean) => void;
    match: (pattern: Pattern) => boolean;
    inject: (actions: IFieldActions) => void;
    invoke: (name: string, ...args: any[]) => any;
}>>>;
declare const isDataField: (node: any) => node is DataField;
declare const isDataFieldState: (node: any) => boolean;
declare const isObjectFieldState: (state: any) => state is Partial<Pick<Field<any, any, any, any>, NonFunctionPropertyNames<{
    loading: boolean;
    validating: boolean;
    submitting: boolean;
    active: boolean;
    visited: boolean;
    selfModified: boolean;
    modified: boolean;
    inputValue: string;
    inputValues: any[];
    dataSource: FieldDataSource;
    validator: FieldValidator;
    feedbacks: IFieldFeedback[];
    caches: IFieldCaches;
    selfErrors: FeedbackMessage;
    readonly errors: IFormFeedback[];
    selfWarnings: FeedbackMessage;
    readonly warnings: IFormFeedback[];
    selfSuccesses: FeedbackMessage;
    readonly successes: IFormFeedback[];
    readonly selfValid: boolean;
    readonly valid: boolean;
    readonly selfInvalid: boolean;
    readonly invalid: boolean;
    value: string;
    initialValue: string;
    required: boolean;
    readonly validateStatus: "validating" | "error" | "warning" | "success";
    setDataSource: (dataSource?: FieldDataSource) => void;
    setFeedback: (feedback?: IFieldFeedback) => void;
    setSelfErrors: (messages?: FeedbackMessage) => void;
    setSelfWarnings: (messages?: FeedbackMessage) => void;
    setSelfSuccesses: (messages?: FeedbackMessage) => void;
    setValidator: (validator?: FieldValidator) => void;
    setValidatorRule: (name: string, value: any) => void;
    setRequired: (required?: boolean) => void;
    setValue: (value?: string) => void;
    setInitialValue: (initialValue?: string) => void;
    setLoading: (loading?: boolean) => void;
    setValidating: (validating?: boolean) => void;
    setSubmitting: (submitting?: boolean) => void;
    onInput: (...args: any[]) => Promise<void>;
    onFocus: (...args: any[]) => Promise<void>;
    onBlur: (...args: any[]) => Promise<void>;
    validate: (triggerType?: ValidatorTriggerType) => any;
    submit: <T>(onSubmit?: (values: any) => void | Promise<T>) => Promise<T>;
    reset: (options?: IFieldResetOptions) => Promise<void>;
    queryFeedbacks: (search?: ISearchFeedback) => IFieldFeedback[];
    modify: () => void;
    title: string;
    description: string;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    content: any;
    data: any;
    decoratorType: any;
    decoratorProps: Record<string, any>;
    componentType: any;
    componentProps: Record<string, any>;
    designable: boolean;
    form: Form<any>;
    actions: IFieldActions;
    locate: (address: Pattern) => void;
    readonly index: number;
    readonly records: any[];
    readonly record: any;
    component: FieldComponent<any, any>;
    decorator: FieldDecorator<any, any>;
    readonly parent: GeneralField;
    display: FieldDisplayTypes;
    pattern: FieldPatternTypes;
    editable: boolean;
    disabled: boolean;
    readOnly: boolean;
    readPretty: boolean;
    hidden: boolean;
    visible: boolean;
    readonly destroyed: boolean;
    setTitle: (title?: string) => void;
    setDescription: (description?: string) => void;
    setDisplay: (type?: FieldDisplayTypes) => void;
    setPattern: (type?: FieldPatternTypes) => void;
    setComponent: <C extends unknown, ComponentProps extends object = {}>(component?: C, props?: ComponentProps) => void;
    setComponentProps: <ComponentProps_1 extends object = {}>(props?: ComponentProps_1) => void;
    setDecorator: <D extends unknown, ComponentProps_2 extends object = {}>(component?: D, props?: ComponentProps_2) => void;
    setDecoratorProps: <ComponentProps_3 extends object = {}>(props?: ComponentProps_3) => void;
    setData: (data: any) => void;
    setContent: (content: any) => void;
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    query: (pattern: Pattern) => Query;
    notify: (type: LifeCycleTypes, payload?: any) => void;
    dispose: () => void;
    destroy: (forceClear?: boolean) => void;
    match: (pattern: Pattern) => boolean;
    inject: (actions: IFieldActions) => void;
    invoke: (name: string, ...args: any[]) => any;
}>>>;
declare const isVoidFieldState: (state: any) => state is Partial<Pick<VoidField<any, any, any>, NonFunctionPropertyNames<{
    title: string;
    description: string;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    content: any;
    data: any;
    decoratorType: any;
    decoratorProps: Record<string, any>;
    componentType: any;
    componentProps: Record<string, any>;
    designable: boolean;
    form: Form<any>;
    actions: IFieldActions;
    locate: (address: Pattern) => void;
    readonly index: number;
    readonly records: any[];
    readonly record: any;
    component: FieldComponent<any, any>;
    decorator: FieldDecorator<any, any>;
    readonly parent: GeneralField;
    display: FieldDisplayTypes;
    pattern: FieldPatternTypes;
    editable: boolean;
    disabled: boolean;
    readOnly: boolean;
    readPretty: boolean;
    hidden: boolean;
    visible: boolean;
    readonly destroyed: boolean;
    setTitle: (title?: string) => void;
    setDescription: (description?: string) => void;
    setDisplay: (type?: FieldDisplayTypes) => void;
    setPattern: (type?: FieldPatternTypes) => void;
    setComponent: <C extends unknown, ComponentProps extends object = {}>(component?: C, props?: ComponentProps) => void;
    setComponentProps: <ComponentProps_1 extends object = {}>(props?: ComponentProps_1) => void;
    setDecorator: <D extends unknown, ComponentProps_2 extends object = {}>(component?: D, props?: ComponentProps_2) => void;
    setDecoratorProps: <ComponentProps_3 extends object = {}>(props?: ComponentProps_3) => void;
    setData: (data: any) => void;
    setContent: (content: any) => void;
    onInit: () => void;
    onMount: () => void;
    onUnmount: () => void;
    query: (pattern: Pattern) => Query;
    notify: (type: LifeCycleTypes, payload?: any) => void;
    dispose: () => void;
    destroy: (forceClear?: boolean) => void;
    match: (pattern: Pattern) => boolean;
    inject: (actions: IFieldActions) => void;
    invoke: (name: string, ...args: any[]) => any;
}>>>;
declare const isQuery: (query: any) => query is Query;

declare const createForm: <T extends object = any>(options?: IFormProps<T>) => Form<T>;

declare const onFormInit: (callback: (form: Form) => void) => void;
declare const onFormMount: (callback: (form: Form) => void) => void;
declare const onFormUnmount: (callback: (form: Form) => void) => void;
declare const onFormValuesChange: (callback: (form: Form) => void) => void;
declare const onFormInitialValuesChange: (callback: (form: Form) => void) => void;
declare const onFormInputChange: (callback: (form: Form) => void) => void;
declare const onFormSubmit: (callback: (form: Form) => void) => void;
declare const onFormReset: (callback: (form: Form) => void) => void;
declare const onFormSubmitStart: (callback: (form: Form) => void) => void;
declare const onFormSubmitEnd: (callback: (form: Form) => void) => void;
declare const onFormSubmitSuccess: (callback: (form: Form) => void) => void;
declare const onFormSubmitFailed: (callback: (form: Form) => void) => void;
declare const onFormSubmitValidateStart: (callback: (form: Form) => void) => void;
declare const onFormSubmitValidateSuccess: (callback: (form: Form) => void) => void;
declare const onFormSubmitValidateFailed: (callback: (form: Form) => void) => void;
declare const onFormSubmitValidateEnd: (callback: (form: Form) => void) => void;
declare const onFormValidateStart: (callback: (form: Form) => void) => void;
declare const onFormValidateSuccess: (callback: (form: Form) => void) => void;
declare const onFormValidateFailed: (callback: (form: Form) => void) => void;
declare const onFormValidateEnd: (callback: (form: Form) => void) => void;
declare const onFormGraphChange: (callback: (form: Form) => void) => void;
declare const onFormLoading: (callback: (form: Form) => void) => void;
declare function onFormReact(callback?: (form: Form) => void): void;

declare const onFieldMount: (pattern: FormPathPattern, callback: (field: GeneralField, form: Form) => void) => void;
declare const onFieldUnmount: (pattern: FormPathPattern, callback: (field: GeneralField, form: Form) => void) => void;
declare const onFieldValueChange: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldInitialValueChange: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldInputValueChange: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldValidateStart: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldValidateEnd: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldValidating: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldValidateFailed: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldValidateSuccess: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmit: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitStart: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitEnd: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitValidateStart: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitValidateEnd: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitSuccess: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitFailed: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitValidateSuccess: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldSubmitValidateFailed: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldReset: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare const onFieldLoading: (pattern: FormPathPattern, callback: (field: DataField, form: Form) => void) => void;
declare function onFieldInit(pattern: FormPathPattern, callback?: (field: GeneralField, form: Form) => void): void;
declare function onFieldReact(pattern: FormPathPattern, callback?: (field: GeneralField, form: Form) => void): void;
declare function onFieldChange(pattern: FormPathPattern, callback?: (field: GeneralField, form: Form) => void): void;
declare function onFieldChange(pattern: FormPathPattern, watches: (keyof IFieldState)[], callback?: (field: GeneralField, form: Form) => void): void;

export { AnyFunction, ArrayField, DataField, FeedbackMessage, Field, FieldComponent, FieldDataSource, FieldDecorator, FieldDisplayTypes, FieldFeedbackCodeTypes, FieldFeedbackTriggerTypes, FieldFeedbackTypes, FieldMatchPattern, FieldPatternTypes, FieldReaction, FieldValidator, FieldValidatorContext, Form, FormDisplayTypes, Path as FormPath, FormPathPattern, FormPatternTypes, GeneralField, Graph, Heart, HeartSubscriber, IExchangeArrayStateProps, IFieldActions, IFieldCaches, IFieldFactoryProps, IFieldFeedback, IFieldProps, IFieldRequests, IFieldResetOptions, IFieldState, IFieldStateGetter, IFieldStateSetter, IFieldUpdate, IFormFeedback, IFormFields, IFormGraph, IFormMergeStrategy, IFormProps, IFormRequests, IFormState, IGeneralFieldState, IHeartProps, IModelGetter, IModelSetter, INodePatch, IQueryProps, ISearchFeedback, ISpliceArrayStateProps, IVoidFieldFactoryProps, IVoidFieldProps, IVoidFieldState, JSXComponent, LifeCycle, LifeCycleHandler, LifeCyclePayload, LifeCycleTypes, NonFunctionProperties, NonFunctionPropertyNames, ObjectField, Query, VoidField, createEffectContext, createEffectHook, createForm, getLocaleByPath, getValidateLocaleIOSCode, isArrayField, isArrayFieldState, isDataField, isDataFieldState, isField, isFieldState, isForm, isFormState, isGeneralField, isGeneralFieldState, isObjectField, isObjectFieldState, isQuery, isVoidField, isVoidFieldState, onFieldChange, onFieldInit, onFieldInitialValueChange, onFieldInputValueChange, onFieldLoading, onFieldMount, onFieldReact, onFieldReset, onFieldSubmit, onFieldSubmitEnd, onFieldSubmitFailed, onFieldSubmitStart, onFieldSubmitSuccess, onFieldSubmitValidateEnd, onFieldSubmitValidateFailed, onFieldSubmitValidateStart, onFieldSubmitValidateSuccess, onFieldUnmount, onFieldValidateEnd, onFieldValidateFailed, onFieldValidateStart, onFieldValidateSuccess, onFieldValidating, onFieldValueChange, onFormGraphChange, onFormInit, onFormInitialValuesChange, onFormInputChange, onFormLoading, onFormMount, onFormReact, onFormReset, onFormSubmit, onFormSubmitEnd, onFormSubmitFailed, onFormSubmitStart, onFormSubmitSuccess, onFormSubmitValidateEnd, onFormSubmitValidateFailed, onFormSubmitValidateStart, onFormSubmitValidateSuccess, onFormUnmount, onFormValidateEnd, onFormValidateFailed, onFormValidateStart, onFormValidateSuccess, onFormValuesChange, registerValidateFormats, registerValidateLocale, registerValidateMessageTemplateEngine, registerValidateRules, setValidateLanguage, useEffectForm };
