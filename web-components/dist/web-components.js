/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

let kernelMode;
const kernelAttr = "fast-kernel";
try {
  if (document.currentScript) {
    kernelMode = document.currentScript.getAttribute(kernelAttr);
  } else {
    const scripts = document.getElementsByTagName("script");
    const currentScript = scripts[scripts.length - 1];
    kernelMode = currentScript.getAttribute(kernelAttr);
  }
} catch (e) {
  kernelMode = "isolate";
}
let KernelServiceId;
switch (kernelMode) {
  case "share":
    // share the kernel across major versions
    KernelServiceId = Object.freeze({
      updateQueue: 1,
      observable: 2,
      contextEvent: 3,
      elementRegistry: 4
    });
    break;
  case "share-v2":
    // only share the kernel with other v2 instances
    KernelServiceId = Object.freeze({
      updateQueue: 1.2,
      observable: 2.2,
      contextEvent: 3.2,
      elementRegistry: 4.2
    });
    break;
  default:
    // fully isolate the kernel from all other FAST instances
    const postfix = `-${Math.random().toString(36).substring(2, 8)}`;
    KernelServiceId = Object.freeze({
      updateQueue: `1.2${postfix}`,
      observable: `2.2${postfix}`,
      contextEvent: `3.2${postfix}`,
      elementRegistry: `4.2${postfix}`
    });
    break;
}
/**
 * Determines whether or not an object is a function.
 * @public
 */
const isFunction = object => typeof object === "function";
/**
 * Determines whether or not an object is a string.
 * @public
 */
const isString = object => typeof object === "string";
/**
 * A function which does nothing.
 * @public
 */
const noop = () => void 0;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/* eslint-disable @typescript-eslint/ban-ts-comment */
(function ensureGlobalThis() {
  if (typeof globalThis !== "undefined") {
    // We're running in a modern environment.
    return;
  }
  // @ts-ignore
  if (typeof commonjsGlobal !== "undefined") {
    // We're running in NodeJS
    // @ts-ignore
    commonjsGlobal.globalThis = commonjsGlobal;
  } else if (typeof self !== "undefined") {
    self.globalThis = self;
  } else if (typeof window !== "undefined") {
    // We're running in the browser's main thread.
    window.globalThis = window;
  } else {
    // Hopefully we never get here...
    // Not all environments allow eval and Function. Use only as a last resort:
    // eslint-disable-next-line no-new-func
    const result = new Function("return this")();
    result.globalThis = result;
  }
})();

// ensure FAST global - duplicated debug.ts
const propConfig = {
  configurable: false,
  enumerable: false,
  writable: false
};
if (globalThis.FAST === void 0) {
  Reflect.defineProperty(globalThis, "FAST", Object.assign({
    value: Object.create(null)
  }, propConfig));
}
/**
 * The FAST global.
 * @public
 */
const FAST = globalThis.FAST;
if (FAST.getById === void 0) {
  const storage = Object.create(null);
  Reflect.defineProperty(FAST, "getById", Object.assign({
    value(id, initialize) {
      let found = storage[id];
      if (found === void 0) {
        found = initialize ? storage[id] = initialize() : null;
      }
      return found;
    }
  }, propConfig));
}
if (FAST.error === void 0) {
  Object.assign(FAST, {
    warn() {},
    error(code) {
      return new Error(`Error ${code}`);
    },
    addMessages() {}
  });
}
/**
 * A readonly, empty array.
 * @remarks
 * Typically returned by APIs that return arrays when there are
 * no actual items to return.
 * @public
 */
const emptyArray = Object.freeze([]);
/**
 * Do not change. Part of shared kernel contract.
 * @internal
 */
function createTypeRegistry() {
  const typeToDefinition = new Map();
  return Object.freeze({
    register(definition) {
      if (typeToDefinition.has(definition.type)) {
        return false;
      }
      typeToDefinition.set(definition.type, definition);
      return true;
    },
    getByType(key) {
      return typeToDefinition.get(key);
    },
    getForInstance(object) {
      if (object === null || object === void 0) {
        return void 0;
      }
      return typeToDefinition.get(object.constructor);
    }
  });
}
/**
 * Creates a function capable of locating metadata associated with a type.
 * @returns A metadata locator function.
 * @internal
 */
function createMetadataLocator() {
  const metadataLookup = new WeakMap();
  return function (target) {
    let metadata = metadataLookup.get(target);
    if (metadata === void 0) {
      let currentTarget = Reflect.getPrototypeOf(target);
      while (metadata === void 0 && currentTarget !== null) {
        metadata = metadataLookup.get(currentTarget);
        currentTarget = Reflect.getPrototypeOf(currentTarget);
      }
      metadata = metadata === void 0 ? [] : metadata.slice(0);
      metadataLookup.set(target, metadata);
    }
    return metadata;
  };
}
/**
 * Makes a type noop for JSON serialization.
 * @param type - The type to make noop for JSON serialization.
 * @internal
 */
function makeSerializationNoop(type) {
  type.prototype.toJSON = noop;
}

/**
 * The type of HTML aspect to target.
 * @public
 */
const DOMAspect = Object.freeze({
  /**
   * Not aspected.
   */
  none: 0,
  /**
   * An attribute.
   */
  attribute: 1,
  /**
   * A boolean attribute.
   */
  booleanAttribute: 2,
  /**
   * A property.
   */
  property: 3,
  /**
   * Content
   */
  content: 4,
  /**
   * A token list.
   */
  tokenList: 5,
  /**
   * An event.
   */
  event: 6
});
const createHTML$1 = html => html;
const fastTrustedType = globalThis.trustedTypes ? globalThis.trustedTypes.createPolicy("fast-html", {
  createHTML: createHTML$1
}) : {
  createHTML: createHTML$1
};
let defaultPolicy = Object.freeze({
  createHTML(value) {
    return fastTrustedType.createHTML(value);
  },
  protect(tagName, aspect, aspectName, sink) {
    return sink;
  }
});
const fastPolicy = defaultPolicy;
/**
 * Common DOM APIs.
 * @public
 */
const DOM = Object.freeze({
  /**
   * Gets the dom policy used by the templating system.
   */
  get policy() {
    return defaultPolicy;
  },
  /**
   * Sets the dom policy used by the templating system.
   * @param policy - The policy to set.
   * @remarks
   * This API can only be called once, for security reasons. It should be
   * called by the application developer at the start of their program.
   */
  setPolicy(value) {
    if (defaultPolicy !== fastPolicy) {
      throw FAST.error(1201 /* Message.onlySetDOMPolicyOnce */);
    }

    defaultPolicy = value;
  },
  /**
   * Sets an attribute value on an element.
   * @param element - The element to set the attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is `null` or `undefined`, the attribute is removed, otherwise
   * it is set to the provided value using the standard `setAttribute` API.
   */
  setAttribute(element, attributeName, value) {
    value === null || value === undefined ? element.removeAttribute(attributeName) : element.setAttribute(attributeName, value);
  },
  /**
   * Sets a boolean attribute value.
   * @param element - The element to set the boolean attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is true, the attribute is added; otherwise it is removed.
   */
  setBooleanAttribute(element, attributeName, value) {
    value ? element.setAttribute(attributeName, "") : element.removeAttribute(attributeName);
  }
});

/**
 * The default UpdateQueue.
 * @public
 */
const Updates = FAST.getById(KernelServiceId.updateQueue, () => {
  const tasks = [];
  const pendingErrors = [];
  const rAF = globalThis.requestAnimationFrame;
  let updateAsync = true;
  function throwFirstError() {
    if (pendingErrors.length) {
      throw pendingErrors.shift();
    }
  }
  function tryRunTask(task) {
    try {
      task.call();
    } catch (error) {
      if (updateAsync) {
        pendingErrors.push(error);
        setTimeout(throwFirstError, 0);
      } else {
        tasks.length = 0;
        throw error;
      }
    }
  }
  function process() {
    const capacity = 1024;
    let index = 0;
    while (index < tasks.length) {
      tryRunTask(tasks[index]);
      index++;
      // Prevent leaking memory for long chains of recursive calls to `enqueue`.
      // If we call `enqueue` within a task scheduled by `enqueue`, the queue will
      // grow, but to avoid an O(n) walk for every task we execute, we don't
      // shift tasks off the queue after they have been executed.
      // Instead, we periodically shift 1024 tasks off the queue.
      if (index > capacity) {
        // Manually shift all values starting at the index back to the
        // beginning of the queue.
        for (let scan = 0, newLength = tasks.length - index; scan < newLength; scan++) {
          tasks[scan] = tasks[scan + index];
        }
        tasks.length -= index;
        index = 0;
      }
    }
    tasks.length = 0;
  }
  function enqueue(callable) {
    tasks.push(callable);
    if (tasks.length < 2) {
      updateAsync ? rAF(process) : process();
    }
  }
  return Object.freeze({
    enqueue,
    next: () => new Promise(enqueue),
    process,
    setMode: isAsync => updateAsync = isAsync
  });
});

/**
 * An implementation of {@link Notifier} that efficiently keeps track of
 * subscribers interested in a specific change notification on an
 * observable subject.
 *
 * @remarks
 * This set is optimized for the most common scenario of 1 or 2 subscribers.
 * With this in mind, it can store a subscriber in an internal field, allowing it to avoid Array#push operations.
 * If the set ever exceeds two subscribers, it upgrades to an array automatically.
 * @public
 */
class SubscriberSet {
  /**
   * Creates an instance of SubscriberSet for the specified subject.
   * @param subject - The subject that subscribers will receive notifications from.
   * @param initialSubscriber - An initial subscriber to changes.
   */
  constructor(subject, initialSubscriber) {
    this.sub1 = void 0;
    this.sub2 = void 0;
    this.spillover = void 0;
    this.subject = subject;
    this.sub1 = initialSubscriber;
  }
  /**
   * Checks whether the provided subscriber has been added to this set.
   * @param subscriber - The subscriber to test for inclusion in this set.
   */
  has(subscriber) {
    return this.spillover === void 0 ? this.sub1 === subscriber || this.sub2 === subscriber : this.spillover.indexOf(subscriber) !== -1;
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   */
  subscribe(subscriber) {
    const spillover = this.spillover;
    if (spillover === void 0) {
      if (this.has(subscriber)) {
        return;
      }
      if (this.sub1 === void 0) {
        this.sub1 = subscriber;
        return;
      }
      if (this.sub2 === void 0) {
        this.sub2 = subscriber;
        return;
      }
      this.spillover = [this.sub1, this.sub2, subscriber];
      this.sub1 = void 0;
      this.sub2 = void 0;
    } else {
      const index = spillover.indexOf(subscriber);
      if (index === -1) {
        spillover.push(subscriber);
      }
    }
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   */
  unsubscribe(subscriber) {
    const spillover = this.spillover;
    if (spillover === void 0) {
      if (this.sub1 === subscriber) {
        this.sub1 = void 0;
      } else if (this.sub2 === subscriber) {
        this.sub2 = void 0;
      }
    } else {
      const index = spillover.indexOf(subscriber);
      if (index !== -1) {
        spillover.splice(index, 1);
      }
    }
  }
  /**
   * Notifies all subscribers.
   * @param args - Data passed along to subscribers during notification.
   */
  notify(args) {
    const spillover = this.spillover;
    const subject = this.subject;
    if (spillover === void 0) {
      const sub1 = this.sub1;
      const sub2 = this.sub2;
      if (sub1 !== void 0) {
        sub1.handleChange(subject, args);
      }
      if (sub2 !== void 0) {
        sub2.handleChange(subject, args);
      }
    } else {
      for (let i = 0, ii = spillover.length; i < ii; ++i) {
        spillover[i].handleChange(subject, args);
      }
    }
  }
}
/**
 * An implementation of Notifier that allows subscribers to be notified
 * of individual property changes on an object.
 * @public
 */
class PropertyChangeNotifier {
  /**
   * Creates an instance of PropertyChangeNotifier for the specified subject.
   * @param subject - The object that subscribers will receive notifications for.
   */
  constructor(subject) {
    this.subscribers = {};
    this.subjectSubscribers = null;
    this.subject = subject;
  }
  /**
   * Notifies all subscribers, based on the specified property.
   * @param propertyName - The property name, passed along to subscribers during notification.
   */
  notify(propertyName) {
    var _a, _b;
    (_a = this.subscribers[propertyName]) === null || _a === void 0 ? void 0 : _a.notify(propertyName);
    (_b = this.subjectSubscribers) === null || _b === void 0 ? void 0 : _b.notify(propertyName);
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
   */
  subscribe(subscriber, propertyToWatch) {
    var _a, _b;
    let subscribers;
    if (propertyToWatch) {
      subscribers = (_a = this.subscribers[propertyToWatch]) !== null && _a !== void 0 ? _a : this.subscribers[propertyToWatch] = new SubscriberSet(this.subject);
    } else {
      subscribers = (_b = this.subjectSubscribers) !== null && _b !== void 0 ? _b : this.subjectSubscribers = new SubscriberSet(this.subject);
    }
    subscribers.subscribe(subscriber);
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
   */
  unsubscribe(subscriber, propertyToUnwatch) {
    var _a, _b;
    if (propertyToUnwatch) {
      (_a = this.subscribers[propertyToUnwatch]) === null || _a === void 0 ? void 0 : _a.unsubscribe(subscriber);
    } else {
      (_b = this.subjectSubscribers) === null || _b === void 0 ? void 0 : _b.unsubscribe(subscriber);
    }
  }
}

/**
 * Describes how the source's lifetime relates to its controller's lifetime.
 * @public
 */
const SourceLifetime = Object.freeze({
  /**
   * The source to controller lifetime relationship is unknown.
   */
  unknown: void 0,
  /**
   * The source and controller lifetimes are coupled to one another.
   * They can/will be GC'd together.
   */
  coupled: 1
});
/**
 * Common Observable APIs.
 * @public
 */
const Observable = FAST.getById(KernelServiceId.observable, () => {
  const queueUpdate = Updates.enqueue;
  const volatileRegex = /(:|&&|\|\||if|\?\.)/;
  const notifierLookup = new WeakMap();
  let watcher = void 0;
  let createArrayObserver = array => {
    throw FAST.error(1101 /* Message.needsArrayObservation */);
  };

  function getNotifier(source) {
    var _a;
    let found = (_a = source.$fastController) !== null && _a !== void 0 ? _a : notifierLookup.get(source);
    if (found === void 0) {
      Array.isArray(source) ? found = createArrayObserver(source) : notifierLookup.set(source, found = new PropertyChangeNotifier(source));
    }
    return found;
  }
  const getAccessors = createMetadataLocator();
  class DefaultObservableAccessor {
    constructor(name) {
      this.name = name;
      this.field = `_${name}`;
      this.callback = `${name}Changed`;
    }
    getValue(source) {
      if (watcher !== void 0) {
        watcher.watch(source, this.name);
      }
      return source[this.field];
    }
    setValue(source, newValue) {
      const field = this.field;
      const oldValue = source[field];
      if (oldValue !== newValue) {
        source[field] = newValue;
        const callback = source[this.callback];
        if (isFunction(callback)) {
          callback.call(source, oldValue, newValue);
        }
        getNotifier(source).notify(this.name);
      }
    }
  }
  class ExpressionNotifierImplementation extends SubscriberSet {
    constructor(expression, initialSubscriber, isVolatileBinding = false) {
      super(expression, initialSubscriber);
      this.expression = expression;
      this.isVolatileBinding = isVolatileBinding;
      this.needsRefresh = true;
      this.needsQueue = true;
      this.isAsync = true;
      this.first = this;
      this.last = null;
      this.propertySource = void 0;
      this.propertyName = void 0;
      this.notifier = void 0;
      this.next = void 0;
    }
    setMode(isAsync) {
      this.isAsync = this.needsQueue = isAsync;
    }
    bind(controller) {
      this.controller = controller;
      const value = this.observe(controller.source, controller.context);
      if (!controller.isBound && this.requiresUnbind(controller)) {
        controller.onUnbind(this);
      }
      return value;
    }
    requiresUnbind(controller) {
      return controller.sourceLifetime !== SourceLifetime.coupled || this.first !== this.last || this.first.propertySource !== controller.source;
    }
    unbind(controller) {
      this.dispose();
    }
    observe(source, context) {
      if (this.needsRefresh && this.last !== null) {
        this.dispose();
      }
      const previousWatcher = watcher;
      watcher = this.needsRefresh ? this : void 0;
      this.needsRefresh = this.isVolatileBinding;
      let result;
      try {
        result = this.expression(source, context);
      } finally {
        watcher = previousWatcher;
      }
      return result;
    }
    // backwards compat with v1 kernel
    disconnect() {
      this.dispose();
    }
    dispose() {
      if (this.last !== null) {
        let current = this.first;
        while (current !== void 0) {
          current.notifier.unsubscribe(this, current.propertyName);
          current = current.next;
        }
        this.last = null;
        this.needsRefresh = this.needsQueue = this.isAsync;
      }
    }
    watch(propertySource, propertyName) {
      const prev = this.last;
      const notifier = getNotifier(propertySource);
      const current = prev === null ? this.first : {};
      current.propertySource = propertySource;
      current.propertyName = propertyName;
      current.notifier = notifier;
      notifier.subscribe(this, propertyName);
      if (prev !== null) {
        if (!this.needsRefresh) {
          // Declaring the variable prior to assignment below circumvents
          // a bug in Angular's optimization process causing infinite recursion
          // of this watch() method. Details https://github.com/microsoft/fast/issues/4969
          let prevValue;
          watcher = void 0;
          /* eslint-disable-next-line */
          prevValue = prev.propertySource[prev.propertyName];
          /* eslint-disable-next-line */
          watcher = this;
          if (propertySource === prevValue) {
            this.needsRefresh = true;
          }
        }
        prev.next = current;
      }
      this.last = current;
    }
    handleChange() {
      if (this.needsQueue) {
        this.needsQueue = false;
        queueUpdate(this);
      } else if (!this.isAsync) {
        this.call();
      }
    }
    call() {
      if (this.last !== null) {
        this.needsQueue = this.isAsync;
        this.notify(this);
      }
    }
    *records() {
      let next = this.first;
      while (next !== void 0) {
        yield next;
        next = next.next;
      }
    }
  }
  makeSerializationNoop(ExpressionNotifierImplementation);
  return Object.freeze({
    /**
     * @internal
     * @param factory - The factory used to create array observers.
     */
    setArrayObserverFactory(factory) {
      createArrayObserver = factory;
    },
    /**
     * Gets a notifier for an object or Array.
     * @param source - The object or Array to get the notifier for.
     */
    getNotifier,
    /**
     * Records a property change for a source object.
     * @param source - The object to record the change against.
     * @param propertyName - The property to track as changed.
     */
    track(source, propertyName) {
      watcher && watcher.watch(source, propertyName);
    },
    /**
     * Notifies watchers that the currently executing property getter or function is volatile
     * with respect to its observable dependencies.
     */
    trackVolatile() {
      watcher && (watcher.needsRefresh = true);
    },
    /**
     * Notifies subscribers of a source object of changes.
     * @param source - the object to notify of changes.
     * @param args - The change args to pass to subscribers.
     */
    notify(source, args) {
      /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      getNotifier(source).notify(args);
    },
    /**
     * Defines an observable property on an object or prototype.
     * @param target - The target object to define the observable on.
     * @param nameOrAccessor - The name of the property to define as observable;
     * or a custom accessor that specifies the property name and accessor implementation.
     */
    defineProperty(target, nameOrAccessor) {
      if (isString(nameOrAccessor)) {
        nameOrAccessor = new DefaultObservableAccessor(nameOrAccessor);
      }
      getAccessors(target).push(nameOrAccessor);
      Reflect.defineProperty(target, nameOrAccessor.name, {
        enumerable: true,
        get() {
          return nameOrAccessor.getValue(this);
        },
        set(newValue) {
          nameOrAccessor.setValue(this, newValue);
        }
      });
    },
    /**
     * Finds all the observable accessors defined on the target,
     * including its prototype chain.
     * @param target - The target object to search for accessor on.
     */
    getAccessors,
    /**
     * Creates a {@link ExpressionNotifier} that can watch the
     * provided {@link Expression} for changes.
     * @param expression - The binding to observe.
     * @param initialSubscriber - An initial subscriber to changes in the binding value.
     * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
     */
    binding(expression, initialSubscriber, isVolatileBinding = this.isVolatileBinding(expression)) {
      return new ExpressionNotifierImplementation(expression, initialSubscriber, isVolatileBinding);
    },
    /**
     * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
     * on every evaluation of the value.
     * @param expression - The binding to inspect.
     */
    isVolatileBinding(expression) {
      return volatileRegex.test(expression.toString());
    }
  });
});
/**
 * Decorator: Defines an observable property on the target.
 * @param target - The target to define the observable on.
 * @param nameOrAccessor - The property name or accessor to define the observable as.
 * @public
 */
function observable(target, nameOrAccessor) {
  Observable.defineProperty(target, nameOrAccessor);
}
const contextEvent = FAST.getById(KernelServiceId.contextEvent, () => {
  let current = null;
  return {
    get() {
      return current;
    },
    set(event) {
      current = event;
    }
  };
});
/**
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
const ExecutionContext = Object.freeze({
  /**
   * A default execution context.
   */
  default: {
    index: 0,
    length: 0,
    get event() {
      return ExecutionContext.getEvent();
    },
    eventDetail() {
      return this.event.detail;
    },
    eventTarget() {
      return this.event.target;
    }
  },
  /**
   * Gets the current event.
   * @returns An event object.
   */
  getEvent() {
    return contextEvent.get();
  },
  /**
   * Sets the current event.
   * @param event - An event object.
   */
  setEvent(event) {
    contextEvent.set(event);
  }
});

/**
 * Captures a binding expression along with related information and capabilities.
 *
 * @public
 */
class Binding {
  /**
   * Creates a binding.
   * @param evaluate - Evaluates the binding.
   * @param policy - The security policy to associate with this binding.
   * @param isVolatile - Indicates whether the binding is volatile.
   */
  constructor(evaluate, policy, isVolatile = false) {
    this.evaluate = evaluate;
    this.policy = policy;
    this.isVolatile = isVolatile;
  }
}

class OneWayBinding extends Binding {
  createObserver(subscriber) {
    return Observable.binding(this.evaluate, subscriber, this.isVolatile);
  }
}
/**
 * Creates an standard binding.
 * @param expression - The binding to refresh when changed.
 * @param policy - The security policy to associate with th binding.
 * @param isVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding configuration.
 * @public
 */
function oneWay(expression, policy, isVolatile = Observable.isVolatileBinding(expression)) {
  return new OneWayBinding(expression, policy, isVolatile);
}

class OneTimeBinding extends Binding {
  createObserver() {
    return this;
  }
  bind(controller) {
    return this.evaluate(controller.source, controller.context);
  }
}
makeSerializationNoop(OneTimeBinding);
/**
 * Creates a one time binding
 * @param expression - The binding to refresh when signaled.
 * @param policy - The security policy to associate with th binding.
 * @returns A binding configuration.
 * @public
 */
function oneTime(expression, policy) {
  return new OneTimeBinding(expression, policy);
}

let DefaultStyleStrategy;
function reduceStyles(styles) {
  return styles.map(x => x instanceof ElementStyles ? reduceStyles(x.styles) : [x]).reduce((prev, curr) => prev.concat(curr), []);
}
/**
 * Represents styles that can be applied to a custom element.
 * @public
 */
class ElementStyles {
  /**
   * Creates an instance of ElementStyles.
   * @param styles - The styles that will be associated with elements.
   */
  constructor(styles) {
    this.styles = styles;
    this.targets = new WeakSet();
    this._strategy = null;
    this.behaviors = styles.map(x => x instanceof ElementStyles ? x.behaviors : null).reduce((prev, curr) => curr === null ? prev : prev === null ? curr : prev.concat(curr), null);
  }
  /**
   * Gets the StyleStrategy associated with these element styles.
   */
  get strategy() {
    if (this._strategy === null) {
      this.withStrategy(DefaultStyleStrategy);
    }
    return this._strategy;
  }
  /** @internal */
  addStylesTo(target) {
    this.strategy.addStylesTo(target);
    this.targets.add(target);
  }
  /** @internal */
  removeStylesFrom(target) {
    this.strategy.removeStylesFrom(target);
    this.targets.delete(target);
  }
  /** @internal */
  isAttachedTo(target) {
    return this.targets.has(target);
  }
  /**
   * Associates behaviors with this set of styles.
   * @param behaviors - The behaviors to associate.
   */
  withBehaviors(...behaviors) {
    this.behaviors = this.behaviors === null ? behaviors : this.behaviors.concat(behaviors);
    return this;
  }
  /**
   * Sets the strategy that handles adding/removing these styles for an element.
   * @param strategy - The strategy to use.
   */
  withStrategy(Strategy) {
    this._strategy = new Strategy(reduceStyles(this.styles));
    return this;
  }
  /**
   * Sets the default strategy type to use when creating style strategies.
   * @param Strategy - The strategy type to construct.
   */
  static setDefaultStrategy(Strategy) {
    DefaultStyleStrategy = Strategy;
  }
  /**
   * Normalizes a set of composable style options.
   * @param styles - The style options to normalize.
   * @returns A singular ElementStyles instance or undefined.
   */
  static normalize(styles) {
    return styles === void 0 ? void 0 : Array.isArray(styles) ? new ElementStyles(styles) : styles instanceof ElementStyles ? styles : new ElementStyles([styles]);
  }
}
/**
 * Indicates whether the DOM supports the adoptedStyleSheets feature.
 */
ElementStyles.supportsAdoptedStyleSheets = Array.isArray(document.adoptedStyleSheets) && "replace" in CSSStyleSheet.prototype;

const registry$1 = createTypeRegistry();
/**
 * Instructs the css engine to provide dynamic styles or
 * associate behaviors with styles.
 * @public
 */
const CSSDirective = Object.freeze({
  /**
   * Gets the directive definition associated with the instance.
   * @param instance - The directive instance to retrieve the definition for.
   */
  getForInstance: registry$1.getForInstance,
  /**
   * Gets the directive definition associated with the specified type.
   * @param type - The directive type to retrieve the definition for.
   */
  getByType: registry$1.getByType,
  /**
   * Defines a CSSDirective.
   * @param type - The type to define as a directive.
   */
  define(type) {
    registry$1.register({
      type
    });
    return type;
  }
});
/**
 * Decorator: Defines a CSSDirective.
 * @public
 */
function cssDirective() {
  /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
  return function (type) {
    CSSDirective.define(type);
  };
}

function handleChange(directive, controller, observer) {
  controller.source.style.setProperty(directive.targetAspect, observer.bind(controller));
}
/**
 * Enables bindings in CSS.
 *
 * @public
 */
class CSSBindingDirective {
  /**
   * Creates an instance of CSSBindingDirective.
   * @param dataBinding - The binding to use in CSS.
   * @param targetAspect - The CSS property to target.
   */
  constructor(dataBinding, targetAspect) {
    this.dataBinding = dataBinding;
    this.targetAspect = targetAspect;
  }
  /**
   * Creates a CSS fragment to interpolate into the CSS document.
   * @returns - the string to interpolate into CSS
   */
  createCSS(add) {
    add(this);
    return `var(${this.targetAspect})`;
  }
  /**
   * Executed when this behavior is attached to a controller.
   * @param controller - Controls the behavior lifecycle.
   */
  addedCallback(controller) {
    var _a;
    const element = controller.source;
    if (!element.$cssBindings) {
      element.$cssBindings = new Map();
      const setAttribute = element.setAttribute;
      element.setAttribute = (attr, value) => {
        setAttribute.call(element, attr, value);
        if (attr === "style") {
          element.$cssBindings.forEach((v, k) => handleChange(k, v.controller, v.observer));
        }
      };
    }
    const observer = (_a = controller[this.targetAspect]) !== null && _a !== void 0 ? _a : controller[this.targetAspect] = this.dataBinding.createObserver(this, this);
    observer.controller = controller;
    controller.source.$cssBindings.set(this, {
      controller,
      observer
    });
  }
  /**
   * Executed when this behavior's host is connected.
   * @param controller - Controls the behavior lifecycle.
   */
  connectedCallback(controller) {
    handleChange(this, controller, controller[this.targetAspect]);
  }
  /**
   * Executed when this behavior is detached from a controller.
   * @param controller - Controls the behavior lifecycle.
   */
  removedCallback(controller) {
    if (controller.source.$cssBindings) {
      controller.source.$cssBindings.delete(this);
    }
  }
  /**
   * Called when a subject this instance has subscribed to changes.
   * @param subject - The subject of the change.
   * @param args - The event args detailing the change that occurred.
   *
   * @internal
   */
  handleChange(_, observer) {
    handleChange(this, observer.controller, observer);
  }
}
CSSDirective.define(CSSBindingDirective);

const marker$1 = `${Math.random().toString(36).substring(2, 8)}`;
let varId = 0;
const nextCSSVariable = () => `--v${marker$1}${++varId}`;
function collectStyles(strings, values) {
  const styles = [];
  let cssString = "";
  const behaviors = [];
  const add = behavior => {
    behaviors.push(behavior);
  };
  for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
    cssString += strings[i];
    let value = values[i];
    if (isFunction(value)) {
      value = new CSSBindingDirective(oneWay(value), nextCSSVariable()).createCSS(add);
    } else if (value instanceof Binding) {
      value = new CSSBindingDirective(value, nextCSSVariable()).createCSS(add);
    } else if (CSSDirective.getForInstance(value) !== void 0) {
      value = value.createCSS(add);
    }
    if (value instanceof ElementStyles || value instanceof CSSStyleSheet) {
      if (cssString.trim() !== "") {
        styles.push(cssString);
        cssString = "";
      }
      styles.push(value);
    } else {
      cssString += value;
    }
  }
  cssString += strings[strings.length - 1];
  if (cssString.trim() !== "") {
    styles.push(cssString);
  }
  return {
    styles,
    behaviors
  };
}
/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * @public
 */
const css = (strings, ...values) => {
  const {
    styles,
    behaviors
  } = collectStyles(strings, values);
  const elementStyles = new ElementStyles(styles);
  return behaviors.length ? elementStyles.withBehaviors(...behaviors) : elementStyles;
};
class CSSPartial {
  constructor(styles, behaviors) {
    this.behaviors = behaviors;
    this.css = "";
    const stylesheets = styles.reduce((accumulated, current) => {
      if (isString(current)) {
        this.css += current;
      } else {
        accumulated.push(current);
      }
      return accumulated;
    }, []);
    if (stylesheets.length) {
      this.styles = new ElementStyles(stylesheets);
    }
  }
  createCSS(add) {
    this.behaviors.forEach(add);
    if (this.styles) {
      add(this);
    }
    return this.css;
  }
  addedCallback(controller) {
    controller.addStyles(this.styles);
  }
  removedCallback(controller) {
    controller.removeStyles(this.styles);
  }
}
CSSDirective.define(CSSPartial);
css.partial = (strings, ...values) => {
  const {
    styles,
    behaviors
  } = collectStyles(strings, values);
  return new CSSPartial(styles, behaviors);
};

const marker = `fast-${Math.random().toString(36).substring(2, 8)}`;
const interpolationStart = `${marker}{`;
const interpolationEnd = `}${marker}`;
const interpolationEndLength = interpolationEnd.length;
let id$1 = 0;
/** @internal */
const nextId = () => `${marker}-${++id$1}`;
/**
 * Common APIs related to markup generation.
 * @public
 */
const Markup = Object.freeze({
  /**
   * Creates a placeholder string suitable for marking out a location *within*
   * an attribute value or HTML content.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by binding directives.
   */
  interpolation: id => `${interpolationStart}${id}${interpolationEnd}`,
  /**
   * Creates a placeholder that manifests itself as an attribute on an
   * element.
   * @param attributeName - The name of the custom attribute.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
   */
  attribute: id => `${nextId()}="${interpolationStart}${id}${interpolationEnd}"`,
  /**
   * Creates a placeholder that manifests itself as a marker within the DOM structure.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by structural directives such as `repeat`.
   */
  comment: id => `<!--${interpolationStart}${id}${interpolationEnd}-->`
});
/**
 * Common APIs related to content parsing.
 * @public
 */
const Parser = Object.freeze({
  /**
   * Parses text content or HTML attribute content, separating out the static strings
   * from the directives.
   * @param value - The content or attribute string to parse.
   * @param factories - A list of directives to search for in the string.
   * @returns A heterogeneous array of static strings interspersed with
   * directives or null if no directives are found in the string.
   */
  parse(value, factories) {
    const parts = value.split(interpolationStart);
    if (parts.length === 1) {
      return null;
    }
    const result = [];
    for (let i = 0, ii = parts.length; i < ii; ++i) {
      const current = parts[i];
      const index = current.indexOf(interpolationEnd);
      let literal;
      if (index === -1) {
        literal = current;
      } else {
        const factoryId = current.substring(0, index);
        result.push(factories[factoryId]);
        literal = current.substring(index + interpolationEndLength);
      }
      if (literal !== "") {
        result.push(literal);
      }
    }
    return result;
  }
});

const registry = createTypeRegistry();
/**
 * Instructs the template engine to apply behavior to a node.
 * @public
 */
const HTMLDirective = Object.freeze({
  /**
   * Gets the directive definition associated with the instance.
   * @param instance - The directive instance to retrieve the definition for.
   */
  getForInstance: registry.getForInstance,
  /**
   * Gets the directive definition associated with the specified type.
   * @param type - The directive type to retrieve the definition for.
   */
  getByType: registry.getByType,
  /**
   * Defines an HTMLDirective based on the options.
   * @param type - The type to define as a directive.
   * @param options - Options that specify the directive's application.
   */
  define(type, options) {
    options = options || {};
    options.type = type;
    registry.register(options);
    return type;
  },
  /**
   *
   * @param directive - The directive to assign the aspect to.
   * @param value - The value to base the aspect determination on.
   * @remarks
   * If a falsy value is provided, then the content aspect will be assigned.
   */
  assignAspect(directive, value) {
    if (!value) {
      directive.aspectType = DOMAspect.content;
      return;
    }
    directive.sourceAspect = value;
    switch (value[0]) {
      case ":":
        directive.targetAspect = value.substring(1);
        directive.aspectType = directive.targetAspect === "classList" ? DOMAspect.tokenList : DOMAspect.property;
        break;
      case "?":
        directive.targetAspect = value.substring(1);
        directive.aspectType = DOMAspect.booleanAttribute;
        break;
      case "@":
        directive.targetAspect = value.substring(1);
        directive.aspectType = DOMAspect.event;
        break;
      default:
        directive.targetAspect = value;
        directive.aspectType = DOMAspect.attribute;
        break;
    }
  }
});
/**
 * Decorator: Defines an HTMLDirective.
 * @param options - Provides options that specify the directive's application.
 * @public
 */
function htmlDirective(options) {
  /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
  return function (type) {
    HTMLDirective.define(type, options);
  };
}
/**
 * A base class used for attribute directives that don't need internal state.
 * @public
 */
class StatelessAttachedAttributeDirective {
  /**
   * Creates an instance of RefDirective.
   * @param options - The options to use in configuring the directive.
   */
  constructor(options) {
    this.options = options;
  }
  /**
   * Creates a placeholder string based on the directive's index within the template.
   * @param index - The index of the directive within the template.
   * @remarks
   * Creates a custom attribute placeholder.
   */
  createHTML(add) {
    return Markup.attribute(add(this));
  }
  /**
   * Creates a behavior.
   * @param targets - The targets available for behaviors to be attached to.
   */
  createBehavior() {
    return this;
  }
}
makeSerializationNoop(StatelessAttachedAttributeDirective);

function updateContent(target, aspect, value, controller) {
  // If there's no actual value, then this equates to the
  // empty string for the purposes of content bindings.
  if (value === null || value === undefined) {
    value = "";
  }
  // If the value has a "create" method, then it's a ContentTemplate.
  if (value.create) {
    target.textContent = "";
    let view = target.$fastView;
    // If there's no previous view that we might be able to
    // reuse then create a new view from the template.
    if (view === void 0) {
      view = value.create();
    } else {
      // If there is a previous view, but it wasn't created
      // from the same template as the new value, then we
      // need to remove the old view if it's still in the DOM
      // and create a new view from the template.
      if (target.$fastTemplate !== value) {
        if (view.isComposed) {
          view.remove();
          view.unbind();
        }
        view = value.create();
      }
    }
    // It's possible that the value is the same as the previous template
    // and that there's actually no need to compose it.
    if (!view.isComposed) {
      view.isComposed = true;
      view.bind(controller.source, controller.context);
      view.insertBefore(target);
      target.$fastView = view;
      target.$fastTemplate = value;
    } else if (view.needsBindOnly) {
      view.needsBindOnly = false;
      view.bind(controller.source, controller.context);
    }
  } else {
    const view = target.$fastView;
    // If there is a view and it's currently composed into
    // the DOM, then we need to remove it.
    if (view !== void 0 && view.isComposed) {
      view.isComposed = false;
      view.remove();
      if (view.needsBindOnly) {
        view.needsBindOnly = false;
      } else {
        view.unbind();
      }
    }
    target.textContent = value;
  }
}
function updateTokenList(target, aspect, value) {
  var _a;
  const lookup = `${this.id}-t`;
  const state = (_a = target[lookup]) !== null && _a !== void 0 ? _a : target[lookup] = {
    v: 0,
    cv: Object.create(null)
  };
  const classVersions = state.cv;
  let version = state.v;
  const tokenList = target[aspect];
  // Add the classes, tracking the version at which they were added.
  if (value !== null && value !== undefined && value.length) {
    const names = value.split(/\s+/);
    for (let i = 0, ii = names.length; i < ii; ++i) {
      const currentName = names[i];
      if (currentName === "") {
        continue;
      }
      classVersions[currentName] = version;
      tokenList.add(currentName);
    }
  }
  state.v = version + 1;
  // If this is the first call to add classes, there's no need to remove old ones.
  if (version === 0) {
    return;
  }
  // Remove classes from the previous version.
  version -= 1;
  for (const name in classVersions) {
    if (classVersions[name] === version) {
      tokenList.remove(name);
    }
  }
}
const sinkLookup = {
  [DOMAspect.attribute]: DOM.setAttribute,
  [DOMAspect.booleanAttribute]: DOM.setBooleanAttribute,
  [DOMAspect.property]: (t, a, v) => t[a] = v,
  [DOMAspect.content]: updateContent,
  [DOMAspect.tokenList]: updateTokenList,
  [DOMAspect.event]: () => void 0
};
/**
 * A directive that applies bindings.
 * @public
 */
class HTMLBindingDirective {
  /**
   * Creates an instance of HTMLBindingDirective.
   * @param dataBinding - The binding configuration to apply.
   */
  constructor(dataBinding) {
    this.dataBinding = dataBinding;
    this.updateTarget = null;
    /**
     * The type of aspect to target.
     */
    this.aspectType = DOMAspect.content;
  }
  /**
   * Creates HTML to be used within a template.
   * @param add - Can be used to add  behavior factories to a template.
   */
  createHTML(add) {
    return Markup.interpolation(add(this));
  }
  /**
   * Creates a behavior.
   */
  createBehavior() {
    var _a;
    if (this.updateTarget === null) {
      const sink = sinkLookup[this.aspectType];
      const policy = (_a = this.dataBinding.policy) !== null && _a !== void 0 ? _a : this.policy;
      if (!sink) {
        throw FAST.error(1205 /* Message.unsupportedBindingBehavior */);
      }

      this.data = `${this.id}-d`;
      this.updateTarget = policy.protect(this.targetTagName, this.aspectType, this.targetAspect, sink);
    }
    return this;
  }
  /** @internal */
  bind(controller) {
    var _a;
    const target = controller.targets[this.targetNodeId];
    switch (this.aspectType) {
      case DOMAspect.event:
        target[this.data] = controller;
        target.addEventListener(this.targetAspect, this, this.dataBinding.options);
        break;
      case DOMAspect.content:
        controller.onUnbind(this);
      // intentional fall through
      default:
        const observer = (_a = target[this.data]) !== null && _a !== void 0 ? _a : target[this.data] = this.dataBinding.createObserver(this, this);
        observer.target = target;
        observer.controller = controller;
        this.updateTarget(target, this.targetAspect, observer.bind(controller), controller);
        break;
    }
  }
  /** @internal */
  unbind(controller) {
    const target = controller.targets[this.targetNodeId];
    const view = target.$fastView;
    if (view !== void 0 && view.isComposed) {
      view.unbind();
      view.needsBindOnly = true;
    }
  }
  /** @internal */
  handleEvent(event) {
    const controller = event.currentTarget[this.data];
    if (controller.isBound) {
      ExecutionContext.setEvent(event);
      const result = this.dataBinding.evaluate(controller.source, controller.context);
      ExecutionContext.setEvent(null);
      if (result !== true) {
        event.preventDefault();
      }
    }
  }
  /** @internal */
  handleChange(binding, observer) {
    const target = observer.target;
    const controller = observer.controller;
    this.updateTarget(target, this.targetAspect, observer.bind(controller), controller);
  }
}
HTMLDirective.define(HTMLBindingDirective, {
  aspected: true
});

function removeNodeSequence(firstNode, lastNode) {
  const parent = firstNode.parentNode;
  let current = firstNode;
  let next;
  while (current !== lastNode) {
    next = current.nextSibling;
    parent.removeChild(current);
    current = next;
  }
  parent.removeChild(lastNode);
}
/**
 * The standard View implementation, which also implements ElementView and SyntheticView.
 * @public
 */
class HTMLView {
  /**
   * Constructs an instance of HTMLView.
   * @param fragment - The html fragment that contains the nodes for this view.
   * @param behaviors - The behaviors to be applied to this view.
   */
  constructor(fragment, factories, targets) {
    this.fragment = fragment;
    this.factories = factories;
    this.targets = targets;
    this.behaviors = null;
    this.unbindables = [];
    /**
     * The data that the view is bound to.
     */
    this.source = null;
    /**
     * Indicates whether the controller is bound.
     */
    this.isBound = false;
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    this.sourceLifetime = SourceLifetime.unknown;
    /**
     * The execution context the view is running within.
     */
    this.context = this;
    /**
     * The index of the current item within a repeat context.
     */
    this.index = 0;
    /**
     * The length of the current collection within a repeat context.
     */
    this.length = 0;
    this.firstChild = fragment.firstChild;
    this.lastChild = fragment.lastChild;
  }
  /**
   * The current event within an event handler.
   */
  get event() {
    return ExecutionContext.getEvent();
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an even index.
   */
  get isEven() {
    return this.index % 2 === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an odd index.
   */
  get isOdd() {
    return this.index % 2 !== 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the first item in the collection.
   */
  get isFirst() {
    return this.index === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is somewhere in the middle of the collection.
   */
  get isInMiddle() {
    return !this.isFirst && !this.isLast;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the last item in the collection.
   */
  get isLast() {
    return this.index === this.length - 1;
  }
  /**
   * Returns the typed event detail of a custom event.
   */
  eventDetail() {
    return this.event.detail;
  }
  /**
   * Returns the typed event target of the event.
   */
  eventTarget() {
    return this.event.target;
  }
  /**
   * Appends the view's DOM nodes to the referenced node.
   * @param node - The parent node to append the view's DOM nodes to.
   */
  appendTo(node) {
    node.appendChild(this.fragment);
  }
  /**
   * Inserts the view's DOM nodes before the referenced node.
   * @param node - The node to insert the view's DOM before.
   */
  insertBefore(node) {
    if (this.fragment.hasChildNodes()) {
      node.parentNode.insertBefore(this.fragment, node);
    } else {
      const end = this.lastChild;
      if (node.previousSibling === end) return;
      const parentNode = node.parentNode;
      let current = this.firstChild;
      let next;
      while (current !== end) {
        next = current.nextSibling;
        parentNode.insertBefore(current, node);
        current = next;
      }
      parentNode.insertBefore(end, node);
    }
  }
  /**
   * Removes the view's DOM nodes.
   * The nodes are not disposed and the view can later be re-inserted.
   */
  remove() {
    const fragment = this.fragment;
    const end = this.lastChild;
    let current = this.firstChild;
    let next;
    while (current !== end) {
      next = current.nextSibling;
      fragment.appendChild(current);
      current = next;
    }
    fragment.appendChild(end);
  }
  /**
   * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
   * Once a view has been disposed, it cannot be inserted or bound again.
   */
  dispose() {
    removeNodeSequence(this.firstChild, this.lastChild);
    this.unbind();
  }
  onUnbind(behavior) {
    this.unbindables.push(behavior);
  }
  /**
   * Binds a view's behaviors to its binding source.
   * @param source - The binding source for the view's binding behaviors.
   * @param context - The execution context to run the behaviors within.
   */
  bind(source, context = this) {
    if (this.source === source) {
      return;
    }
    let behaviors = this.behaviors;
    if (behaviors === null) {
      this.source = source;
      this.context = context;
      this.behaviors = behaviors = new Array(this.factories.length);
      const factories = this.factories;
      for (let i = 0, ii = factories.length; i < ii; ++i) {
        const behavior = factories[i].createBehavior();
        behavior.bind(this);
        behaviors[i] = behavior;
      }
    } else {
      if (this.source !== null) {
        this.evaluateUnbindables();
      }
      this.isBound = false;
      this.source = source;
      this.context = context;
      for (let i = 0, ii = behaviors.length; i < ii; ++i) {
        behaviors[i].bind(this);
      }
    }
    this.isBound = true;
  }
  /**
   * Unbinds a view's behaviors from its binding source.
   */
  unbind() {
    if (!this.isBound || this.source === null) {
      return;
    }
    this.evaluateUnbindables();
    this.source = null;
    this.context = this;
    this.isBound = false;
  }
  evaluateUnbindables() {
    const unbindables = this.unbindables;
    for (let i = 0, ii = unbindables.length; i < ii; ++i) {
      unbindables[i].unbind(this);
    }
    unbindables.length = 0;
  }
  /**
   * Efficiently disposes of a contiguous range of synthetic view instances.
   * @param views - A contiguous range of views to be disposed.
   */
  static disposeContiguousBatch(views) {
    if (views.length === 0) {
      return;
    }
    removeNodeSequence(views[0].firstChild, views[views.length - 1].lastChild);
    for (let i = 0, ii = views.length; i < ii; ++i) {
      views[i].unbind();
    }
  }
}
makeSerializationNoop(HTMLView);
Observable.defineProperty(HTMLView.prototype, "index");
Observable.defineProperty(HTMLView.prototype, "length");

const targetIdFrom = (parentId, nodeIndex) => `${parentId}.${nodeIndex}`;
const descriptorCache = {};
// used to prevent creating lots of objects just to track node and index while compiling
const next = {
  index: 0,
  node: null
};
function tryWarn(name) {
  if (!name.startsWith("fast-")) {
    FAST.warn(1204 /* Message.hostBindingWithoutHost */, {
      name
    });
  }
}
const warningHost = new Proxy(document.createElement("div"), {
  get(target, property) {
    tryWarn(property);
    const value = Reflect.get(target, property);
    return isFunction(value) ? value.bind(target) : value;
  },
  set(target, property, value) {
    tryWarn(property);
    return Reflect.set(target, property, value);
  }
});
class CompilationContext {
  constructor(fragment, directives, policy) {
    this.fragment = fragment;
    this.directives = directives;
    this.policy = policy;
    this.proto = null;
    this.nodeIds = new Set();
    this.descriptors = {};
    this.factories = [];
  }
  addFactory(factory, parentId, nodeId, targetIndex, tagName) {
    var _a, _b;
    if (!this.nodeIds.has(nodeId)) {
      this.nodeIds.add(nodeId);
      this.addTargetDescriptor(parentId, nodeId, targetIndex);
    }
    factory.id = (_a = factory.id) !== null && _a !== void 0 ? _a : nextId();
    factory.targetNodeId = nodeId;
    factory.targetTagName = tagName;
    factory.policy = (_b = factory.policy) !== null && _b !== void 0 ? _b : this.policy;
    this.factories.push(factory);
  }
  freeze() {
    this.proto = Object.create(null, this.descriptors);
    return this;
  }
  addTargetDescriptor(parentId, targetId, targetIndex) {
    const descriptors = this.descriptors;
    if (targetId === "r" ||
    // root
    targetId === "h" ||
    // host
    descriptors[targetId]) {
      return;
    }
    if (!descriptors[parentId]) {
      const index = parentId.lastIndexOf(".");
      const grandparentId = parentId.substring(0, index);
      const childIndex = parseInt(parentId.substring(index + 1));
      this.addTargetDescriptor(grandparentId, parentId, childIndex);
    }
    let descriptor = descriptorCache[targetId];
    if (!descriptor) {
      const field = `_${targetId}`;
      descriptorCache[targetId] = descriptor = {
        get() {
          var _a;
          return (_a = this[field]) !== null && _a !== void 0 ? _a : this[field] = this[parentId].childNodes[targetIndex];
        }
      };
    }
    descriptors[targetId] = descriptor;
  }
  createView(hostBindingTarget) {
    const fragment = this.fragment.cloneNode(true);
    const targets = Object.create(this.proto);
    targets.r = fragment;
    targets.h = hostBindingTarget !== null && hostBindingTarget !== void 0 ? hostBindingTarget : warningHost;
    for (const id of this.nodeIds) {
      targets[id]; // trigger locator
    }

    return new HTMLView(fragment, this.factories, targets);
  }
}
function compileAttributes(context, parentId, node, nodeId, nodeIndex, includeBasicValues = false) {
  const attributes = node.attributes;
  const directives = context.directives;
  for (let i = 0, ii = attributes.length; i < ii; ++i) {
    const attr = attributes[i];
    const attrValue = attr.value;
    const parseResult = Parser.parse(attrValue, directives);
    let result = null;
    if (parseResult === null) {
      if (includeBasicValues) {
        result = new HTMLBindingDirective(oneTime(() => attrValue, context.policy));
        HTMLDirective.assignAspect(result, attr.name);
      }
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      result = Compiler.aggregate(parseResult, context.policy);
    }
    if (result !== null) {
      node.removeAttributeNode(attr);
      i--;
      ii--;
      context.addFactory(result, parentId, nodeId, nodeIndex, node.tagName);
    }
  }
}
function compileContent(context, node, parentId, nodeId, nodeIndex) {
  const parseResult = Parser.parse(node.textContent, context.directives);
  if (parseResult === null) {
    next.node = node.nextSibling;
    next.index = nodeIndex + 1;
    return next;
  }
  let currentNode;
  let lastNode = currentNode = node;
  for (let i = 0, ii = parseResult.length; i < ii; ++i) {
    const currentPart = parseResult[i];
    if (i !== 0) {
      nodeIndex++;
      nodeId = targetIdFrom(parentId, nodeIndex);
      currentNode = lastNode.parentNode.insertBefore(document.createTextNode(""), lastNode.nextSibling);
    }
    if (isString(currentPart)) {
      currentNode.textContent = currentPart;
    } else {
      currentNode.textContent = " ";
      HTMLDirective.assignAspect(currentPart);
      context.addFactory(currentPart, parentId, nodeId, nodeIndex, null);
    }
    lastNode = currentNode;
  }
  next.index = nodeIndex + 1;
  next.node = lastNode.nextSibling;
  return next;
}
function compileChildren(context, parent, parentId) {
  let nodeIndex = 0;
  let childNode = parent.firstChild;
  while (childNode) {
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    const result = compileNode(context, parentId, childNode, nodeIndex);
    childNode = result.node;
    nodeIndex = result.index;
  }
}
function compileNode(context, parentId, node, nodeIndex) {
  const nodeId = targetIdFrom(parentId, nodeIndex);
  switch (node.nodeType) {
    case 1:
      // element node
      compileAttributes(context, parentId, node, nodeId, nodeIndex);
      compileChildren(context, node, nodeId);
      break;
    case 3:
      // text node
      return compileContent(context, node, parentId, nodeId, nodeIndex);
    case 8:
      // comment
      const parts = Parser.parse(node.data, context.directives);
      if (parts !== null) {
        context.addFactory( /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        Compiler.aggregate(parts), parentId, nodeId, nodeIndex, null);
      }
      break;
  }
  next.index = nodeIndex + 1;
  next.node = node.nextSibling;
  return next;
}
function isMarker(node, directives) {
  return node && node.nodeType == 8 && Parser.parse(node.data, directives) !== null;
}
const templateTag = "TEMPLATE";
/**
 * Common APIs related to compilation.
 * @public
 */
const Compiler = {
  /**
   * Compiles a template and associated directives into a compilation
   * result which can be used to create views.
   * @param html - The html string or template element to compile.
   * @param factories - The behavior factories referenced by the template.
   * @param policy - The security policy to compile the html with.
   * @remarks
   * The template that is provided for compilation is altered in-place
   * and cannot be compiled again. If the original template must be preserved,
   * it is recommended that you clone the original and pass the clone to this API.
   * @public
   */
  compile(html, factories, policy = DOM.policy) {
    let template;
    if (isString(html)) {
      template = document.createElement(templateTag);
      template.innerHTML = policy.createHTML(html);
      const fec = template.content.firstElementChild;
      if (fec !== null && fec.tagName === templateTag) {
        template = fec;
      }
    } else {
      template = html;
    }
    if (!template.content.firstChild && !template.content.lastChild) {
      template.content.appendChild(document.createComment(""));
    }
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1111864
    const fragment = document.adoptNode(template.content);
    const context = new CompilationContext(fragment, factories, policy);
    compileAttributes(context, "", template, /* host */"h", 0, true);
    if (
    // If the first node in a fragment is a marker, that means it's an unstable first node,
    // because something like a when, repeat, etc. could add nodes before the marker.
    // To mitigate this, we insert a stable first node. However, if we insert a node,
    // that will alter the result of the TreeWalker. So, we also need to offset the target index.
    isMarker(fragment.firstChild, factories) ||
    // Or if there is only one node and a directive, it means the template's content
    // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
    // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
    fragment.childNodes.length === 1 && Object.keys(factories).length > 0) {
      fragment.insertBefore(document.createComment(""), fragment.firstChild);
    }
    compileChildren(context, fragment, /* root */"r");
    next.node = null; // prevent leaks
    return context.freeze();
  },
  /**
   * Sets the default compilation strategy that will be used by the ViewTemplate whenever
   * it needs to compile a view preprocessed with the html template function.
   * @param strategy - The compilation strategy to use when compiling templates.
   */
  setDefaultStrategy(strategy) {
    this.compile = strategy;
  },
  /**
   * Aggregates an array of strings and directives into a single directive.
   * @param parts - A heterogeneous array of static strings interspersed with
   * directives.
   * @param policy - The security policy to use with the aggregated bindings.
   * @returns A single inline directive that aggregates the behavior of all the parts.
   */
  aggregate(parts, policy = DOM.policy) {
    if (parts.length === 1) {
      return parts[0];
    }
    let sourceAspect;
    let binding;
    let isVolatile = false;
    let bindingPolicy = void 0;
    const partCount = parts.length;
    const finalParts = parts.map(x => {
      if (isString(x)) {
        return () => x;
      }
      sourceAspect = x.sourceAspect || sourceAspect;
      binding = x.dataBinding || binding;
      isVolatile = isVolatile || x.dataBinding.isVolatile;
      bindingPolicy = bindingPolicy || x.dataBinding.policy;
      return x.dataBinding.evaluate;
    });
    const expression = (scope, context) => {
      let output = "";
      for (let i = 0; i < partCount; ++i) {
        output += finalParts[i](scope, context);
      }
      return output;
    };
    binding.evaluate = expression;
    binding.isVolatile = isVolatile;
    binding.policy = bindingPolicy !== null && bindingPolicy !== void 0 ? bindingPolicy : policy;
    const directive = new HTMLBindingDirective(binding);
    HTMLDirective.assignAspect(directive, sourceAspect);
    return directive;
  }
};

// Much thanks to LitHTML for working this out!
const lastAttributeNameRegex = /* eslint-disable-next-line no-control-regex */
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
const noFactories = Object.create(null);
/**
 * Inlines a template into another template.
 * @public
 */
class InlineTemplateDirective {
  /**
   * Creates an instance of InlineTemplateDirective.
   * @param template - The template to inline.
   */
  constructor(html, factories = noFactories) {
    this.html = html;
    this.factories = factories;
  }
  /**
   * Creates HTML to be used within a template.
   * @param add - Can be used to add  behavior factories to a template.
   */
  createHTML(add) {
    const factories = this.factories;
    for (const key in factories) {
      add(factories[key]);
    }
    return this.html;
  }
}
/**
 * An empty template partial.
 */
InlineTemplateDirective.empty = new InlineTemplateDirective("");
HTMLDirective.define(InlineTemplateDirective);
function createHTML(value, prevString, add, definition = HTMLDirective.getForInstance(value)) {
  if (definition.aspected) {
    const match = lastAttributeNameRegex.exec(prevString);
    if (match !== null) {
      HTMLDirective.assignAspect(value, match[2]);
    }
  }
  return value.createHTML(add);
}
/**
 * A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
class ViewTemplate {
  /**
   * Creates an instance of ViewTemplate.
   * @param html - The html representing what this template will instantiate, including placeholders for directives.
   * @param factories - The directives that will be connected to placeholders in the html.
   * @param policy - The security policy to use when compiling this template.
   */
  constructor(html, factories = {}, policy) {
    this.policy = policy;
    this.result = null;
    this.html = html;
    this.factories = factories;
  }
  /**
   * Creates an HTMLView instance based on this template definition.
   * @param hostBindingTarget - The element that host behaviors will be bound to.
   */
  create(hostBindingTarget) {
    if (this.result === null) {
      this.result = Compiler.compile(this.html, this.factories, this.policy);
    }
    return this.result.createView(hostBindingTarget);
  }
  /**
   * Returns a directive that can inline the template.
   */
  inline() {
    return new InlineTemplateDirective(isString(this.html) ? this.html : this.html.innerHTML, this.factories);
  }
  /**
   * Sets the DOMPolicy for this template.
   * @param policy - The policy to associated with this template.
   * @returns The modified template instance.
   * @remarks
   * The DOMPolicy can only be set once for a template and cannot be
   * set after the template is compiled.
   */
  withPolicy(policy) {
    if (this.result) {
      throw FAST.error(1208 /* Message.cannotSetTemplatePolicyAfterCompilation */);
    }

    if (this.policy) {
      throw FAST.error(1207 /* Message.onlySetTemplatePolicyOnce */);
    }

    this.policy = policy;
    return this;
  }
  /**
   * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
   * @param source - The data source to bind the template to.
   * @param host - The Element where the template will be rendered.
   * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
   * host that the template is being attached to.
   */
  render(source, host, hostBindingTarget) {
    const view = this.create(hostBindingTarget);
    view.bind(source);
    view.appendTo(host);
    return view;
  }
  /**
   * Creates a template based on a set of static strings and dynamic values.
   * @param strings - The static strings to create the template with.
   * @param values - The dynamic values to create the template with.
   * @param policy - The DOMPolicy to associated with the template.
   * @returns A ViewTemplate.
   * @remarks
   * This API should not be used directly under normal circumstances because constructing
   * a template in this way, if not done properly, can open up the application to XSS
   * attacks. When using this API, provide a strong DOMPolicy that can properly sanitize
   * and also be sure to manually sanitize all static strings particularly if they can
   * come from user input.
   */
  static create(strings, values, policy) {
    let html = "";
    const factories = Object.create(null);
    const add = factory => {
      var _a;
      const id = (_a = factory.id) !== null && _a !== void 0 ? _a : factory.id = nextId();
      factories[id] = factory;
      return id;
    };
    for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
      const currentString = strings[i];
      let currentValue = values[i];
      let definition;
      html += currentString;
      if (isFunction(currentValue)) {
        currentValue = new HTMLBindingDirective(oneWay(currentValue));
      } else if (currentValue instanceof Binding) {
        currentValue = new HTMLBindingDirective(currentValue);
      } else if (!(definition = HTMLDirective.getForInstance(currentValue))) {
        const staticValue = currentValue;
        currentValue = new HTMLBindingDirective(oneTime(() => staticValue));
      }
      html += createHTML(currentValue, currentString, add, definition);
    }
    return new ViewTemplate(html + strings[strings.length - 1], factories, policy);
  }
}
makeSerializationNoop(ViewTemplate);
/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
const html = (strings, ...values) => {
  if (Array.isArray(strings) && Array.isArray(strings.raw)) {
    return ViewTemplate.create(strings, values);
  }
  throw FAST.error(1206 /* Message.directCallToHTMLTagNotAllowed */);
};

html.partial = html => {
  return new InlineTemplateDirective(html);
};

/**
 * The runtime behavior for template references.
 * @public
 */
class RefDirective extends StatelessAttachedAttributeDirective {
  /**
   * Bind this behavior.
   * @param controller - The view controller that manages the lifecycle of this behavior.
   */
  bind(controller) {
    controller.source[this.options] = controller.targets[this.targetNodeId];
  }
}
HTMLDirective.define(RefDirective);
/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
const ref = propertyName => new RefDirective(propertyName);

const noTemplate = () => null;
function normalizeBinding(value) {
  return value === undefined ? noTemplate : isFunction(value) ? value : () => value;
}
/**
 * A directive that enables basic conditional rendering in a template.
 * @param condition - The condition to test for rendering.
 * @param templateOrTemplateBinding - The template or a binding that gets
 * the template to render when the condition is true.
 * @param elseTemplateOrTemplateBinding - Optional template or binding that that
 * gets the template to render when the conditional is false.
 * @public
 */
function when(condition, templateOrTemplateBinding, elseTemplateOrTemplateBinding) {
  const dataBinding = isFunction(condition) ? condition : () => condition;
  const templateBinding = normalizeBinding(templateOrTemplateBinding);
  const elseBinding = normalizeBinding(elseTemplateOrTemplateBinding);
  return (source, context) => dataBinding(source, context) ? templateBinding(source, context) : elseBinding(source, context);
}

const selectElements = value => value.nodeType === 1;
/**
 * Creates a function that can be used to filter a Node array, selecting only elements.
 * @param selector - An optional selector to restrict the filter to.
 * @public
 */
const elements = selector => selector ? value => value.nodeType === 1 && value.matches(selector) : selectElements;
/**
 * A base class for node observation.
 * @public
 * @remarks
 * Internally used by the SlottedDirective and the ChildrenDirective.
 */
class NodeObservationDirective extends StatelessAttachedAttributeDirective {
  /**
   * The unique id of the factory.
   */
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
    this._controllerProperty = `${value}-c`;
  }
  /**
   * Bind this behavior to the source.
   * @param source - The source to bind to.
   * @param context - The execution context that the binding is operating within.
   * @param targets - The targets that behaviors in a view can attach to.
   */
  bind(controller) {
    const target = controller.targets[this.targetNodeId];
    target[this._controllerProperty] = controller;
    this.updateTarget(controller.source, this.computeNodes(target));
    this.observe(target);
    controller.onUnbind(this);
  }
  /**
   * Unbinds this behavior from the source.
   * @param source - The source to unbind from.
   * @param context - The execution context that the binding is operating within.
   * @param targets - The targets that behaviors in a view can attach to.
   */
  unbind(controller) {
    const target = controller.targets[this.targetNodeId];
    this.updateTarget(controller.source, emptyArray);
    this.disconnect(target);
    target[this._controllerProperty] = null;
  }
  /**
   * Gets the data source for the target.
   * @param target - The target to get the source for.
   * @returns The source.
   */
  getSource(target) {
    return target[this._controllerProperty].source;
  }
  /**
   * Updates the source property with the computed nodes.
   * @param source - The source object to assign the nodes property to.
   * @param value - The nodes to assign to the source object property.
   */
  updateTarget(source, value) {
    source[this.options.property] = value;
  }
  /**
   * Computes the set of nodes that should be assigned to the source property.
   * @param target - The target to compute the nodes for.
   * @returns The computed nodes.
   * @remarks
   * Applies filters if provided.
   */
  computeNodes(target) {
    let nodes = this.getNodes(target);
    if ("filter" in this.options) {
      nodes = nodes.filter(this.options.filter);
    }
    return nodes;
  }
}

const slotEvent = "slotchange";
/**
 * The runtime behavior for slotted node observation.
 * @public
 */
class SlottedDirective extends NodeObservationDirective {
  /**
   * Begins observation of the nodes.
   * @param target - The target to observe.
   */
  observe(target) {
    target.addEventListener(slotEvent, this);
  }
  /**
   * Disconnects observation of the nodes.
   * @param target - The target to unobserve.
   */
  disconnect(target) {
    target.removeEventListener(slotEvent, this);
  }
  /**
   * Retrieves the raw nodes that should be assigned to the source property.
   * @param target - The target to get the node to.
   */
  getNodes(target) {
    return target.assignedNodes(this.options);
  }
  /** @internal */
  handleEvent(event) {
    const target = event.currentTarget;
    this.updateTarget(this.getSource(target), this.computeNodes(target));
  }
}
HTMLDirective.define(SlottedDirective);
/**
 * A directive that observes the `assignedNodes()` of a slot and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure slotted node observation.
 * @public
 */
function slotted(propertyOrOptions) {
  if (isString(propertyOrOptions)) {
    propertyOrOptions = {
      property: propertyOrOptions
    };
  }
  return new SlottedDirective(propertyOrOptions);
}

const booleanMode = "boolean";
const reflectMode = "reflect";
/**
 * Metadata used to configure a custom attribute's behavior.
 * @public
 */
const AttributeConfiguration = Object.freeze({
  /**
   * Locates all attribute configurations associated with a type.
   */
  locate: createMetadataLocator()
});
/**
 * A {@link ValueConverter} that converts to and from `boolean` values.
 * @remarks
 * Used automatically when the `boolean` {@link AttributeMode} is selected.
 * @public
 */
const booleanConverter = {
  toView(value) {
    return value ? "true" : "false";
  },
  fromView(value) {
    return value === null || value === void 0 || value === "false" || value === false || value === 0 ? false : true;
  }
};
function toNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const number = value * 1;
  return isNaN(number) ? null : number;
}
/**
 * A {@link ValueConverter} that converts to and from `number` values.
 * @remarks
 * This converter allows for nullable numbers, returning `null` if the
 * input was `null`, `undefined`, or `NaN`.
 * @public
 */
const nullableNumberConverter = {
  toView(value) {
    const output = toNumber(value);
    return output ? output.toString() : output;
  },
  fromView: toNumber
};
/**
 * An implementation of {@link Accessor} that supports reactivity,
 * change callbacks, attribute reflection, and type conversion for
 * custom elements.
 * @public
 */
class AttributeDefinition {
  /**
   * Creates an instance of AttributeDefinition.
   * @param Owner - The class constructor that owns this attribute.
   * @param name - The name of the property associated with the attribute.
   * @param attribute - The name of the attribute in HTML.
   * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
   * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
   * to convert values to and from a DOM string.
   */
  constructor(Owner, name, attribute = name.toLowerCase(), mode = reflectMode, converter) {
    this.guards = new Set();
    this.Owner = Owner;
    this.name = name;
    this.attribute = attribute;
    this.mode = mode;
    this.converter = converter;
    this.fieldName = `_${name}`;
    this.callbackName = `${name}Changed`;
    this.hasCallback = this.callbackName in Owner.prototype;
    if (mode === booleanMode && converter === void 0) {
      this.converter = booleanConverter;
    }
  }
  /**
   * Sets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   * @param value - The value to set the attribute/property to.
   */
  setValue(source, newValue) {
    const oldValue = source[this.fieldName];
    const converter = this.converter;
    if (converter !== void 0) {
      newValue = converter.fromView(newValue);
    }
    if (oldValue !== newValue) {
      source[this.fieldName] = newValue;
      this.tryReflectToAttribute(source);
      if (this.hasCallback) {
        source[this.callbackName](oldValue, newValue);
      }
      source.$fastController.notify(this.name);
    }
  }
  /**
   * Gets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   */
  getValue(source) {
    Observable.track(source, this.name);
    return source[this.fieldName];
  }
  /** @internal */
  onAttributeChangedCallback(element, value) {
    if (this.guards.has(element)) {
      return;
    }
    this.guards.add(element);
    this.setValue(element, value);
    this.guards.delete(element);
  }
  tryReflectToAttribute(element) {
    const mode = this.mode;
    const guards = this.guards;
    if (guards.has(element) || mode === "fromView") {
      return;
    }
    Updates.enqueue(() => {
      guards.add(element);
      const latestValue = element[this.fieldName];
      switch (mode) {
        case reflectMode:
          const converter = this.converter;
          DOM.setAttribute(element, this.attribute, converter !== void 0 ? converter.toView(latestValue) : latestValue);
          break;
        case booleanMode:
          DOM.setBooleanAttribute(element, this.attribute, latestValue);
          break;
      }
      guards.delete(element);
    });
  }
  /**
   * Collects all attribute definitions associated with the owner.
   * @param Owner - The class constructor to collect attribute for.
   * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
   * @internal
   */
  static collect(Owner, ...attributeLists) {
    const attributes = [];
    attributeLists.push(AttributeConfiguration.locate(Owner));
    for (let i = 0, ii = attributeLists.length; i < ii; ++i) {
      const list = attributeLists[i];
      if (list === void 0) {
        continue;
      }
      for (let j = 0, jj = list.length; j < jj; ++j) {
        const config = list[j];
        if (isString(config)) {
          attributes.push(new AttributeDefinition(Owner, config));
        } else {
          attributes.push(new AttributeDefinition(Owner, config.property, config.attribute, config.mode, config.converter));
        }
      }
    }
    return attributes;
  }
}
function attr(configOrTarget, prop) {
  let config;
  function decorator($target, $prop) {
    if (arguments.length > 1) {
      // Non invocation:
      // - @attr
      // Invocation with or w/o opts:
      // - @attr()
      // - @attr({...opts})
      config.property = $prop;
    }
    AttributeConfiguration.locate($target.constructor).push(config);
  }
  if (arguments.length > 1) {
    // Non invocation:
    // - @attr
    config = {};
    decorator(configOrTarget, prop);
    return;
  }
  // Invocation with or w/o opts:
  // - @attr()
  // - @attr({...opts})
  config = configOrTarget === void 0 ? {} : configOrTarget;
  return decorator;
}

const defaultShadowOptions = {
  mode: "open"
};
const defaultElementOptions = {};
const fastElementBaseTypes = new Set();
const fastElementRegistry = FAST.getById(KernelServiceId.elementRegistry, () => createTypeRegistry());
/**
 * Defines metadata for a FASTElement.
 * @public
 */
class FASTElementDefinition {
  constructor(type, nameOrConfig = type.definition) {
    var _a;
    this.platformDefined = false;
    if (isString(nameOrConfig)) {
      nameOrConfig = {
        name: nameOrConfig
      };
    }
    this.type = type;
    this.name = nameOrConfig.name;
    this.template = nameOrConfig.template;
    this.registry = (_a = nameOrConfig.registry) !== null && _a !== void 0 ? _a : customElements;
    const proto = type.prototype;
    const attributes = AttributeDefinition.collect(type, nameOrConfig.attributes);
    const observedAttributes = new Array(attributes.length);
    const propertyLookup = {};
    const attributeLookup = {};
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
      const current = attributes[i];
      observedAttributes[i] = current.attribute;
      propertyLookup[current.name] = current;
      attributeLookup[current.attribute] = current;
      Observable.defineProperty(proto, current);
    }
    Reflect.defineProperty(type, "observedAttributes", {
      value: observedAttributes,
      enumerable: true
    });
    this.attributes = attributes;
    this.propertyLookup = propertyLookup;
    this.attributeLookup = attributeLookup;
    this.shadowOptions = nameOrConfig.shadowOptions === void 0 ? defaultShadowOptions : nameOrConfig.shadowOptions === null ? void 0 : Object.assign(Object.assign({}, defaultShadowOptions), nameOrConfig.shadowOptions);
    this.elementOptions = nameOrConfig.elementOptions === void 0 ? defaultElementOptions : Object.assign(Object.assign({}, defaultElementOptions), nameOrConfig.elementOptions);
    this.styles = ElementStyles.normalize(nameOrConfig.styles);
    fastElementRegistry.register(this);
  }
  /**
   * Indicates if this element has been defined in at least one registry.
   */
  get isDefined() {
    return this.platformDefined;
  }
  /**
   * Defines a custom element based on this definition.
   * @param registry - The element registry to define the element in.
   * @remarks
   * This operation is idempotent per registry.
   */
  define(registry = this.registry) {
    const type = this.type;
    if (!registry.get(this.name)) {
      this.platformDefined = true;
      registry.define(this.name, type, this.elementOptions);
    }
    return this;
  }
  /**
   * Creates an instance of FASTElementDefinition.
   * @param type - The type this definition is being created for.
   * @param nameOrDef - The name of the element to define or a config object
   * that describes the element to define.
   */
  static compose(type, nameOrDef) {
    if (fastElementBaseTypes.has(type) || fastElementRegistry.getByType(type)) {
      return new FASTElementDefinition(class extends type {}, nameOrDef);
    }
    return new FASTElementDefinition(type, nameOrDef);
  }
  /**
   * Registers a FASTElement base type.
   * @param type - The type to register as a base type.
   * @internal
   */
  static registerBaseType(type) {
    fastElementBaseTypes.add(type);
  }
}
/**
 * Gets the element definition associated with the specified type.
 * @param type - The custom element type to retrieve the definition for.
 */
FASTElementDefinition.getByType = fastElementRegistry.getByType;
/**
 * Gets the element definition associated with the instance.
 * @param instance - The custom element instance to retrieve the definition for.
 */
FASTElementDefinition.getForInstance = fastElementRegistry.getForInstance;

const defaultEventOptions = {
  bubbles: true,
  composed: true,
  cancelable: true
};
const isConnectedPropertyName = "isConnected";
const shadowRoots = new WeakMap();
function getShadowRoot(element) {
  var _a, _b;
  return (_b = (_a = element.shadowRoot) !== null && _a !== void 0 ? _a : shadowRoots.get(element)) !== null && _b !== void 0 ? _b : null;
}
let elementControllerStrategy;
/**
 * Controls the lifecycle and rendering of a `FASTElement`.
 * @public
 */
class ElementController extends PropertyChangeNotifier {
  /**
   * Creates a Controller to control the specified element.
   * @param element - The element to be controlled by this controller.
   * @param definition - The element definition metadata that instructs this
   * controller in how to handle rendering and other platform integrations.
   * @internal
   */
  constructor(element, definition) {
    super(element);
    this.boundObservables = null;
    this.needsInitialization = true;
    this.hasExistingShadowRoot = false;
    this._template = null;
    this.stage = 3 /* Stages.disconnected */;
    /**
     * A guard against connecting behaviors multiple times
     * during connect in scenarios where a behavior adds
     * another behavior during it's connectedCallback
     */
    this.guardBehaviorConnection = false;
    this.behaviors = null;
    this._mainStyles = null;
    /**
     * This allows Observable.getNotifier(...) to return the Controller
     * when the notifier for the Controller itself is being requested. The
     * result is that the Observable system does not need to create a separate
     * instance of Notifier for observables on the Controller. The component and
     * the controller will now share the same notifier, removing one-object construct
     * per web component instance.
     */
    this.$fastController = this;
    /**
     * The view associated with the custom element.
     * @remarks
     * If `null` then the element is managing its own rendering.
     */
    this.view = null;
    this.source = element;
    this.definition = definition;
    const shadowOptions = definition.shadowOptions;
    if (shadowOptions !== void 0) {
      let shadowRoot = element.shadowRoot;
      if (shadowRoot) {
        this.hasExistingShadowRoot = true;
      } else {
        shadowRoot = element.attachShadow(shadowOptions);
        if (shadowOptions.mode === "closed") {
          shadowRoots.set(element, shadowRoot);
        }
      }
    }
    // Capture any observable values that were set by the binding engine before
    // the browser upgraded the element. Then delete the property since it will
    // shadow the getter/setter that is required to make the observable operate.
    // Later, in the connect callback, we'll re-apply the values.
    const accessors = Observable.getAccessors(element);
    if (accessors.length > 0) {
      const boundObservables = this.boundObservables = Object.create(null);
      for (let i = 0, ii = accessors.length; i < ii; ++i) {
        const propertyName = accessors[i].name;
        const value = element[propertyName];
        if (value !== void 0) {
          delete element[propertyName];
          boundObservables[propertyName] = value;
        }
      }
    }
  }
  /**
   * Indicates whether or not the custom element has been
   * connected to the document.
   */
  get isConnected() {
    Observable.track(this, isConnectedPropertyName);
    return this.stage === 1 /* Stages.connected */;
  }
  /**
   * The context the expression is evaluated against.
   */
  get context() {
    var _a, _b;
    return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.context) !== null && _b !== void 0 ? _b : ExecutionContext.default;
  }
  /**
   * Indicates whether the controller is bound.
   */
  get isBound() {
    var _a, _b;
    return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.isBound) !== null && _b !== void 0 ? _b : false;
  }
  /**
   * Indicates how the source's lifetime relates to the controller's lifetime.
   */
  get sourceLifetime() {
    var _a;
    return (_a = this.view) === null || _a === void 0 ? void 0 : _a.sourceLifetime;
  }
  /**
   * Gets/sets the template used to render the component.
   * @remarks
   * This value can only be accurately read after connect but can be set at any time.
   */
  get template() {
    var _a;
    // 1. Template overrides take top precedence.
    if (this._template === null) {
      const definition = this.definition;
      if (this.source.resolveTemplate) {
        // 2. Allow for element instance overrides next.
        this._template = this.source.resolveTemplate();
      } else if (definition.template) {
        // 3. Default to the static definition.
        this._template = (_a = definition.template) !== null && _a !== void 0 ? _a : null;
      }
    }
    return this._template;
  }
  set template(value) {
    if (this._template === value) {
      return;
    }
    this._template = value;
    if (!this.needsInitialization) {
      this.renderTemplate(value);
    }
  }
  /**
   * The main set of styles used for the component, independent
   * of any dynamically added styles.
   */
  get mainStyles() {
    var _a;
    // 1. Styles overrides take top precedence.
    if (this._mainStyles === null) {
      const definition = this.definition;
      if (this.source.resolveStyles) {
        // 2. Allow for element instance overrides next.
        this._mainStyles = this.source.resolveStyles();
      } else if (definition.styles) {
        // 3. Default to the static definition.
        this._mainStyles = (_a = definition.styles) !== null && _a !== void 0 ? _a : null;
      }
    }
    return this._mainStyles;
  }
  set mainStyles(value) {
    if (this._mainStyles === value) {
      return;
    }
    if (this._mainStyles !== null) {
      this.removeStyles(this._mainStyles);
    }
    this._mainStyles = value;
    if (!this.needsInitialization) {
      this.addStyles(value);
    }
  }
  /**
   * Registers an unbind handler with the controller.
   * @param behavior - An object to call when the controller unbinds.
   */
  onUnbind(behavior) {
    var _a;
    (_a = this.view) === null || _a === void 0 ? void 0 : _a.onUnbind(behavior);
  }
  /**
   * Adds the behavior to the component.
   * @param behavior - The behavior to add.
   */
  addBehavior(behavior) {
    var _a, _b;
    const targetBehaviors = (_a = this.behaviors) !== null && _a !== void 0 ? _a : this.behaviors = new Map();
    const count = (_b = targetBehaviors.get(behavior)) !== null && _b !== void 0 ? _b : 0;
    if (count === 0) {
      targetBehaviors.set(behavior, 1);
      behavior.addedCallback && behavior.addedCallback(this);
      if (behavior.connectedCallback && !this.guardBehaviorConnection && (this.stage === 1 /* Stages.connected */ || this.stage === 0 /* Stages.connecting */)) {
        behavior.connectedCallback(this);
      }
    } else {
      targetBehaviors.set(behavior, count + 1);
    }
  }
  /**
   * Removes the behavior from the component.
   * @param behavior - The behavior to remove.
   * @param force - Forces removal even if this behavior was added more than once.
   */
  removeBehavior(behavior, force = false) {
    const targetBehaviors = this.behaviors;
    if (targetBehaviors === null) {
      return;
    }
    const count = targetBehaviors.get(behavior);
    if (count === void 0) {
      return;
    }
    if (count === 1 || force) {
      targetBehaviors.delete(behavior);
      if (behavior.disconnectedCallback && this.stage !== 3 /* Stages.disconnected */) {
        behavior.disconnectedCallback(this);
      }
      behavior.removedCallback && behavior.removedCallback(this);
    } else {
      targetBehaviors.set(behavior, count - 1);
    }
  }
  /**
   * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
   * @param styles - The styles to add.
   */
  addStyles(styles) {
    var _a;
    if (!styles) {
      return;
    }
    const source = this.source;
    if (styles instanceof HTMLElement) {
      const target = (_a = getShadowRoot(source)) !== null && _a !== void 0 ? _a : this.source;
      target.append(styles);
    } else if (!styles.isAttachedTo(source)) {
      const sourceBehaviors = styles.behaviors;
      styles.addStylesTo(source);
      if (sourceBehaviors !== null) {
        for (let i = 0, ii = sourceBehaviors.length; i < ii; ++i) {
          this.addBehavior(sourceBehaviors[i]);
        }
      }
    }
  }
  /**
   * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
   * @param styles - the styles to remove.
   */
  removeStyles(styles) {
    var _a;
    if (!styles) {
      return;
    }
    const source = this.source;
    if (styles instanceof HTMLElement) {
      const target = (_a = getShadowRoot(source)) !== null && _a !== void 0 ? _a : source;
      target.removeChild(styles);
    } else if (styles.isAttachedTo(source)) {
      const sourceBehaviors = styles.behaviors;
      styles.removeStylesFrom(source);
      if (sourceBehaviors !== null) {
        for (let i = 0, ii = sourceBehaviors.length; i < ii; ++i) {
          this.removeBehavior(sourceBehaviors[i]);
        }
      }
    }
  }
  /**
   * Runs connected lifecycle behavior on the associated element.
   */
  connect() {
    if (this.stage !== 3 /* Stages.disconnected */) {
      return;
    }
    this.stage = 0 /* Stages.connecting */;
    // If we have any observables that were bound, re-apply their values.
    if (this.boundObservables !== null) {
      const element = this.source;
      const boundObservables = this.boundObservables;
      const propertyNames = Object.keys(boundObservables);
      for (let i = 0, ii = propertyNames.length; i < ii; ++i) {
        const propertyName = propertyNames[i];
        element[propertyName] = boundObservables[propertyName];
      }
      this.boundObservables = null;
    }
    const behaviors = this.behaviors;
    if (behaviors !== null) {
      this.guardBehaviorConnection = true;
      for (const key of behaviors.keys()) {
        key.connectedCallback && key.connectedCallback(this);
      }
      this.guardBehaviorConnection = false;
    }
    if (this.needsInitialization) {
      this.renderTemplate(this.template);
      this.addStyles(this.mainStyles);
      this.needsInitialization = false;
    } else if (this.view !== null) {
      this.view.bind(this.source);
    }
    this.stage = 1 /* Stages.connected */;
    Observable.notify(this, isConnectedPropertyName);
  }
  /**
   * Runs disconnected lifecycle behavior on the associated element.
   */
  disconnect() {
    if (this.stage !== 1 /* Stages.connected */) {
      return;
    }
    this.stage = 2 /* Stages.disconnecting */;
    Observable.notify(this, isConnectedPropertyName);
    if (this.view !== null) {
      this.view.unbind();
    }
    const behaviors = this.behaviors;
    if (behaviors !== null) {
      for (const key of behaviors.keys()) {
        key.disconnectedCallback && key.disconnectedCallback(this);
      }
    }
    this.stage = 3 /* Stages.disconnected */;
  }
  /**
   * Runs the attribute changed callback for the associated element.
   * @param name - The name of the attribute that changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
   */
  onAttributeChangedCallback(name, oldValue, newValue) {
    const attrDef = this.definition.attributeLookup[name];
    if (attrDef !== void 0) {
      attrDef.onAttributeChangedCallback(this.source, newValue);
    }
  }
  /**
   * Emits a custom HTML event.
   * @param type - The type name of the event.
   * @param detail - The event detail object to send with the event.
   * @param options - The event options. By default bubbles and composed.
   * @remarks
   * Only emits events if connected.
   */
  emit(type, detail, options) {
    if (this.stage === 1 /* Stages.connected */) {
      return this.source.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign({
        detail
      }, defaultEventOptions), options)));
    }
    return false;
  }
  renderTemplate(template) {
    var _a;
    // When getting the host to render to, we start by looking
    // up the shadow root. If there isn't one, then that means
    // we're doing a Light DOM render to the element's direct children.
    const element = this.source;
    const host = (_a = getShadowRoot(element)) !== null && _a !== void 0 ? _a : element;
    if (this.view !== null) {
      // If there's already a view, we need to unbind and remove through dispose.
      this.view.dispose();
      this.view = null;
    } else if (!this.needsInitialization || this.hasExistingShadowRoot) {
      this.hasExistingShadowRoot = false;
      // If there was previous custom rendering, we need to clear out the host.
      for (let child = host.firstChild; child !== null; child = host.firstChild) {
        host.removeChild(child);
      }
    }
    if (template) {
      // If a new template was provided, render it.
      this.view = template.render(element, host, element);
      this.view.sourceLifetime = SourceLifetime.coupled;
    }
  }
  /**
   * Locates or creates a controller for the specified element.
   * @param element - The element to return the controller for.
   * @remarks
   * The specified element must have a {@link FASTElementDefinition}
   * registered either through the use of the {@link customElement}
   * decorator or a call to `FASTElement.define`.
   */
  static forCustomElement(element) {
    const controller = element.$fastController;
    if (controller !== void 0) {
      return controller;
    }
    const definition = FASTElementDefinition.getForInstance(element);
    if (definition === void 0) {
      throw FAST.error(1401 /* Message.missingElementDefinition */);
    }

    return element.$fastController = new elementControllerStrategy(element, definition);
  }
  /**
   * Sets the strategy that ElementController.forCustomElement uses to construct
   * ElementController instances for an element.
   * @param strategy - The strategy to use.
   */
  static setStrategy(strategy) {
    elementControllerStrategy = strategy;
  }
}
makeSerializationNoop(ElementController);
// Set default strategy for ElementController
ElementController.setStrategy(ElementController);
/**
 * Converts a styleTarget into the operative target. When the provided target is an Element
 * that is a FASTElement, the function will return the ShadowRoot for that element. Otherwise,
 * it will return the root node for the element.
 * @param target
 * @returns
 */
function normalizeStyleTarget(target) {
  var _a;
  if ("adoptedStyleSheets" in target) {
    return target;
  } else {
    return (_a = getShadowRoot(target)) !== null && _a !== void 0 ? _a : target.getRootNode();
  }
}
// Default StyleStrategy implementations are defined in this module because they
// require access to element shadowRoots, and we don't want to leak shadowRoot
// objects out of this module.
/**
 * https://wicg.github.io/construct-stylesheets/
 * https://developers.google.com/web/updates/2019/02/constructable-stylesheets
 *
 * @internal
 */
class AdoptedStyleSheetsStrategy {
  constructor(styles) {
    const styleSheetCache = AdoptedStyleSheetsStrategy.styleSheetCache;
    this.sheets = styles.map(x => {
      if (x instanceof CSSStyleSheet) {
        return x;
      }
      let sheet = styleSheetCache.get(x);
      if (sheet === void 0) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(x);
        styleSheetCache.set(x, sheet);
      }
      return sheet;
    });
  }
  addStylesTo(target) {
    addAdoptedStyleSheets(normalizeStyleTarget(target), this.sheets);
  }
  removeStylesFrom(target) {
    removeAdoptedStyleSheets(normalizeStyleTarget(target), this.sheets);
  }
}
AdoptedStyleSheetsStrategy.styleSheetCache = new Map();
let id = 0;
const nextStyleId = () => `fast-${++id}`;
function usableStyleTarget(target) {
  return target === document ? document.body : target;
}
/**
 * @internal
 */
class StyleElementStrategy {
  constructor(styles) {
    this.styles = styles;
    this.styleClass = nextStyleId();
  }
  addStylesTo(target) {
    target = usableStyleTarget(normalizeStyleTarget(target));
    const styles = this.styles;
    const styleClass = this.styleClass;
    for (let i = 0; i < styles.length; i++) {
      const element = document.createElement("style");
      element.innerHTML = styles[i];
      element.className = styleClass;
      target.append(element);
    }
  }
  removeStylesFrom(target) {
    target = usableStyleTarget(normalizeStyleTarget(target));
    const styles = target.querySelectorAll(`.${this.styleClass}`);
    for (let i = 0, ii = styles.length; i < ii; ++i) {
      target.removeChild(styles[i]);
    }
  }
}
let addAdoptedStyleSheets = (target, sheets) => {
  target.adoptedStyleSheets = [...target.adoptedStyleSheets, ...sheets];
};
let removeAdoptedStyleSheets = (target, sheets) => {
  target.adoptedStyleSheets = target.adoptedStyleSheets.filter(x => sheets.indexOf(x) === -1);
};
if (ElementStyles.supportsAdoptedStyleSheets) {
  try {
    // Test if browser implementation uses FrozenArray.
    // If not, use push / splice to alter the stylesheets
    // in place. This circumvents a bug in Safari 16.4 where
    // periodically, assigning the array would previously
    // cause sheets to be removed.
    document.adoptedStyleSheets.push();
    document.adoptedStyleSheets.splice();
    addAdoptedStyleSheets = (target, sheets) => {
      target.adoptedStyleSheets.push(...sheets);
    };
    removeAdoptedStyleSheets = (target, sheets) => {
      for (const sheet of sheets) {
        const index = target.adoptedStyleSheets.indexOf(sheet);
        if (index !== -1) {
          target.adoptedStyleSheets.splice(index, 1);
        }
      }
    };
  } catch (e) {
    // Do nothing if an error is thrown, the default
    // case handles FrozenArray.
  }
  ElementStyles.setDefaultStrategy(AdoptedStyleSheetsStrategy);
} else {
  ElementStyles.setDefaultStrategy(StyleElementStrategy);
}

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
function createFASTElement(BaseType) {
  const type = class extends BaseType {
    constructor() {
      /* eslint-disable-next-line */
      super();
      ElementController.forCustomElement(this);
    }
    $emit(type, detail, options) {
      return this.$fastController.emit(type, detail, options);
    }
    connectedCallback() {
      this.$fastController.connect();
    }
    disconnectedCallback() {
      this.$fastController.disconnect();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.$fastController.onAttributeChangedCallback(name, oldValue, newValue);
    }
  };
  FASTElementDefinition.registerBaseType(type);
  return type;
}
function compose(type, nameOrDef) {
  if (isFunction(type)) {
    return FASTElementDefinition.compose(type, nameOrDef);
  }
  return FASTElementDefinition.compose(this, type);
}
function define(type, nameOrDef) {
  if (isFunction(type)) {
    return FASTElementDefinition.compose(type, nameOrDef).define().type;
  }
  return FASTElementDefinition.compose(this, type).define().type;
}
function from(BaseType) {
  return createFASTElement(BaseType);
}
/**
 * A minimal base class for FASTElements that also provides
 * static helpers for working with FASTElements.
 * @public
 */
const FASTElement = Object.assign(createFASTElement(HTMLElement), {
  /**
   * Creates a new FASTElement base class inherited from the
   * provided base type.
   * @param BaseType - The base element type to inherit from.
   */
  from,
  /**
   * Defines a platform custom element based on the provided type and definition.
   * @param type - The custom element type to define.
   * @param nameOrDef - The name of the element to define or a definition object
   * that describes the element to define.
   */
  define,
  /**
   * Defines metadata for a FASTElement which can be used to later define the element.
   * @public
   */
  compose
});

/**
 * Standard orientation values
 */
const Orientation = {
  horizontal: "horizontal",
  vertical: "vertical"
};

/**
 * A test that ensures that all arguments are HTML Elements
 */
function isHTMLElement$1(...args) {
  return args.every(arg => arg instanceof HTMLElement);
}

/**
 * String values for use with KeyboardEvent.key
 */
const keyArrowDown = "ArrowDown";
const keyArrowLeft = "ArrowLeft";
const keyArrowRight = "ArrowRight";
const keyArrowUp = "ArrowUp";
const keyEnd = "End";
const keyEnter = "Enter";
const keyEscape = "Escape";
const keyHome = "Home";
const keySpace = " ";
const keyTab = "Tab";
const ArrowKeys = {
  ArrowDown: keyArrowDown,
  ArrowLeft: keyArrowLeft,
  ArrowRight: keyArrowRight,
  ArrowUp: keyArrowUp
};

/**
 * Expose ltr and rtl strings
 */
var Direction;
(function (Direction) {
  Direction["ltr"] = "ltr";
  Direction["rtl"] = "rtl";
})(Direction || (Direction = {}));

/**
 * This method keeps a given value within the bounds of a min and max value. If the value
 * is larger than the max, the minimum value will be returned. If the value is smaller than the minimum,
 * the maximum will be returned. Otherwise, the value is returned un-changed.
 */
function wrapInBounds(min, max, value) {
  if (value < min) {
    return max;
  } else if (value > max) {
    return min;
  }
  return value;
}
/**
 * Ensures that a value is between a min and max value. If value is lower than min, min will be returned.
 * If value is greater than max, max will be returned.
 */
function limit(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

let uniqueIdCounter = 0;
/**
 * Generates a unique ID based on incrementing a counter.
 */
function uniqueId(prefix = "") {
  return `${prefix}${uniqueIdCounter++}`;
}

/**
 * Some states and properties are applicable to all host language elements regardless of whether a role is applied.
 * The following global states and properties are supported by all roles and by all base markup elements.
 * {@link https://www.w3.org/TR/wai-aria-1.1/#global_states}
 *
 * This is intended to be used as a mixin. Be sure you extend FASTElement.
 *
 * @public
 */
class ARIAGlobalStatesAndProperties {}
__decorate([attr({
  attribute: "aria-atomic"
})], ARIAGlobalStatesAndProperties.prototype, "ariaAtomic", void 0);
__decorate([attr({
  attribute: "aria-busy"
})], ARIAGlobalStatesAndProperties.prototype, "ariaBusy", void 0);
__decorate([attr({
  attribute: "aria-controls"
})], ARIAGlobalStatesAndProperties.prototype, "ariaControls", void 0);
__decorate([attr({
  attribute: "aria-current"
})], ARIAGlobalStatesAndProperties.prototype, "ariaCurrent", void 0);
__decorate([attr({
  attribute: "aria-describedby"
})], ARIAGlobalStatesAndProperties.prototype, "ariaDescribedby", void 0);
__decorate([attr({
  attribute: "aria-details"
})], ARIAGlobalStatesAndProperties.prototype, "ariaDetails", void 0);
__decorate([attr({
  attribute: "aria-disabled"
})], ARIAGlobalStatesAndProperties.prototype, "ariaDisabled", void 0);
__decorate([attr({
  attribute: "aria-errormessage"
})], ARIAGlobalStatesAndProperties.prototype, "ariaErrormessage", void 0);
__decorate([attr({
  attribute: "aria-flowto"
})], ARIAGlobalStatesAndProperties.prototype, "ariaFlowto", void 0);
__decorate([attr({
  attribute: "aria-haspopup"
})], ARIAGlobalStatesAndProperties.prototype, "ariaHaspopup", void 0);
__decorate([attr({
  attribute: "aria-hidden"
})], ARIAGlobalStatesAndProperties.prototype, "ariaHidden", void 0);
__decorate([attr({
  attribute: "aria-invalid"
})], ARIAGlobalStatesAndProperties.prototype, "ariaInvalid", void 0);
__decorate([attr({
  attribute: "aria-keyshortcuts"
})], ARIAGlobalStatesAndProperties.prototype, "ariaKeyshortcuts", void 0);
__decorate([attr({
  attribute: "aria-label"
})], ARIAGlobalStatesAndProperties.prototype, "ariaLabel", void 0);
__decorate([attr({
  attribute: "aria-labelledby"
})], ARIAGlobalStatesAndProperties.prototype, "ariaLabelledby", void 0);
__decorate([attr({
  attribute: "aria-live"
})], ARIAGlobalStatesAndProperties.prototype, "ariaLive", void 0);
__decorate([attr({
  attribute: "aria-owns"
})], ARIAGlobalStatesAndProperties.prototype, "ariaOwns", void 0);
__decorate([attr({
  attribute: "aria-relevant"
})], ARIAGlobalStatesAndProperties.prototype, "ariaRelevant", void 0);
__decorate([attr({
  attribute: "aria-roledescription"
})], ARIAGlobalStatesAndProperties.prototype, "ariaRoledescription", void 0);

/**
 * A function to compose template options.
 * @public
 */
function staticallyCompose(item) {
  if (!item) {
    return InlineTemplateDirective.empty;
  }
  if (typeof item === "string") {
    return new InlineTemplateDirective(item);
  }
  if ("inline" in item) {
    return item.inline();
  }
  return item;
}

/**
 * A mixin class implementing start and end slots.
 * These are generally used to decorate text elements with icons or other visual indicators.
 * @public
 */
class StartEnd {}
/**
 * The template for the end slot.
 * For use with {@link StartEnd}
 *
 * @public
 */
function endSlotTemplate(options) {
  return html`<slot name="end" ${ref("end")}>${staticallyCompose(options.end)}</slot>`.inline();
}
/**
 * The template for the start slots.
 * For use with {@link StartEnd}
 *
 * @public
 */
function startSlotTemplate(options) {
  return html`<slot name="start" ${ref("start")}>${staticallyCompose(options.start)}</slot>`.inline();
}

/**
 * Apply mixins to a constructor.
 * Sourced from {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }.
 * @internal
 */
function applyMixins$1(derivedCtor, ...baseCtors) {
  const derivedAttributes = AttributeConfiguration.locate(derivedCtor);
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== "constructor") {
        Object.defineProperty(derivedCtor.prototype, name, /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      }
    });
    const baseAttributes = AttributeConfiguration.locate(baseCtor);
    baseAttributes.forEach(x => derivedAttributes.push(x));
  });
}

/**
 * An individual item in an {@link @microsoft/fast-foundation#(FASTAccordion:class) }.
 *
 * @slot start - Content which can be provided between the heading and the icon
 * @slot end - Content which can be provided between the start slot and icon
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot expanded-icon - The expanded icon
 * @slot collapsed-icon - The collapsed icon
 * @fires change - Fires a custom 'change' event when the button is invoked
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart heading-content - Wraps the slot for the heading content within the button
 * @csspart icon - The icon container
 * @csspart region - The wrapper for the accordion item content
 *
 * @public
 */
class FASTAccordionItem extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
     * heading element.
     *
     * @defaultValue 2
     * @public
     * @remarks
     * HTML attribute: heading-level
     */
    this.headinglevel = 2;
    /**
     * Expands or collapses the item.
     *
     * @public
     * @remarks
     * HTML attribute: expanded
     */
    this.expanded = false;
    /**
     * Disables an accordion item
     *
     * @public
     * @remarks
     * HTML attribute: disabled
     */
    this.disabled = false;
    /**
     * The item ID
     *
     * @public
     * @remarks
     * HTML Attribute: id
     */
    this.id = uniqueId("accordion-");
    /**
     * @internal
     */
    this.clickHandler = e => {
      if (this.disabled) {
        return;
      }
      this.$emit("click", e);
    };
  }
}
__decorate([attr({
  attribute: "heading-level",
  mode: "fromView",
  converter: nullableNumberConverter
})], FASTAccordionItem.prototype, "headinglevel", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTAccordionItem.prototype, "expanded", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTAccordionItem.prototype, "disabled", void 0);
__decorate([attr], FASTAccordionItem.prototype, "id", void 0);
applyMixins$1(FASTAccordionItem, StartEnd);

/**
 * Expand mode for {@link FASTAccordion}
 * @public
 */
const AccordionExpandMode = {
  /**
   * Designates only a single {@link @microsoft/fast-foundation#(FASTAccordionItem:class) } can be open a time.
   */
  single: "single",
  /**
   * Designates multiple {@link @microsoft/fast-foundation#(FASTAccordionItem:class) | FASTAccordionItemItems} can be open simultaneously.
   */
  multi: "multi"
};

/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @fires change - Fires a custom 'change' event when the active item changes
 * @csspart item - The slot for the accordion items
 * @public
 *
 * @remarks
 * Designed to be used with {@link @microsoft/fast-foundation#accordionTemplate} and {@link @microsoft/fast-foundation#(FASTAccordionItem:class)}.
 */
class FASTAccordion extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * Controls the expand mode of the Accordion, either allowing
     * single or multiple item expansion.
     * @public
     *
     * @remarks
     * HTML attribute: expand-mode
     */
    this.expandmode = AccordionExpandMode.multi;
    this.activeItemIndex = 0;
    this.change = () => {
      this.$emit("change", this.activeid);
    };
    this.setItems = () => {
      if (this.slottedAccordionItems.length === 0) {
        return;
      }
      const children = Array.from(this.children);
      this.removeItemListeners(children);
      children.forEach(child => Observable.getNotifier(child).subscribe(this, "disabled"));
      this.accordionItems = children.filter(child => !child.hasAttribute("disabled"));
      this.accordionIds = this.getItemIds();
      this.accordionItems.forEach((item, index) => {
        if (item instanceof FASTAccordionItem) {
          item.addEventListener("click", this.activeItemChange);
          Observable.getNotifier(item).subscribe(this, "expanded");
        }
        const itemId = this.accordionIds[index];
        item.setAttribute("id", typeof itemId !== "string" ? `accordion-${index + 1}` : itemId);
        this.activeid = this.accordionIds[this.activeItemIndex];
        item.addEventListener("keydown", this.handleItemKeyDown);
        item.addEventListener("focus", this.handleItemFocus);
      });
      if (this.isSingleExpandMode()) {
        const expandedItem = this.findExpandedItem();
        this.setSingleExpandMode(expandedItem);
      }
    };
    this.removeItemListeners = oldValue => {
      oldValue.forEach((item, index) => {
        Observable.getNotifier(item).unsubscribe(this, "disabled");
        Observable.getNotifier(item).unsubscribe(this, "expanded");
        item.removeEventListener("click", this.activeItemChange);
        item.removeEventListener("keydown", this.handleItemKeyDown);
        item.removeEventListener("focus", this.handleItemFocus);
      });
    };
    this.activeItemChange = event => {
      if (event.defaultPrevented || event.target !== event.currentTarget) {
        return;
      }
      event.preventDefault();
      this.handleExpandedChange(event.target);
    };
    this.handleExpandedChange = item => {
      if (item instanceof FASTAccordionItem) {
        this.activeid = item.getAttribute("id");
        if (!this.isSingleExpandMode()) {
          item.expanded = !item.expanded;
          // setSingleExpandMode sets activeItemIndex on its own
          this.activeItemIndex = this.accordionItems.indexOf(item);
        } else {
          this.setSingleExpandMode(item);
        }
        this.change();
      }
    };
    this.handleItemKeyDown = event => {
      // only handle the keydown if the event target is the accordion item
      // prevents arrow keys from moving focus to accordion headers when focus is on accordion item panel content
      if (event.target !== event.currentTarget) {
        return;
      }
      this.accordionIds = this.getItemIds();
      switch (event.key) {
        case keyArrowUp:
          event.preventDefault();
          this.adjust(-1);
          break;
        case keyArrowDown:
          event.preventDefault();
          this.adjust(1);
          break;
        case keyHome:
          this.activeItemIndex = 0;
          this.focusItem();
          break;
        case keyEnd:
          this.activeItemIndex = this.accordionItems.length - 1;
          this.focusItem();
          break;
      }
    };
    this.handleItemFocus = event => {
      // update the active item index if the focus moves to an accordion item via a different method other than the up and down arrow key actions
      // only do so if the focus is actually on the accordion item and not on any of its children
      if (event.target === event.currentTarget) {
        const focusedItem = event.target;
        const focusedIndex = this.activeItemIndex = Array.from(this.accordionItems).indexOf(focusedItem);
        if (this.activeItemIndex !== focusedIndex && focusedIndex !== -1) {
          this.activeItemIndex = focusedIndex;
          this.activeid = this.accordionIds[this.activeItemIndex];
        }
      }
    };
  }
  expandmodeChanged(prev, next) {
    if (!this.$fastController.isConnected) {
      return;
    }
    const expandedItem = this.findExpandedItem();
    if (!expandedItem) {
      return;
    }
    if (next !== AccordionExpandMode.single) {
      expandedItem === null || expandedItem === void 0 ? void 0 : expandedItem.expandbutton.removeAttribute("aria-disabled");
    } else {
      this.setSingleExpandMode(expandedItem);
    }
  }
  /**
   * @internal
   */
  slottedAccordionItemsChanged(oldValue, newValue) {
    if (this.$fastController.isConnected) {
      this.setItems();
    }
  }
  /**
   * @internal
   */
  handleChange(source, propertyName) {
    if (propertyName === "disabled") {
      this.setItems();
    } else if (propertyName === "expanded") {
      // we only need to manage single expanded instances
      // such as scenarios where a child is programatically expanded
      if (source.expanded && this.isSingleExpandMode()) {
        this.setSingleExpandMode(source);
      }
    }
  }
  findExpandedItem() {
    var _a;
    if (this.accordionItems.length === 0) {
      return null;
    }
    return (_a = this.accordionItems.find(item => item instanceof FASTAccordionItem && item.expanded)) !== null && _a !== void 0 ? _a : this.accordionItems[0];
  }
  setSingleExpandMode(expandedItem) {
    if (this.accordionItems.length === 0) {
      return;
    }
    const currentItems = Array.from(this.accordionItems);
    this.activeItemIndex = currentItems.indexOf(expandedItem);
    currentItems.forEach((item, index) => {
      if (this.activeItemIndex === index) {
        item.expanded = true;
        item.expandbutton.setAttribute("aria-disabled", "true");
      } else {
        item.expanded = false;
        if (!item.hasAttribute("disabled")) {
          item.expandbutton.removeAttribute("aria-disabled");
        }
      }
    });
  }
  getItemIds() {
    return this.slottedAccordionItems.map(accordionItem => {
      return accordionItem.id;
    });
  }
  isSingleExpandMode() {
    return this.expandmode === AccordionExpandMode.single;
  }
  adjust(adjustment) {
    this.activeItemIndex = wrapInBounds(0, this.accordionItems.length - 1, this.activeItemIndex + adjustment);
    this.focusItem();
  }
  focusItem() {
    const element = this.accordionItems[this.activeItemIndex];
    if (element instanceof FASTAccordionItem) {
      element.expandbutton.focus();
    }
  }
}
__decorate([attr({
  attribute: "expand-mode"
})], FASTAccordion.prototype, "expandmode", void 0);
__decorate([observable], FASTAccordion.prototype, "slottedAccordionItems", void 0);

/**
 * Creates a template for the {@link @microsoft/fast-foundation#FASTAccordion} component.
 * @public
 */
function accordionTemplate() {
  return html`<template><slot ${slotted({
    property: "slottedAccordionItems",
    filter: elements()
  })}></slot></template>`;
}

class Accordion extends FASTAccordion {}

const template$s = accordionTemplate();

/**
 * Determines the current localization direction of an element.
 *
 * @param rootNode - the HTMLElement to begin the query from, usually "this" when used in a component controller
 * @returns the localization direction of the element
 *
 * @public
 */
const getDirection = rootNode => {
  var _a;
  return ((_a = rootNode.closest("[dir]")) === null || _a === void 0 ? void 0 : _a.dir) === "rtl" ? Direction.rtl : Direction.ltr;
};

/**
 * An abstract behavior to react to media queries. Implementations should implement
 * the `constructListener` method to perform some action based on media query changes.
 *
 * @public
 */
class MatchMediaBehavior {
  /**
   *
   * @param query - The media query to operate from.
   */
  constructor(query) {
    /**
     * The behavior needs to operate on element instances but elements might share a behavior instance.
     * To ensure proper attachment / detachment per instance, we construct a listener for
     * each bind invocation and cache the listeners by element reference.
     */
    this.listenerCache = new WeakMap();
    this.query = query;
  }
  /**
   * Binds the behavior to the element.
   * @param controller - The host controller orchestrating this behavior.
   */
  connectedCallback(controller) {
    const {
      query
    } = this;
    let listener = this.listenerCache.get(controller);
    if (!listener) {
      listener = this.constructListener(controller);
      this.listenerCache.set(controller, listener);
    }
    // Invoke immediately to add if the query currently matches
    listener.bind(query)();
    query.addEventListener("change", listener);
  }
  /**
   * Unbinds the behavior from the element.
   * @param controller - The host controller orchestrating this behavior.
   */
  disconnectedCallback(controller) {
    const listener = this.listenerCache.get(controller);
    if (listener) {
      this.query.removeEventListener("change", listener);
    }
  }
}
/**
 * A behavior to add or remove a stylesheet from an element based on a media query. The behavior ensures that
 * styles are applied while the a query matches the environment and that styles are not applied if the query does
 * not match the environment.
 *
 * @public
 */
class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
  /**
   * Constructs a {@link MatchMediaStyleSheetBehavior} instance.
   * @param query - The media query to operate from.
   * @param styles - The styles to coordinate with the query.
   */
  constructor(query, styles) {
    super(query);
    this.styles = styles;
  }
  /**
   * Defines a function to construct {@link MatchMediaStyleSheetBehavior | MatchMediaStyleSheetBehaviors} for
   * a provided query.
   * @param query - The media query to operate from.
   *
   * @public
   * @example
   *
   * ```ts
   * import { css } from "@microsoft/fast-element";
   * import { MatchMediaStyleSheetBehavior } from "@microsoft/fast-foundation";
   *
   * const landscapeBehavior = MatchMediaStyleSheetBehavior.with(
   *   window.matchMedia("(orientation: landscape)")
   * );
   *
   * const styles = css`
   *   :host {
   *     width: 200px;
   *     height: 400px;
   *   }
   * `
   * .withBehaviors(landscapeBehavior(css`
   *   :host {
   *     width: 400px;
   *     height: 200px;
   *   }
   * `))
   * ```
   */
  static with(query) {
    return styles => {
      return new MatchMediaStyleSheetBehavior(query, styles);
    };
  }
  /**
   * Constructs a match-media listener for a provided element.
   * @param source - the element for which to attach or detach styles.
   */
  constructListener(controller) {
    let attached = false;
    const styles = this.styles;
    return function listener() {
      const {
        matches
      } = this;
      if (matches && !attached) {
        controller.addStyles(styles);
        attached = matches;
      } else if (!matches && attached) {
        controller.removeStyles(styles);
        attached = matches;
      }
    };
  }
  /**
   * Unbinds the behavior from the element.
   * @param controller - The host controller orchestrating this behavior.
   * @internal
   */
  removedCallback(controller) {
    controller.removeStyles(this.styles);
  }
}
/**
 * This can be used to construct a behavior to apply a forced-colors only stylesheet.
 * @public
 */
const forcedColorsStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia("(forced-colors)"));
/**
 * This can be used to construct a behavior to apply a prefers color scheme: dark only stylesheet.
 * @public
 */
MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: dark)"));
/**
 * This can be used to construct a behavior to apply a prefers color scheme: light only stylesheet.
 * @public
 */
MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: light)"));

/**
 * A CSS fragment to set `display: none;` when the host is hidden using the [hidden] attribute.
 * @public
 */
const hidden = `:host([hidden]){display:none}`;
/**
 * Applies a CSS display property.
 * Also adds CSS rules to not display the element when the [hidden] attribute is applied to the element.
 * @param display - The CSS display property value
 * @public
 */
function display(displayValue) {
  return `${hidden}:host{display:${displayValue}}`;
}

/**
 * filters out any whitespace-only nodes, to be used inside a template.
 *
 * @param value - The Node that is being inspected
 * @param index - The index of the node within the array
 * @param array - The Node array that is being filtered
 * @returns true if the node is not a whitespace-only node, false otherwise
 *
 * @public
 */
const whitespaceFilter = value => {
  var _a;
  return value.nodeType !== Node.TEXT_NODE || !!((_a = value.nodeValue) === null || _a === void 0 ? void 0 : _a.trim().length);
};

const styles$r = css`
  ${display("flex")}

  :host{flex-direction:column;width:100%;contain:content}`;

const FluentDesignSystem = Object.freeze({
  prefix: "fluent",
  shadowRootMode: "open",
  registry: customElements
});

const definition$s = Accordion.compose({
  name: `${FluentDesignSystem.prefix}-accordion`,
  template: template$s,
  styles: styles$r
});

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTAccordionItem:class)} component.
 * @public
 */
function accordionItemTemplate(options = {}) {
  return html`<div class="heading" part="heading" role="heading" aria-level="${x => x.headinglevel}"><button class="button" part="button" ${ref("expandbutton")} ?disabled="${x => x.disabled ? "true" : void 0}" aria-expanded="${x => x.expanded}" aria-controls="${x => x.id}-panel" id="${x => x.id}" @click="${(x, c) => x.clickHandler(c.event)}"><span class="heading-content" part="heading-content"><slot name="heading"></slot></span></button>${startSlotTemplate(options)} ${endSlotTemplate(options)}<span class="icon" part="icon" aria-hidden="true"><slot name="expanded-icon">${staticallyCompose(options.expandedIcon)}</slot><slot name="collapsed-icon">${staticallyCompose(options.collapsedIcon)}</slot><span></div><div class="region" part="region" id="${x => x.id}-panel" role="region" aria-labelledby="${x => x.id}"><slot></slot></div>`;
}

var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$k(target, key, result);
  return result;
};
class AccordionItem extends FASTAccordionItem {
  constructor() {
    super(...arguments);
    this.block = false;
  }
}
__decorateClass$k([attr], AccordionItem.prototype, "size", 2);
__decorateClass$k([attr({
  mode: "boolean"
})], AccordionItem.prototype, "block", 2);
__decorateClass$k([attr({
  attribute: "expand-icon-position"
})], AccordionItem.prototype, "expandIconPosition", 2);

const AccordionItemSize = {
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extra-large"
};
const AccordionItemExpandIconPosition = {
  start: "start",
  end: "end"
};

/**
 * Retrieves the "composed parent" element of a node, ignoring DOM tree boundaries.
 * When the parent of a node is a shadow-root, it will return the host
 * element of the shadow root. Otherwise it will return the parent node or null if
 * no parent node exists.
 * @param element - The element for which to retrieve the composed parent
 *
 * @public
 */
function composedParent(element) {
  const parentNode = element.parentElement;
  if (parentNode) {
    return parentNode;
  } else {
    const rootNode = element.getRootNode();
    if (rootNode.host instanceof HTMLElement) {
      // this is shadow-root
      return rootNode.host;
    }
  }
  return null;
}
/**
 * Determines if the reference element contains the test element in a "composed" DOM tree that
 * ignores shadow DOM boundaries.
 *
 * Returns true of the test element is a descendent of the reference, or exists in
 * a shadow DOM that is a logical descendent of the reference. Otherwise returns false.
 * @param reference - The element to test for containment against.
 * @param test - The element being tested for containment.
 *
 * @public
 */
function composedContains(reference, test) {
  let current = test;
  while (current !== null) {
    if (current === reference) {
      return true;
    }
    current = composedParent(current);
  }
  return false;
}
/**
 * Bridges between ViewBehaviors and HostBehaviors, enabling a host to
 * control ViewBehaviors.
 * @public
 */
Object.freeze({
  /**
   * Creates a ViewBehaviorOrchestrator.
   * @param source - The source to to associate behaviors with.
   * @returns A ViewBehaviorOrchestrator.
   */
  create(source) {
    const behaviors = [];
    const targets = {};
    let unbindables = null;
    let isConnected = false;
    return {
      source,
      context: ExecutionContext.default,
      targets,
      get isBound() {
        return isConnected;
      },
      addBehaviorFactory(factory, target) {
        var _a, _b, _c, _d;
        const compiled = factory;
        compiled.id = (_a = compiled.id) !== null && _a !== void 0 ? _a : nextId();
        compiled.targetNodeId = (_b = compiled.targetNodeId) !== null && _b !== void 0 ? _b : nextId();
        compiled.targetTagName = (_c = target.tagName) !== null && _c !== void 0 ? _c : null;
        compiled.policy = (_d = compiled.policy) !== null && _d !== void 0 ? _d : DOM.policy;
        this.addTarget(compiled.targetNodeId, target);
        this.addBehavior(compiled.createBehavior());
      },
      addTarget(nodeId, target) {
        targets[nodeId] = target;
      },
      addBehavior(behavior) {
        behaviors.push(behavior);
        if (isConnected) {
          behavior.bind(this);
        }
      },
      onUnbind(unbindable) {
        if (unbindables === null) {
          unbindables = [];
        }
        unbindables.push(unbindable);
      },
      connectedCallback(controller) {
        if (!isConnected) {
          isConnected = true;
          behaviors.forEach(x => x.bind(this));
        }
      },
      disconnectedCallback(controller) {
        if (isConnected) {
          isConnected = false;
          if (unbindables !== null) {
            unbindables.forEach(x => x.unbind(this));
          }
        }
      }
    };
  }
});

class DerivedValueEvaluator {
  constructor(value) {
    this.value = value;
    this.notifier = Observable.getNotifier(this);
    this.dependencies = new Set();
    this.binding = Observable.binding(value, this);
    this.binding.setMode(false);
  }
  static getOrCreate(value) {
    let v = DerivedValueEvaluator.cache.get(value);
    if (v) {
      return v;
    }
    v = new DerivedValueEvaluator(value);
    DerivedValueEvaluator.cache.set(value, v);
    return v;
  }
  evaluate(node, tokenContext) {
    const resolve = token => {
      this.dependencies.add(token);
      if (tokenContext === token) {
        if (node.parent) {
          return node.parent.getTokenValue(token);
        }
        throw new Error("DesignTokenNode has encountered a circular token reference. Avoid this by setting the token value for an ancestor node.");
      } else {
        return node.getTokenValue(token);
      }
    };
    return this.binding.observe(resolve);
  }
  handleChange() {
    this.notifier.notify(undefined);
  }
}
DerivedValueEvaluator.cache = new WeakMap();
class DerivedValue {
  constructor(token, evaluator, node, subscriber) {
    this.token = token;
    this.evaluator = evaluator;
    this.node = node;
    this.subscriber = subscriber;
    this.value = evaluator.evaluate(node, token);
    if (this.subscriber) {
      Observable.getNotifier(this.evaluator).subscribe(this.subscriber);
    }
  }
  dispose() {
    if (this.subscriber) {
      Observable.getNotifier(this.evaluator).unsubscribe(this.subscriber);
    }
  }
  update() {
    this.value = this.evaluator.evaluate(this.node, this.token);
    return this;
  }
}
/**
 * @internal
 */
class DesignTokenChangeRecordImpl {
  constructor(target, type, token, value) {
    this.target = target;
    this.type = type;
    this.token = token;
    this.value = value;
  }
  notify() {
    Observable.getNotifier(this.token).notify(this);
  }
}
/**
 * @public
 */
class DesignTokenNode {
  constructor() {
    this._parent = null;
    this._children = new Set();
    this._values = new Map();
    this._derived = new Map();
    this.dependencyGraph = new Map();
  }
  /**
   * Determines if a value is a {@link DerivedDesignTokenValue}
   * @param value - The value to test
   */
  static isDerivedTokenValue(value) {
    return typeof value === "function";
  }
  /**
   * Determines if a token has a derived value for a node.
   */
  static isDerivedFor(node, token) {
    return node._derived.has(token);
  }
  /**
   * Collects token/value pairs for all derived token / values set on upstream nodes.
   */
  static collectDerivedContext(node) {
    const collected = new Map();
    // Exit early if  there is no parent
    if (node.parent === null) {
      return collected;
    }
    let ignored = DesignTokenNode.getAssignedTokensForNode(node);
    let current = node.parent;
    do {
      const assigned = DesignTokenNode.getAssignedTokensForNode(current);
      for (let i = 0, l = assigned.length; i < l; i++) {
        const token = assigned[i];
        if (!ignored.includes(token) && DesignTokenNode.isDerivedFor(current, token)) {
          collected.set(token, current._derived.get(token));
        }
      }
      ignored = Array.from(new Set(ignored.concat(assigned)));
      current = current.parent;
    } while (current !== null);
    return collected;
  }
  /**
   * Resolves the local value for a token if it is assigned, otherwise returns undefined.
   */
  static getLocalTokenValue(node, token) {
    return !DesignTokenNode.isAssigned(node, token) ? undefined : DesignTokenNode.isDerivedFor(node, token) ? node._derived.get(token).value : node._values.get(token);
  }
  static getOrCreateDependencyGraph(node, token) {
    let dependents = node.dependencyGraph.get(token);
    if (dependents) {
      return dependents;
    }
    dependents = new Set();
    node.dependencyGraph.set(token, dependents);
    return dependents;
  }
  /**
   * Emit all queued notifications
   */
  static notify() {
    const notifications = this._notifications;
    this._notifications = [];
    for (const record of notifications) {
      record.notify();
    }
  }
  static queueNotification(...records) {
    this._notifications.push(...records);
  }
  /**
   * Retrieves all tokens assigned directly to a node.
   * @param node - the node to retrieve assigned tokens for
   * @returns
   */
  static getAssignedTokensForNode(node) {
    return Array.from(node._values.keys());
  }
  /**
   * Retrieves all tokens assigned to the node and ancestor nodes.
   * @param node - the node to compose assigned tokens for
   */
  static composeAssignedTokensForNode(node) {
    const tokens = new Set(DesignTokenNode.getAssignedTokensForNode(node));
    let current = node.parent;
    while (current !== null) {
      const assignedTokens = DesignTokenNode.getAssignedTokensForNode(current);
      for (const token of assignedTokens) {
        tokens.add(token);
      }
      current = current.parent;
    }
    return Array.from(tokens);
  }
  /**
   * Tests if a token is assigned directly to a node
   * @param node - The node to test
   * @param token  - The token to test
   * @returns
   */
  static isAssigned(node, token) {
    return node._values.has(token);
  }
  /**
   * The parent node
   */
  get parent() {
    return this._parent;
  }
  get children() {
    return Array.from(this._children);
  }
  /**
   * Appends a child to the node, notifying for any tokens set for the node's context.
   */
  appendChild(child) {
    var _a, _b;
    let prevContext = null;
    // If this node is already attached, get it's context so change record
    // types can be determined
    if (child.parent !== null) {
      prevContext = DesignTokenNode.composeAssignedTokensForNode(child.parent);
      child.parent._children.delete(child);
    }
    const context = DesignTokenNode.composeAssignedTokensForNode(this);
    const derivedContext = DesignTokenNode.collectDerivedContext(this);
    child._parent = this;
    this._children.add(child);
    for (const token of context) {
      let type = 0 /* DesignTokenMutationType.add */;
      if (prevContext !== null) {
        const prevContextIndex = prevContext.indexOf(token);
        if (prevContextIndex !== -1) {
          type = 1 /* DesignTokenMutationType.change */;
          prevContext.splice(prevContextIndex, 1);
        }
      }
      child.dispatch(new DesignTokenChangeRecordImpl(this, type, token, (_a = derivedContext.get(token)) === null || _a === void 0 ? void 0 : _a.evaluator.value));
    }
    if (prevContext !== null && prevContext.length > 0) {
      for (const token of prevContext) {
        child.dispatch(new DesignTokenChangeRecordImpl(this, 2 /* DesignTokenMutationType.delete */, token, (_b = derivedContext.get(token)) === null || _b === void 0 ? void 0 : _b.evaluator.value));
      }
    }
    DesignTokenNode.notify();
  }
  /**
   * Appends a child to the node, notifying for any tokens set for the node's context.
   */
  removeChild(child) {
    if (child.parent === this) {
      const context = DesignTokenNode.composeAssignedTokensForNode(this);
      child._parent = null;
      this._children.delete(child);
      for (const token of context) {
        child.dispatch(new DesignTokenChangeRecordImpl(this, 2 /* DesignTokenMutationType.delete */, token));
      }
      DesignTokenNode.notify();
    }
  }
  /**
   * Dispose of the node, removing parent/child relationships and
   * unsubscribing all observable binding subscribers. Does not emit
   * notifications.
   */
  dispose() {
    if (this.parent) {
      this.parent._children.delete(this);
      this._parent = null;
    }
    for (const [, derived] of this._derived) {
      derived.dispose();
    }
  }
  /**
   * Sets a token to a value
   */
  setTokenValue(token, value) {
    const changeType = DesignTokenNode.isAssigned(this, token) || DesignTokenNode.isDerivedFor(this, token) ? 1 /* DesignTokenMutationType.change */ : 0 /* DesignTokenMutationType.add */;
    const prev = DesignTokenNode.getLocalTokenValue(this, token);
    this._values.set(token, value);
    if (DesignTokenNode.isDerivedFor(this, token)) {
      this.tearDownDerivedTokenValue(token);
    }
    const isDerived = DesignTokenNode.isDerivedTokenValue(value);
    const derivedContext = DesignTokenNode.collectDerivedContext(this);
    let result;
    if (isDerived) {
      const evaluator = this.setupDerivedTokenValue(token, value, true);
      result = evaluator.value;
    } else {
      result = value;
    }
    if (prev !== result) {
      DesignTokenNode.queueNotification(new DesignTokenChangeRecordImpl(this, changeType, token, value));
    }
    this.dispatch(new DesignTokenChangeRecordImpl(this, changeType, token, value));
    derivedContext.forEach((derivedValue, token) => {
      // Skip over any derived values already established locally, because
      // those will get updated via this.notifyDerived and this.notifyStatic
      if (!DesignTokenNode.isDerivedFor(this, token)) {
        const prev = DesignTokenNode.getLocalTokenValue(this, token);
        derivedValue = this.setupDerivedTokenValue(token, derivedValue.evaluator.value);
        const result = derivedValue.value;
        if (prev !== result) {
          DesignTokenNode.queueNotification(new DesignTokenChangeRecordImpl(this, 1 /* DesignTokenMutationType.change */, token, derivedValue.evaluator.value));
        }
        this.dispatch(new DesignTokenChangeRecordImpl(this, 0 /* DesignTokenMutationType.add */, token, derivedValue.evaluator.value));
      }
    });
    DesignTokenNode.notify();
  }
  /**
   * Returns the resolve value for a token
   */
  getTokenValue(token) {
    /* eslint-disable-next-line */
    let node = this;
    let value;
    while (node !== null) {
      if (DesignTokenNode.isDerivedFor(node, token)) {
        value = node._derived.get(token).value;
        break;
      }
      if (DesignTokenNode.isAssigned(node, token)) {
        value = node._values.get(token);
        break;
      }
      node = node._parent;
    }
    if (value !== undefined) {
      return value;
    } else {
      throw new Error(`No value set for token ${token} in node tree.`);
    }
  }
  /**
   * Deletes the token value for a node
   */
  deleteTokenValue(token) {
    if (DesignTokenNode.isAssigned(this, token)) {
      const prev = DesignTokenNode.getLocalTokenValue(this, token);
      this._values.delete(token);
      this.tearDownDerivedTokenValue(token);
      let newValue;
      try {
        newValue = this.getTokenValue(token);
      } catch (e) {
        newValue = undefined;
      }
      DesignTokenNode.queueNotification(new DesignTokenChangeRecordImpl(this, 2 /* DesignTokenMutationType.delete */, token));
      if (prev !== newValue) {
        this.dispatch(new DesignTokenChangeRecordImpl(this, 2 /* DesignTokenMutationType.delete */, token));
      }
      DesignTokenNode.notify();
    }
  }
  /**
   * Notifies that a token has been mutated
   */
  dispatch(record) {
    var _a, _b, _c;
    if (this !== record.target) {
      const {
        token
      } = record;
      // If the node is assigned the token being dispatched and the assigned value does not depend on the token
      // (circular token reference) then terminate the dispatch.
      const isAssigned = DesignTokenNode.isAssigned(this, token);
      const containsCircularForToken = isAssigned && ((_a = this._derived.get(token)) === null || _a === void 0 ? void 0 : _a.evaluator.dependencies.has(token));
      if (isAssigned && !containsCircularForToken) {
        return;
      }
      // Delete token evaluations if the token is not assigned explicitly but is derived for the node and
      // the record is a delete type.
      if (record.type === 2 /* DesignTokenMutationType.delete */ && !isAssigned && DesignTokenNode.isDerivedFor(this, token)) {
        this.tearDownDerivedTokenValue(token);
        DesignTokenNode.queueNotification(new DesignTokenChangeRecordImpl(this, 2 /* DesignTokenMutationType.delete */, token));
      }
      if (containsCircularForToken) {
        record = new DesignTokenChangeRecordImpl(this, 1 /* DesignTokenMutationType.change */, token, (_b = this._derived.get(token)) === null || _b === void 0 ? void 0 : _b.evaluator.value);
      }
      const {
        value
      } = record;
      if (value && DesignTokenNode.isDerivedTokenValue(value)) {
        const dependencies = DerivedValueEvaluator.getOrCreate(value).dependencies;
        // If this is not the originator, check to see if this node
        // has any dependencies of the token value. If so, we need to evaluate for this node
        let evaluate = false;
        for (const dependency of dependencies) {
          if (DesignTokenNode.isAssigned(this, dependency)) {
            evaluate = true;
            break;
          }
        }
        if (evaluate) {
          const prev = (_c = this._derived.get(token)) === null || _c === void 0 ? void 0 : _c.value;
          const derivedValue = this.setupDerivedTokenValue(token, value);
          if (prev !== derivedValue.value) {
            const type = prev === undefined ? 0 /* DesignTokenMutationType.add */ : 1 /* DesignTokenMutationType.change */;
            const notification = new DesignTokenChangeRecordImpl(this, type, token, derivedValue.evaluator.value);
            DesignTokenNode.queueNotification(notification);
            record = notification;
          }
        }
      }
    }
    this.collectLocalChangeRecords(record).forEach(_record => {
      DesignTokenNode.queueNotification(_record);
      this.dispatch(_record);
    });
    this.notifyChildren(record);
  }
  /**
   * Generate change-records for local dependencies of a change record
   */
  collectLocalChangeRecords(record) {
    const collected = new Map();
    for (const dependent of DesignTokenNode.getOrCreateDependencyGraph(this, record.token)) {
      if (dependent.value !== dependent.update().value) {
        collected.set(dependent.token, new DesignTokenChangeRecordImpl(this, 1 /* DesignTokenMutationType.change */, dependent.token, dependent.evaluator.value));
      }
    }
    return collected;
  }
  /**
   *
   * Notify children of changes to the node
   */
  notifyChildren(...records) {
    if (this.children.length) {
      for (let i = 0, l = this.children.length; i < l; i++) {
        for (let j = 0; j < records.length; j++) {
          this.children[i].dispatch(records[j]);
        }
      }
    }
  }
  tearDownDerivedTokenValue(token) {
    if (DesignTokenNode.isDerivedFor(this, token)) {
      const value = this._derived.get(token);
      value.dispose();
      this._derived.delete(token);
      value.evaluator.dependencies.forEach(dependency => {
        DesignTokenNode.getOrCreateDependencyGraph(this, dependency).delete(value);
      });
    }
  }
  setupDerivedTokenValue(token, value, subscribeNode = false) {
    const deriver = new DerivedValue(token, DerivedValueEvaluator.getOrCreate(value), this, subscribeNode ? {
      handleChange: () => {
        if (deriver.value !== deriver.update().value) {
          const record = new DesignTokenChangeRecordImpl(this, 1 /* DesignTokenMutationType.change */, deriver.token, deriver.evaluator.value);
          DesignTokenNode.queueNotification(record);
          this.dispatch(record);
          DesignTokenNode.notify();
        }
      }
    } : undefined);
    this._derived.set(token, deriver);
    deriver.evaluator.dependencies.forEach(dependency => {
      if (dependency !== token) {
        DesignTokenNode.getOrCreateDependencyGraph(this, dependency).add(deriver);
      }
    });
    return deriver;
  }
}
DesignTokenNode._notifications = [];

class QueuedStyleSheetTarget {
  setProperty(name, value) {
    Updates.enqueue(() => this.target.setProperty(name, value));
  }
  removeProperty(name) {
    Updates.enqueue(() => this.target.removeProperty(name));
  }
}
/**
 * Handles setting properties for a FASTElement using Constructable Stylesheets
 */
class ConstructableStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor(source) {
    super();
    const sheet = new CSSStyleSheet();
    this.target = sheet.cssRules[sheet.insertRule(":host{}")].style;
    source.$fastController.addStyles(new ElementStyles([sheet]));
  }
}
class DocumentStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    this.target = sheet.cssRules[sheet.insertRule(":root{}")].style;
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
}
class HeadStyleElementStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor() {
    super();
    this.style = document.createElement("style");
    document.head.appendChild(this.style);
    const {
      sheet
    } = this.style;
    // Because the HTMLStyleElement has been appended,
    // there shouldn't exist a case where `sheet` is null,
    // but if-check it just in case.
    if (sheet) {
      // https://github.com/jsdom/jsdom uses https://github.com/NV/CSSOM for it's CSSOM implementation,
      // which implements the DOM Level 2 spec for CSSStyleSheet where insertRule() requires an index argument.
      const index = sheet.insertRule(":root{}", sheet.cssRules.length);
      this.target = sheet.cssRules[index].style;
    }
  }
}
/**
 * Handles setting properties for a FASTElement using an HTMLStyleElement
 */
class StyleElementStyleSheetTarget {
  constructor(target) {
    this.store = new Map();
    this.target = null;
    const controller = target.$fastController;
    this.style = document.createElement("style");
    controller.addStyles(this.style);
    Observable.getNotifier(controller).subscribe(this, "isConnected");
    this.handleChange(controller, "isConnected");
  }
  targetChanged() {
    if (this.target !== null) {
      for (const [key, value] of this.store.entries()) {
        this.target.setProperty(key, value);
      }
    }
  }
  setProperty(name, value) {
    this.store.set(name, value);
    Updates.enqueue(() => {
      if (this.target !== null) {
        this.target.setProperty(name, value);
      }
    });
  }
  removeProperty(name) {
    this.store.delete(name);
    Updates.enqueue(() => {
      if (this.target !== null) {
        this.target.removeProperty(name);
      }
    });
  }
  handleChange(source, key) {
    // HTMLStyleElement.sheet is null if the element isn't connected to the DOM,
    // so this method reacts to changes in DOM connection for the element hosting
    // the HTMLStyleElement.
    //
    // All rules applied via the CSSOM also get cleared when the element disconnects,
    // so we need to add a new rule each time and populate it with the stored properties
    const {
      sheet
    } = this.style;
    if (sheet) {
      // Safari will throw if we try to use the return result of insertRule()
      // to index the rule inline, so store as a const prior to indexing.
      // https://github.com/jsdom/jsdom uses https://github.com/NV/CSSOM for it's CSSOM implementation,
      // which implements the DOM Level 2 spec for CSSStyleSheet where insertRule() requires an index argument.
      const index = sheet.insertRule(":host{}", sheet.cssRules.length);
      this.target = sheet.cssRules[index].style;
    } else {
      this.target = null;
    }
  }
}
__decorate([observable], StyleElementStyleSheetTarget.prototype, "target", void 0);
/**
 * Controls emission for default values. This control is capable
 * of emitting to multiple {@link PropertyTarget | PropertyTargets},
 * and only emits if it has at least one root.
 *
 * @internal
 */
class RootStyleSheetTarget {
  setProperty(name, value) {
    RootStyleSheetTarget.properties[name] = value;
    for (const target of RootStyleSheetTarget.roots.values()) {
      target.setProperty(name, value);
    }
  }
  removeProperty(name) {
    delete RootStyleSheetTarget.properties[name];
    for (const target of RootStyleSheetTarget.roots.values()) {
      target.removeProperty(name);
    }
  }
  static registerRoot(root) {
    const {
      roots
    } = RootStyleSheetTarget;
    if (!roots.has(root)) {
      roots.add(root);
      for (const key in RootStyleSheetTarget.properties) {
        root.setProperty(key, RootStyleSheetTarget.properties[key]);
      }
    }
  }
  static unregisterRoot(root) {
    const {
      roots
    } = RootStyleSheetTarget;
    if (roots.has(root)) {
      roots.delete(root);
      for (const key in RootStyleSheetTarget.properties) {
        root.removeProperty(key);
      }
    }
  }
}
RootStyleSheetTarget.roots = new Set();
RootStyleSheetTarget.properties = {};
// Caches PropertyTarget instances
const propertyTargetCache = new WeakMap();
// Use Constructable StyleSheets for FAST elements when supported, otherwise use
// HTMLStyleElement instances
const propertyTargetCtor = ElementStyles.supportsAdoptedStyleSheets ? ConstructableStyleSheetTarget : StyleElementStyleSheetTarget;
/**
 * Manages creation and caching of PropertyTarget instances.
 *
 * @internal
 */
const PropertyTargetManager = Object.freeze({
  getOrCreate(source) {
    if (propertyTargetCache.has(source)) {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      return propertyTargetCache.get(source);
    }
    let target;
    if (source instanceof Document) {
      target = ElementStyles.supportsAdoptedStyleSheets ? new DocumentStyleSheetTarget() : new HeadStyleElementStyleSheetTarget();
    } else {
      target = new propertyTargetCtor(source);
    }
    propertyTargetCache.set(source, target);
    return target;
  }
});

/**
 * @public
 */
class DesignToken {
  constructor(configuration) {
    this.subscriberNotifier = {
      handleChange: (source, change) => {
        const record = {
          target: change.target === FASTDesignTokenNode.defaultNode ? "default" : change.target.target,
          token: this
        };
        this.subscribers.notify(record);
      }
    };
    this.name = configuration.name;
    Observable.getNotifier(this).subscribe(this.subscriberNotifier);
  }
  /**
   * The default value of the token (alias of {@link DesignToken.default})
   */
  get $value() {
    return this.default;
  }
  /**
   * The default value of the token, or undefined if it has not been set.
   */
  get default() {
    return FASTDesignTokenNode.defaultNode.getTokenValue(this);
  }
  get subscribers() {
    if (this._subscribers) {
      return this._subscribers;
    }
    this._subscribers = new SubscriberSet(this);
    return this._subscribers;
  }
  static isCSSDesignTokenConfiguration(config) {
    return typeof config.cssCustomPropertyName === "string";
  }
  static create(config) {
    if (typeof config === "string") {
      return new CSSDesignToken({
        name: config,
        cssCustomPropertyName: config
      });
    } else {
      return DesignToken.isCSSDesignTokenConfiguration(config) ? new CSSDesignToken(config) : new DesignToken(config);
    }
  }
  /**
   * Configures the strategy for resolving hierarchical relationships between FASTElement targets.
   */
  static withStrategy(strategy) {
    FASTDesignTokenNode.withStrategy(strategy);
  }
  /**
   * Registers a target for emitting default style values.
   * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
   * {@link DesignToken.withDefault} will emit CSS custom properties to all
   * registered targets.
   * @param target - The target to register, defaults to the document
   */
  static registerDefaultStyleTarget(target = document) {
    if (target instanceof FASTElement || target instanceof Document) {
      target = PropertyTargetManager.getOrCreate(target);
    }
    RootStyleSheetTarget.registerRoot(target);
  }
  /**
   * Unregister a target for default style emission.
   * @param target - The root to deregister, defaults to the document
   */
  static unregisterDefaultStyleTarget(target = document) {
    if (target instanceof FASTElement || target instanceof Document) {
      target = PropertyTargetManager.getOrCreate(target);
    }
    RootStyleSheetTarget.unregisterRoot(target);
  }
  /**
   * Retrieves the value of the token for a target element.
   */
  getValueFor(target) {
    return FASTDesignTokenNode.getOrCreate(target).getTokenValue(this);
  }
  /**
   * Sets the value of the token for a target element.
   */
  setValueFor(target, value) {
    FASTDesignTokenNode.getOrCreate(target).setTokenValue(this, this.normalizeValue(value));
  }
  /**
   * Deletes the value of the token for a target element.
   */
  deleteValueFor(target) {
    FASTDesignTokenNode.getOrCreate(target).deleteTokenValue(this);
    return this;
  }
  /**
   * Sets the default value of the token.
   */
  withDefault(value) {
    FASTDesignTokenNode.defaultNode.setTokenValue(this, this.normalizeValue(value));
    return this;
  }
  /**
   * Subscribes a subscriber to notifications for the token.
   */
  subscribe(subscriber) {
    this.subscribers.subscribe(subscriber);
  }
  /**
   * Unsubscribes a subscriber to notifications for the token.
   */
  unsubscribe(subscriber) {
    this.subscribers.unsubscribe(subscriber);
  }
  /**
   * Alias the token to the provided token.
   * @param token - the token to alias to
   */
  alias(token) {
    return resolve => resolve(token);
  }
  normalizeValue(value) {
    if (value instanceof DesignToken) {
      value = this.alias(value);
    }
    return value;
  }
}
/**
 * @public
 */
let CSSDesignToken = class CSSDesignToken extends DesignToken {
  constructor(configuration) {
    super(configuration);
    this.cssReflector = {
      handleChange: (source, record) => {
        const target = record.target === FASTDesignTokenNode.defaultNode ? FASTDesignTokenNode.rootStyleSheetTarget : record.target instanceof FASTDesignTokenNode ? PropertyTargetManager.getOrCreate(record.target.target) : null;
        if (target) {
          if (record.type === 2 /* DesignTokenMutationType.delete */) {
            target.removeProperty(this.cssCustomProperty);
          } else {
            target.setProperty(this.cssCustomProperty, this.resolveCSSValue(record.target.getTokenValue(this)));
          }
        }
      }
    };
    this.cssCustomProperty = `--${configuration.cssCustomPropertyName}`;
    this.cssVar = `var(${this.cssCustomProperty})`;
    Observable.getNotifier(this).subscribe(this.cssReflector);
  }
  /**
   * The DesignToken represented as a string that can be used in CSS.
   */
  createCSS() {
    return this.cssVar;
  }
  /**
   * Creates HTML to be used within a template.
   */
  createHTML() {
    return this.cssVar;
  }
  resolveCSSValue(value) {
    return value && typeof value.createCSS === "function" ? value.createCSS() : value;
  }
};
CSSDesignToken = __decorate([cssDirective(), htmlDirective()], CSSDesignToken);
const defaultDesignTokenResolutionStrategy = {
  contains: composedContains,
  parent(element) {
    let parent = composedParent(element);
    while (parent !== null) {
      if (parent instanceof FASTElement) {
        return parent;
      }
      parent = composedParent(parent);
    }
    return null;
  }
};
class FASTDesignTokenNode extends DesignTokenNode {
  constructor(target) {
    super();
    this.target = target;
    // By default, nodes are not attached to the defaultNode for performance
    // reasons. However, that behavior can throw if retrieval for a node
    // happens before the bind() method is called. To guard against that,
    //  lazily attach to the defaultNode when get/set/delete methods are called.
    this.setTokenValue = this.lazyAttachToDefault(super.setTokenValue);
    this.getTokenValue = this.lazyAttachToDefault(super.getTokenValue);
    this.deleteTokenValue = this.lazyAttachToDefault(super.deleteTokenValue);
  }
  static get strategy() {
    if (this._strategy === undefined) {
      FASTDesignTokenNode.withStrategy(defaultDesignTokenResolutionStrategy);
    }
    return this._strategy;
  }
  connectedCallback(controller) {
    let parent = FASTDesignTokenNode.findParent(controller.source);
    if (parent === null) {
      parent = FASTDesignTokenNode.defaultNode;
    }
    if (parent !== this.parent) {
      const reparent = [];
      for (const child of parent.children) {
        if (child instanceof FASTDesignTokenNode && FASTDesignTokenNode.strategy.contains(controller.source, child.target)) {
          reparent.push(child);
        }
      }
      parent.appendChild(this);
      for (const child of reparent) {
        this.appendChild(child);
      }
    }
  }
  disconnectedCallback(controller) {
    FASTDesignTokenNode.cache.delete(this.target);
    this.dispose();
  }
  static getOrCreate(target) {
    let found = FASTDesignTokenNode.cache.get(target);
    if (found) {
      return found;
    }
    found = new FASTDesignTokenNode(target);
    FASTDesignTokenNode.cache.set(target, found);
    target.$fastController.addBehavior(FASTDesignTokenNode.strategy);
    target.$fastController.addBehavior(found);
    return found;
  }
  static withStrategy(strategy) {
    this._strategy = strategy;
  }
  static findParent(target) {
    let current = FASTDesignTokenNode.strategy.parent(target);
    while (current !== null) {
      const node = FASTDesignTokenNode.cache.get(current);
      if (node) {
        return node;
      }
      current = FASTDesignTokenNode.strategy.parent(current);
    }
    return null;
  }
  /**
   * Creates a function from a function that lazily attaches the node to the default node.
   */
  lazyAttachToDefault(fn) {
    const cb = (...args) => {
      if (this.parent === null) {
        FASTDesignTokenNode.defaultNode.appendChild(this);
      }
      return fn.apply(this, args);
    };
    return cb;
  }
}
FASTDesignTokenNode.defaultNode = new DesignTokenNode();
FASTDesignTokenNode.rootStyleSheetTarget = new RootStyleSheetTarget();
FASTDesignTokenNode.cache = new WeakMap();

const {
  create
} = DesignToken;
const borderRadiusNone = create("borderRadiusNone");
const borderRadiusSmall = create("borderRadiusSmall");
const borderRadiusMedium = create("borderRadiusMedium");
const borderRadiusLarge = create("borderRadiusLarge");
const borderRadiusXLarge = create("borderRadiusXLarge");
const borderRadiusCircular = create("borderRadiusCircular");
const fontSizeBase100 = create("fontSizeBase100");
const fontSizeBase200 = create("fontSizeBase200");
const fontSizeBase300 = create("fontSizeBase300");
const fontSizeBase400 = create("fontSizeBase400");
const fontSizeBase500 = create("fontSizeBase500");
const fontSizeBase600 = create("fontSizeBase600");
const fontSizeHero700 = create("fontSizeHero700");
const fontSizeHero800 = create("fontSizeHero800");
const fontSizeHero900 = create("fontSizeHero900");
const fontSizeHero1000 = create("fontSizeHero1000");
const lineHeightBase100 = create("lineHeightBase100");
const lineHeightBase200 = create("lineHeightBase200");
const lineHeightBase300 = create("lineHeightBase300");
const lineHeightBase400 = create("lineHeightBase400");
const lineHeightBase500 = create("lineHeightBase500");
const lineHeightBase600 = create("lineHeightBase600");
const lineHeightHero700 = create("lineHeightHero700");
const lineHeightHero800 = create("lineHeightHero800");
const lineHeightHero900 = create("lineHeightHero900");
const lineHeightHero1000 = create("lineHeightHero1000");
const fontFamilyBase = create("fontFamilyBase");
const fontFamilyMonospace = create("fontFamilyMonospace");
const fontFamilyNumeric = create("fontFamilyNumeric");
const fontWeightRegular = create("fontWeightRegular");
const fontWeightMedium = create("fontWeightMedium");
const fontWeightSemibold = create("fontWeightSemibold");
const fontWeightBold = create("fontWeightBold");
const strokeWidthThin = create("strokeWidthThin");
const strokeWidthThick = create("strokeWidthThick");
const strokeWidthThicker = create("strokeWidthThicker");
const strokeWidthThickest = create("strokeWidthThickest");
const spacingHorizontalNone = create("spacingHorizontalNone");
const spacingHorizontalXXS = create("spacingHorizontalXXS");
const spacingHorizontalXS = create("spacingHorizontalXS");
const spacingHorizontalSNudge = create("spacingHorizontalSNudge");
const spacingHorizontalS = create("spacingHorizontalS");
const spacingHorizontalMNudge = create("spacingHorizontalMNudge");
const spacingHorizontalM = create("spacingHorizontalM");
const spacingHorizontalL = create("spacingHorizontalL");
const spacingHorizontalXL = create("spacingHorizontalXL");
const spacingHorizontalXXL = create("spacingHorizontalXXL");
const spacingHorizontalXXXL = create("spacingHorizontalXXXL");
const spacingVerticalNone = create("spacingVerticalNone");
const spacingVerticalXXS = create("spacingVerticalXXS");
const spacingVerticalXS = create("spacingVerticalXS");
const spacingVerticalSNudge = create("spacingVerticalSNudge");
const spacingVerticalS = create("spacingVerticalS");
const spacingVerticalMNudge = create("spacingVerticalMNudge");
const spacingVerticalM = create("spacingVerticalM");
const spacingVerticalL = create("spacingVerticalL");
const spacingVerticalXL = create("spacingVerticalXL");
const spacingVerticalXXL = create("spacingVerticalXXL");
const spacingVerticalXXXL = create("spacingVerticalXXXL");
const durationUltraFast = create("durationUltraFast");
const durationFaster = create("durationFaster");
const durationFast = create("durationFast");
const durationNormal = create("durationNormal");
const durationSlow = create("durationSlow");
const durationSlower = create("durationSlower");
const durationUltraSlow = create("durationUltraSlow");
const curveAccelerateMax = create("curveAccelerateMax");
const curveAccelerateMid = create("curveAccelerateMid");
const curveAccelerateMin = create("curveAccelerateMin");
const curveDecelerateMax = create("curveDecelerateMax");
const curveDecelerateMid = create("curveDecelerateMid");
const curveDecelerateMin = create("curveDecelerateMin");
const curveEasyEaseMax = create("curveEasyEaseMax");
const curveEasyEase = create("curveEasyEase");
const curveLinear = create("curveLinear");
const colorNeutralForeground1 = create("colorNeutralForeground1");
const colorNeutralForeground1Hover = create("colorNeutralForeground1Hover");
const colorNeutralForeground1Pressed = create("colorNeutralForeground1Pressed");
const colorNeutralForeground1Selected = create("colorNeutralForeground1Selected");
const colorNeutralForeground2 = create("colorNeutralForeground2");
const colorNeutralForeground2Hover = create("colorNeutralForeground2Hover");
const colorNeutralForeground2Pressed = create("colorNeutralForeground2Pressed");
const colorNeutralForeground2Selected = create("colorNeutralForeground2Selected");
const colorNeutralForeground2BrandHover = create("colorNeutralForeground2BrandHover");
const colorNeutralForeground2BrandPressed = create("colorNeutralForeground2BrandPressed");
const colorNeutralForeground2BrandSelected = create("colorNeutralForeground2BrandSelected");
const colorNeutralForeground3 = create("colorNeutralForeground3");
const colorNeutralForeground3Hover = create("colorNeutralForeground3Hover");
const colorNeutralForeground3Pressed = create("colorNeutralForeground3Pressed");
const colorNeutralForeground3Selected = create("colorNeutralForeground3Selected");
const colorNeutralForeground3BrandHover = create("colorNeutralForeground3BrandHover");
const colorNeutralForeground3BrandPressed = create("colorNeutralForeground3BrandPressed");
const colorNeutralForeground3BrandSelected = create("colorNeutralForeground3BrandSelected");
const colorNeutralForeground4 = create("colorNeutralForeground4");
const colorNeutralForegroundDisabled = create("colorNeutralForegroundDisabled");
const colorNeutralForegroundInvertedDisabled = create("colorNeutralForegroundInvertedDisabled");
const colorBrandForegroundLink = create("colorBrandForegroundLink");
const colorBrandForegroundLinkHover = create("colorBrandForegroundLinkHover");
const colorBrandForegroundLinkPressed = create("colorBrandForegroundLinkPressed");
const colorBrandForegroundLinkSelected = create("colorBrandForegroundLinkSelected");
const colorNeutralForeground2Link = create("colorNeutralForeground2Link");
const colorNeutralForeground2LinkHover = create("colorNeutralForeground2LinkHover");
const colorNeutralForeground2LinkPressed = create("colorNeutralForeground2LinkPressed");
const colorNeutralForeground2LinkSelected = create("colorNeutralForeground2LinkSelected");
const colorCompoundBrandForeground1 = create("colorCompoundBrandForeground1");
const colorCompoundBrandForeground1Hover = create("colorCompoundBrandForeground1Hover");
const colorCompoundBrandForeground1Pressed = create("colorCompoundBrandForeground1Pressed");
const colorBrandForeground1 = create("colorBrandForeground1");
const colorBrandForeground2 = create("colorBrandForeground2");
const colorNeutralForeground1Static = create("colorNeutralForeground1Static");
const colorNeutralForegroundStaticInverted = create("colorNeutralForegroundStaticInverted");
const colorNeutralForegroundInverted = create("colorNeutralForegroundInverted");
const colorNeutralForegroundInvertedHover = create("colorNeutralForegroundInvertedHover");
const colorNeutralForegroundInvertedPressed = create("colorNeutralForegroundInvertedPressed");
const colorNeutralForegroundInvertedSelected = create("colorNeutralForegroundInvertedSelected");
const colorNeutralForegroundInverted2 = create("colorNeutralForegroundInverted2");
const colorNeutralForegroundOnBrand = create("colorNeutralForegroundOnBrand");
const colorNeutralForegroundInvertedLink = create("colorNeutralForegroundInvertedLink");
const colorNeutralForegroundInvertedLinkHover = create("colorNeutralForegroundInvertedLinkHover");
const colorNeutralForegroundInvertedLinkPressed = create("colorNeutralForegroundInvertedLinkPressed");
const colorNeutralForegroundInvertedLinkSelected = create("colorNeutralForegroundInvertedLinkSelected");
const colorBrandForegroundInverted = create("colorBrandForegroundInverted");
const colorBrandForegroundInvertedHover = create("colorBrandForegroundInvertedHover");
const colorBrandForegroundInvertedPressed = create("colorBrandForegroundInvertedPressed");
const colorBrandForegroundOnLight = create("colorBrandForegroundOnLight");
const colorBrandForegroundOnLightHover = create("colorBrandForegroundOnLightHover");
const colorBrandForegroundOnLightPressed = create("colorBrandForegroundOnLightPressed");
const colorBrandForegroundOnLightSelected = create("colorBrandForegroundOnLightSelected");
const colorNeutralBackground1 = create("colorNeutralBackground1");
const colorNeutralBackground1Hover = create("colorNeutralBackground1Hover");
const colorNeutralBackground1Pressed = create("colorNeutralBackground1Pressed");
const colorNeutralBackground1Selected = create("colorNeutralBackground1Selected");
const colorNeutralBackground2 = create("colorNeutralBackground2");
const colorNeutralBackground2Hover = create("colorNeutralBackground2Hover");
const colorNeutralBackground2Pressed = create("colorNeutralBackground2Pressed");
const colorNeutralBackground2Selected = create("colorNeutralBackground2Selected");
const colorNeutralBackground3 = create("colorNeutralBackground3");
const colorNeutralBackground3Hover = create("colorNeutralBackground3Hover");
const colorNeutralBackground3Pressed = create("colorNeutralBackground3Pressed");
const colorNeutralBackground3Selected = create("colorNeutralBackground3Selected");
const colorNeutralBackground4 = create("colorNeutralBackground4");
const colorNeutralBackground4Hover = create("colorNeutralBackground4Hover");
const colorNeutralBackground4Pressed = create("colorNeutralBackground4Pressed");
const colorNeutralBackground4Selected = create("colorNeutralBackground4Selected");
const colorNeutralBackground5 = create("colorNeutralBackground5");
const colorNeutralBackground5Hover = create("colorNeutralBackground5Hover");
const colorNeutralBackground5Pressed = create("colorNeutralBackground5Pressed");
const colorNeutralBackground5Selected = create("colorNeutralBackground5Selected");
const colorNeutralBackground6 = create("colorNeutralBackground6");
const colorNeutralBackgroundInverted = create("colorNeutralBackgroundInverted");
const colorNeutralBackgroundStatic = create("colorNeutralBackgroundStatic");
const colorSubtleBackground = create("colorSubtleBackground");
const colorSubtleBackgroundHover = create("colorSubtleBackgroundHover");
const colorSubtleBackgroundPressed = create("colorSubtleBackgroundPressed");
const colorSubtleBackgroundSelected = create("colorSubtleBackgroundSelected");
const colorSubtleBackgroundLightAlphaHover = create("colorSubtleBackgroundLightAlphaHover");
const colorSubtleBackgroundLightAlphaPressed = create("colorSubtleBackgroundLightAlphaPressed");
const colorSubtleBackgroundLightAlphaSelected = create("colorSubtleBackgroundLightAlphaSelected");
const colorSubtleBackgroundInverted = create("colorSubtleBackgroundInverted");
const colorSubtleBackgroundInvertedHover = create("colorSubtleBackgroundInvertedHover");
const colorSubtleBackgroundInvertedPressed = create("colorSubtleBackgroundInvertedPressed");
const colorSubtleBackgroundInvertedSelected = create("colorSubtleBackgroundInvertedSelected");
const colorTransparentBackground = create("colorTransparentBackground");
const colorTransparentBackgroundHover = create("colorTransparentBackgroundHover");
const colorTransparentBackgroundPressed = create("colorTransparentBackgroundPressed");
const colorTransparentBackgroundSelected = create("colorTransparentBackgroundSelected");
const colorNeutralBackgroundDisabled = create("colorNeutralBackgroundDisabled");
const colorNeutralBackgroundInvertedDisabled = create("colorNeutralBackgroundInvertedDisabled");
const colorNeutralStencil1 = create("colorNeutralStencil1");
const colorNeutralStencil2 = create("colorNeutralStencil2");
const colorNeutralStencil1Alpha = create("colorNeutralStencil1Alpha");
const colorNeutralStencil2Alpha = create("colorNeutralStencil2Alpha");
const colorBackgroundOverlay = create("colorBackgroundOverlay");
const colorScrollbarOverlay = create("colorScrollbarOverlay");
const colorBrandBackground = create("colorBrandBackground");
const colorBrandBackgroundHover = create("colorBrandBackgroundHover");
const colorBrandBackgroundPressed = create("colorBrandBackgroundPressed");
const colorBrandBackgroundSelected = create("colorBrandBackgroundSelected");
const colorCompoundBrandBackground = create("colorCompoundBrandBackground");
const colorCompoundBrandBackgroundHover = create("colorCompoundBrandBackgroundHover");
const colorCompoundBrandBackgroundPressed = create("colorCompoundBrandBackgroundPressed");
const colorBrandBackgroundStatic = create("colorBrandBackgroundStatic");
const colorBrandBackground2 = create("colorBrandBackground2");
const colorBrandBackgroundInverted = create("colorBrandBackgroundInverted");
const colorBrandBackgroundInvertedHover = create("colorBrandBackgroundInvertedHover");
const colorBrandBackgroundInvertedPressed = create("colorBrandBackgroundInvertedPressed");
const colorBrandBackgroundInvertedSelected = create("colorBrandBackgroundInvertedSelected");
const colorNeutralStrokeAccessible = create("colorNeutralStrokeAccessible");
const colorNeutralStrokeAccessibleHover = create("colorNeutralStrokeAccessibleHover");
const colorNeutralStrokeAccessiblePressed = create("colorNeutralStrokeAccessiblePressed");
const colorNeutralStrokeAccessibleSelected = create("colorNeutralStrokeAccessibleSelected");
const colorNeutralStroke1 = create("colorNeutralStroke1");
const colorNeutralStroke1Hover = create("colorNeutralStroke1Hover");
const colorNeutralStroke1Pressed = create("colorNeutralStroke1Pressed");
const colorNeutralStroke1Selected = create("colorNeutralStroke1Selected");
const colorNeutralStroke2 = create("colorNeutralStroke2");
const colorNeutralStroke3 = create("colorNeutralStroke3");
const colorNeutralStrokeOnBrand = create("colorNeutralStrokeOnBrand");
const colorNeutralStrokeOnBrand2 = create("colorNeutralStrokeOnBrand2");
const colorNeutralStrokeOnBrand2Hover = create("colorNeutralStrokeOnBrand2Hover");
const colorNeutralStrokeOnBrand2Pressed = create("colorNeutralStrokeOnBrand2Pressed");
const colorNeutralStrokeOnBrand2Selected = create("colorNeutralStrokeOnBrand2Selected");
const colorBrandStroke1 = create("colorBrandStroke1");
const colorBrandStroke2 = create("colorBrandStroke2");
const colorCompoundBrandStroke = create("colorCompoundBrandStroke");
const colorCompoundBrandStrokeHover = create("colorCompoundBrandStrokeHover");
const colorCompoundBrandStrokePressed = create("colorCompoundBrandStrokePressed");
const colorNeutralStrokeDisabled = create("colorNeutralStrokeDisabled");
const colorNeutralStrokeInvertedDisabled = create("colorNeutralStrokeInvertedDisabled");
const colorTransparentStroke = create("colorTransparentStroke");
const colorTransparentStrokeInteractive = create("colorTransparentStrokeInteractive");
const colorTransparentStrokeDisabled = create("colorTransparentStrokeDisabled");
const colorStrokeFocus1 = create("colorStrokeFocus1");
const colorStrokeFocus2 = create("colorStrokeFocus2");
const colorNeutralShadowAmbient = create("colorNeutralShadowAmbient");
const colorNeutralShadowKey = create("colorNeutralShadowKey");
const colorNeutralShadowAmbientLighter = create("colorNeutralShadowAmbientLighter");
const colorNeutralShadowKeyLighter = create("colorNeutralShadowKeyLighter");
const colorNeutralShadowAmbientDarker = create("colorNeutralShadowAmbientDarker");
const colorNeutralShadowKeyDarker = create("colorNeutralShadowKeyDarker");
const colorBrandShadowAmbient = create("colorBrandShadowAmbient");
const colorBrandShadowKey = create("colorBrandShadowKey");
const colorPaletteRedBackground1 = create("colorPaletteRedBackground1");
const colorPaletteRedBackground2 = create("colorPaletteRedBackground2");
const colorPaletteRedBackground3 = create("colorPaletteRedBackground3");
const colorPaletteRedForeground1 = create("colorPaletteRedForeground1");
const colorPaletteRedForeground2 = create("colorPaletteRedForeground2");
const colorPaletteRedForeground3 = create("colorPaletteRedForeground3");
const colorPaletteRedBorderActive = create("colorPaletteRedBorderActive");
const colorPaletteRedBorder1 = create("colorPaletteRedBorder1");
const colorPaletteRedBorder2 = create("colorPaletteRedBorder2");
const colorPaletteGreenBackground1 = create("colorPaletteGreenBackground1");
const colorPaletteGreenBackground2 = create("colorPaletteGreenBackground2");
const colorPaletteGreenBackground3 = create("colorPaletteGreenBackground3");
const colorPaletteGreenForeground1 = create("colorPaletteGreenForeground1");
const colorPaletteGreenForeground2 = create("colorPaletteGreenForeground2");
const colorPaletteGreenForeground3 = create("colorPaletteGreenForeground3");
const colorPaletteGreenBorderActive = create("colorPaletteGreenBorderActive");
const colorPaletteGreenBorder1 = create("colorPaletteGreenBorder1");
const colorPaletteGreenBorder2 = create("colorPaletteGreenBorder2");
const colorPaletteDarkOrangeBackground1 = create("colorPaletteDarkOrangeBackground1");
const colorPaletteDarkOrangeBackground2 = create("colorPaletteDarkOrangeBackground2");
const colorPaletteDarkOrangeBackground3 = create("colorPaletteDarkOrangeBackground3");
const colorPaletteDarkOrangeForeground1 = create("colorPaletteDarkOrangeForeground1");
const colorPaletteDarkOrangeForeground2 = create("colorPaletteDarkOrangeForeground2");
const colorPaletteDarkOrangeForeground3 = create("colorPaletteDarkOrangeForeground3");
const colorPaletteDarkOrangeBorderActive = create("colorPaletteDarkOrangeBorderActive");
const colorPaletteDarkOrangeBorder1 = create("colorPaletteDarkOrangeBorder1");
const colorPaletteDarkOrangeBorder2 = create("colorPaletteDarkOrangeBorder2");
const colorPaletteYellowBackground1 = create("colorPaletteYellowBackground1");
const colorPaletteYellowBackground2 = create("colorPaletteYellowBackground2");
const colorPaletteYellowBackground3 = create("colorPaletteYellowBackground3");
const colorPaletteYellowForeground1 = create("colorPaletteYellowForeground1");
const colorPaletteYellowForeground2 = create("colorPaletteYellowForeground2");
const colorPaletteYellowForeground3 = create("colorPaletteYellowForeground3");
const colorPaletteYellowBorderActive = create("colorPaletteYellowBorderActive");
const colorPaletteYellowBorder1 = create("colorPaletteYellowBorder1");
const colorPaletteYellowBorder2 = create("colorPaletteYellowBorder2");
const colorPaletteBerryBackground1 = create("colorPaletteBerryBackground1");
const colorPaletteBerryBackground2 = create("colorPaletteBerryBackground2");
const colorPaletteBerryBackground3 = create("colorPaletteBerryBackground3");
const colorPaletteBerryForeground1 = create("colorPaletteBerryForeground1");
const colorPaletteBerryForeground2 = create("colorPaletteBerryForeground2");
const colorPaletteBerryForeground3 = create("colorPaletteBerryForeground3");
const colorPaletteBerryBorderActive = create("colorPaletteBerryBorderActive");
const colorPaletteBerryBorder1 = create("colorPaletteBerryBorder1");
const colorPaletteBerryBorder2 = create("colorPaletteBerryBorder2");
const colorPaletteLightGreenBackground1 = create("colorPaletteLightGreenBackground1");
const colorPaletteLightGreenBackground2 = create("colorPaletteLightGreenBackground2");
const colorPaletteLightGreenBackground3 = create("colorPaletteLightGreenBackground3");
const colorPaletteLightGreenForeground1 = create("colorPaletteLightGreenForeground1");
const colorPaletteLightGreenForeground2 = create("colorPaletteLightGreenForeground2");
const colorPaletteLightGreenForeground3 = create("colorPaletteLightGreenForeground3");
const colorPaletteLightGreenBorderActive = create("colorPaletteLightGreenBorderActive");
const colorPaletteLightGreenBorder1 = create("colorPaletteLightGreenBorder1");
const colorPaletteLightGreenBorder2 = create("colorPaletteLightGreenBorder2");
const colorPaletteMarigoldBackground1 = create("colorPaletteMarigoldBackground1");
const colorPaletteMarigoldBackground2 = create("colorPaletteMarigoldBackground2");
const colorPaletteMarigoldBackground3 = create("colorPaletteMarigoldBackground3");
const colorPaletteMarigoldForeground1 = create("colorPaletteMarigoldForeground1");
const colorPaletteMarigoldForeground2 = create("colorPaletteMarigoldForeground2");
const colorPaletteMarigoldForeground3 = create("colorPaletteMarigoldForeground3");
const colorPaletteMarigoldBorderActive = create("colorPaletteMarigoldBorderActive");
const colorPaletteMarigoldBorder1 = create("colorPaletteMarigoldBorder1");
const colorPaletteMarigoldBorder2 = create("colorPaletteMarigoldBorder2");
const colorPaletteDarkRedBackground2 = create("colorPaletteDarkRedBackground2");
const colorPaletteDarkRedForeground2 = create("colorPaletteDarkRedForeground2");
const colorPaletteDarkRedBorderActive = create("colorPaletteDarkRedBorderActive");
const colorPaletteCranberryBackground2 = create("colorPaletteCranberryBackground2");
const colorPaletteCranberryForeground2 = create("colorPaletteCranberryForeground2");
const colorPaletteCranberryBorderActive = create("colorPaletteCranberryBorderActive");
const colorPalettePumpkinBackground2 = create("colorPalettePumpkinBackground2");
const colorPalettePumpkinForeground2 = create("colorPalettePumpkinForeground2");
const colorPalettePumpkinBorderActive = create("colorPalettePumpkinBorderActive");
const colorPalettePeachBackground2 = create("colorPalettePeachBackground2");
const colorPalettePeachForeground2 = create("colorPalettePeachForeground2");
const colorPalettePeachBorderActive = create("colorPalettePeachBorderActive");
const colorPaletteGoldBackground2 = create("colorPaletteGoldBackground2");
const colorPaletteGoldForeground2 = create("colorPaletteGoldForeground2");
const colorPaletteGoldBorderActive = create("colorPaletteGoldBorderActive");
const colorPaletteBrassBackground2 = create("colorPaletteBrassBackground2");
const colorPaletteBrassForeground2 = create("colorPaletteBrassForeground2");
const colorPaletteBrassBorderActive = create("colorPaletteBrassBorderActive");
const colorPaletteBrownBackground2 = create("colorPaletteBrownBackground2");
const colorPaletteBrownForeground2 = create("colorPaletteBrownForeground2");
const colorPaletteBrownBorderActive = create("colorPaletteBrownBorderActive");
const colorPaletteForestBackground2 = create("colorPaletteForestBackground2");
const colorPaletteForestForeground2 = create("colorPaletteForestForeground2");
const colorPaletteForestBorderActive = create("colorPaletteForestBorderActive");
const colorPaletteSeafoamBackground2 = create("colorPaletteSeafoamBackground2");
const colorPaletteSeafoamForeground2 = create("colorPaletteSeafoamForeground2");
const colorPaletteSeafoamBorderActive = create("colorPaletteSeafoamBorderActive");
const colorPaletteDarkGreenBackground2 = create("colorPaletteDarkGreenBackground2");
const colorPaletteDarkGreenForeground2 = create("colorPaletteDarkGreenForeground2");
const colorPaletteDarkGreenBorderActive = create("colorPaletteDarkGreenBorderActive");
const colorPaletteLightTealBackground2 = create("colorPaletteLightTealBackground2");
const colorPaletteLightTealForeground2 = create("colorPaletteLightTealForeground2");
const colorPaletteLightTealBorderActive = create("colorPaletteLightTealBorderActive");
const colorPaletteTealBackground2 = create("colorPaletteTealBackground2");
const colorPaletteTealForeground2 = create("colorPaletteTealForeground2");
const colorPaletteTealBorderActive = create("colorPaletteTealBorderActive");
const colorPaletteSteelBackground2 = create("colorPaletteSteelBackground2");
const colorPaletteSteelForeground2 = create("colorPaletteSteelForeground2");
const colorPaletteSteelBorderActive = create("colorPaletteSteelBorderActive");
const colorPaletteBlueBackground2 = create("colorPaletteBlueBackground2");
const colorPaletteBlueForeground2 = create("colorPaletteBlueForeground2");
const colorPaletteBlueBorderActive = create("colorPaletteBlueBorderActive");
const colorPaletteRoyalBlueBackground2 = create("colorPaletteRoyalBlueBackground2");
const colorPaletteRoyalBlueForeground2 = create("colorPaletteRoyalBlueForeground2");
const colorPaletteRoyalBlueBorderActive = create("colorPaletteRoyalBlueBorderActive");
const colorPaletteCornflowerBackground2 = create("colorPaletteCornflowerBackground2");
const colorPaletteCornflowerForeground2 = create("colorPaletteCornflowerForeground2");
const colorPaletteCornflowerBorderActive = create("colorPaletteCornflowerBorderActive");
const colorPaletteNavyBackground2 = create("colorPaletteNavyBackground2");
const colorPaletteNavyForeground2 = create("colorPaletteNavyForeground2");
const colorPaletteNavyBorderActive = create("colorPaletteNavyBorderActive");
const colorPaletteLavenderBackground2 = create("colorPaletteLavenderBackground2");
const colorPaletteLavenderForeground2 = create("colorPaletteLavenderForeground2");
const colorPaletteLavenderBorderActive = create("colorPaletteLavenderBorderActive");
const colorPalettePurpleBackground2 = create("colorPalettePurpleBackground2");
const colorPalettePurpleForeground2 = create("colorPalettePurpleForeground2");
const colorPalettePurpleBorderActive = create("colorPalettePurpleBorderActive");
const colorPaletteGrapeBackground2 = create("colorPaletteGrapeBackground2");
const colorPaletteGrapeForeground2 = create("colorPaletteGrapeForeground2");
const colorPaletteGrapeBorderActive = create("colorPaletteGrapeBorderActive");
const colorPaletteLilacBackground2 = create("colorPaletteLilacBackground2");
const colorPaletteLilacForeground2 = create("colorPaletteLilacForeground2");
const colorPaletteLilacBorderActive = create("colorPaletteLilacBorderActive");
const colorPalettePinkBackground2 = create("colorPalettePinkBackground2");
const colorPalettePinkForeground2 = create("colorPalettePinkForeground2");
const colorPalettePinkBorderActive = create("colorPalettePinkBorderActive");
const colorPaletteMagentaBackground2 = create("colorPaletteMagentaBackground2");
const colorPaletteMagentaForeground2 = create("colorPaletteMagentaForeground2");
const colorPaletteMagentaBorderActive = create("colorPaletteMagentaBorderActive");
const colorPalettePlumBackground2 = create("colorPalettePlumBackground2");
const colorPalettePlumForeground2 = create("colorPalettePlumForeground2");
const colorPalettePlumBorderActive = create("colorPalettePlumBorderActive");
const colorPaletteBeigeBackground2 = create("colorPaletteBeigeBackground2");
const colorPaletteBeigeForeground2 = create("colorPaletteBeigeForeground2");
const colorPaletteBeigeBorderActive = create("colorPaletteBeigeBorderActive");
const colorPaletteMinkBackground2 = create("colorPaletteMinkBackground2");
const colorPaletteMinkForeground2 = create("colorPaletteMinkForeground2");
const colorPaletteMinkBorderActive = create("colorPaletteMinkBorderActive");
const colorPalettePlatinumBackground2 = create("colorPalettePlatinumBackground2");
const colorPalettePlatinumForeground2 = create("colorPalettePlatinumForeground2");
const colorPalettePlatinumBorderActive = create("colorPalettePlatinumBorderActive");
const colorPaletteAnchorBackground2 = create("colorPaletteAnchorBackground2");
const colorPaletteAnchorForeground2 = create("colorPaletteAnchorForeground2");
const colorPaletteAnchorBorderActive = create("colorPaletteAnchorBorderActive");
const colorPaletteRedForegroundInverted = create("colorPaletteRedForegroundInverted");
const colorPaletteGreenForegroundInverted = create("colorPaletteGreenForegroundInverted");
const colorPaletteYellowForegroundInverted = create("colorPaletteYellowForegroundInverted");
const shadow2 = create("shadow2");
const shadow4 = create("shadow4");
const shadow8 = create("shadow8");
const shadow16 = create("shadow16");
const shadow28 = create("shadow28");
const shadow64 = create("shadow64");
const shadow2Brand = create("shadow2Brand");
const shadow4Brand = create("shadow4Brand");
const shadow8Brand = create("shadow8Brand");
const shadow16Brand = create("shadow16Brand");
const shadow28Brand = create("shadow28Brand");
const shadow64Brand = create("shadow64Brand");

var tokens = /*#__PURE__*/Object.freeze({
  __proto__: null,
  borderRadiusNone: borderRadiusNone,
  borderRadiusSmall: borderRadiusSmall,
  borderRadiusMedium: borderRadiusMedium,
  borderRadiusLarge: borderRadiusLarge,
  borderRadiusXLarge: borderRadiusXLarge,
  borderRadiusCircular: borderRadiusCircular,
  fontSizeBase100: fontSizeBase100,
  fontSizeBase200: fontSizeBase200,
  fontSizeBase300: fontSizeBase300,
  fontSizeBase400: fontSizeBase400,
  fontSizeBase500: fontSizeBase500,
  fontSizeBase600: fontSizeBase600,
  fontSizeHero700: fontSizeHero700,
  fontSizeHero800: fontSizeHero800,
  fontSizeHero900: fontSizeHero900,
  fontSizeHero1000: fontSizeHero1000,
  lineHeightBase100: lineHeightBase100,
  lineHeightBase200: lineHeightBase200,
  lineHeightBase300: lineHeightBase300,
  lineHeightBase400: lineHeightBase400,
  lineHeightBase500: lineHeightBase500,
  lineHeightBase600: lineHeightBase600,
  lineHeightHero700: lineHeightHero700,
  lineHeightHero800: lineHeightHero800,
  lineHeightHero900: lineHeightHero900,
  lineHeightHero1000: lineHeightHero1000,
  fontFamilyBase: fontFamilyBase,
  fontFamilyMonospace: fontFamilyMonospace,
  fontFamilyNumeric: fontFamilyNumeric,
  fontWeightRegular: fontWeightRegular,
  fontWeightMedium: fontWeightMedium,
  fontWeightSemibold: fontWeightSemibold,
  fontWeightBold: fontWeightBold,
  strokeWidthThin: strokeWidthThin,
  strokeWidthThick: strokeWidthThick,
  strokeWidthThicker: strokeWidthThicker,
  strokeWidthThickest: strokeWidthThickest,
  spacingHorizontalNone: spacingHorizontalNone,
  spacingHorizontalXXS: spacingHorizontalXXS,
  spacingHorizontalXS: spacingHorizontalXS,
  spacingHorizontalSNudge: spacingHorizontalSNudge,
  spacingHorizontalS: spacingHorizontalS,
  spacingHorizontalMNudge: spacingHorizontalMNudge,
  spacingHorizontalM: spacingHorizontalM,
  spacingHorizontalL: spacingHorizontalL,
  spacingHorizontalXL: spacingHorizontalXL,
  spacingHorizontalXXL: spacingHorizontalXXL,
  spacingHorizontalXXXL: spacingHorizontalXXXL,
  spacingVerticalNone: spacingVerticalNone,
  spacingVerticalXXS: spacingVerticalXXS,
  spacingVerticalXS: spacingVerticalXS,
  spacingVerticalSNudge: spacingVerticalSNudge,
  spacingVerticalS: spacingVerticalS,
  spacingVerticalMNudge: spacingVerticalMNudge,
  spacingVerticalM: spacingVerticalM,
  spacingVerticalL: spacingVerticalL,
  spacingVerticalXL: spacingVerticalXL,
  spacingVerticalXXL: spacingVerticalXXL,
  spacingVerticalXXXL: spacingVerticalXXXL,
  durationUltraFast: durationUltraFast,
  durationFaster: durationFaster,
  durationFast: durationFast,
  durationNormal: durationNormal,
  durationSlow: durationSlow,
  durationSlower: durationSlower,
  durationUltraSlow: durationUltraSlow,
  curveAccelerateMax: curveAccelerateMax,
  curveAccelerateMid: curveAccelerateMid,
  curveAccelerateMin: curveAccelerateMin,
  curveDecelerateMax: curveDecelerateMax,
  curveDecelerateMid: curveDecelerateMid,
  curveDecelerateMin: curveDecelerateMin,
  curveEasyEaseMax: curveEasyEaseMax,
  curveEasyEase: curveEasyEase,
  curveLinear: curveLinear,
  colorNeutralForeground1: colorNeutralForeground1,
  colorNeutralForeground1Hover: colorNeutralForeground1Hover,
  colorNeutralForeground1Pressed: colorNeutralForeground1Pressed,
  colorNeutralForeground1Selected: colorNeutralForeground1Selected,
  colorNeutralForeground2: colorNeutralForeground2,
  colorNeutralForeground2Hover: colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed: colorNeutralForeground2Pressed,
  colorNeutralForeground2Selected: colorNeutralForeground2Selected,
  colorNeutralForeground2BrandHover: colorNeutralForeground2BrandHover,
  colorNeutralForeground2BrandPressed: colorNeutralForeground2BrandPressed,
  colorNeutralForeground2BrandSelected: colorNeutralForeground2BrandSelected,
  colorNeutralForeground3: colorNeutralForeground3,
  colorNeutralForeground3Hover: colorNeutralForeground3Hover,
  colorNeutralForeground3Pressed: colorNeutralForeground3Pressed,
  colorNeutralForeground3Selected: colorNeutralForeground3Selected,
  colorNeutralForeground3BrandHover: colorNeutralForeground3BrandHover,
  colorNeutralForeground3BrandPressed: colorNeutralForeground3BrandPressed,
  colorNeutralForeground3BrandSelected: colorNeutralForeground3BrandSelected,
  colorNeutralForeground4: colorNeutralForeground4,
  colorNeutralForegroundDisabled: colorNeutralForegroundDisabled,
  colorNeutralForegroundInvertedDisabled: colorNeutralForegroundInvertedDisabled,
  colorBrandForegroundLink: colorBrandForegroundLink,
  colorBrandForegroundLinkHover: colorBrandForegroundLinkHover,
  colorBrandForegroundLinkPressed: colorBrandForegroundLinkPressed,
  colorBrandForegroundLinkSelected: colorBrandForegroundLinkSelected,
  colorNeutralForeground2Link: colorNeutralForeground2Link,
  colorNeutralForeground2LinkHover: colorNeutralForeground2LinkHover,
  colorNeutralForeground2LinkPressed: colorNeutralForeground2LinkPressed,
  colorNeutralForeground2LinkSelected: colorNeutralForeground2LinkSelected,
  colorCompoundBrandForeground1: colorCompoundBrandForeground1,
  colorCompoundBrandForeground1Hover: colorCompoundBrandForeground1Hover,
  colorCompoundBrandForeground1Pressed: colorCompoundBrandForeground1Pressed,
  colorBrandForeground1: colorBrandForeground1,
  colorBrandForeground2: colorBrandForeground2,
  colorNeutralForeground1Static: colorNeutralForeground1Static,
  colorNeutralForegroundStaticInverted: colorNeutralForegroundStaticInverted,
  colorNeutralForegroundInverted: colorNeutralForegroundInverted,
  colorNeutralForegroundInvertedHover: colorNeutralForegroundInvertedHover,
  colorNeutralForegroundInvertedPressed: colorNeutralForegroundInvertedPressed,
  colorNeutralForegroundInvertedSelected: colorNeutralForegroundInvertedSelected,
  colorNeutralForegroundInverted2: colorNeutralForegroundInverted2,
  colorNeutralForegroundOnBrand: colorNeutralForegroundOnBrand,
  colorNeutralForegroundInvertedLink: colorNeutralForegroundInvertedLink,
  colorNeutralForegroundInvertedLinkHover: colorNeutralForegroundInvertedLinkHover,
  colorNeutralForegroundInvertedLinkPressed: colorNeutralForegroundInvertedLinkPressed,
  colorNeutralForegroundInvertedLinkSelected: colorNeutralForegroundInvertedLinkSelected,
  colorBrandForegroundInverted: colorBrandForegroundInverted,
  colorBrandForegroundInvertedHover: colorBrandForegroundInvertedHover,
  colorBrandForegroundInvertedPressed: colorBrandForegroundInvertedPressed,
  colorBrandForegroundOnLight: colorBrandForegroundOnLight,
  colorBrandForegroundOnLightHover: colorBrandForegroundOnLightHover,
  colorBrandForegroundOnLightPressed: colorBrandForegroundOnLightPressed,
  colorBrandForegroundOnLightSelected: colorBrandForegroundOnLightSelected,
  colorNeutralBackground1: colorNeutralBackground1,
  colorNeutralBackground1Hover: colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed: colorNeutralBackground1Pressed,
  colorNeutralBackground1Selected: colorNeutralBackground1Selected,
  colorNeutralBackground2: colorNeutralBackground2,
  colorNeutralBackground2Hover: colorNeutralBackground2Hover,
  colorNeutralBackground2Pressed: colorNeutralBackground2Pressed,
  colorNeutralBackground2Selected: colorNeutralBackground2Selected,
  colorNeutralBackground3: colorNeutralBackground3,
  colorNeutralBackground3Hover: colorNeutralBackground3Hover,
  colorNeutralBackground3Pressed: colorNeutralBackground3Pressed,
  colorNeutralBackground3Selected: colorNeutralBackground3Selected,
  colorNeutralBackground4: colorNeutralBackground4,
  colorNeutralBackground4Hover: colorNeutralBackground4Hover,
  colorNeutralBackground4Pressed: colorNeutralBackground4Pressed,
  colorNeutralBackground4Selected: colorNeutralBackground4Selected,
  colorNeutralBackground5: colorNeutralBackground5,
  colorNeutralBackground5Hover: colorNeutralBackground5Hover,
  colorNeutralBackground5Pressed: colorNeutralBackground5Pressed,
  colorNeutralBackground5Selected: colorNeutralBackground5Selected,
  colorNeutralBackground6: colorNeutralBackground6,
  colorNeutralBackgroundInverted: colorNeutralBackgroundInverted,
  colorNeutralBackgroundStatic: colorNeutralBackgroundStatic,
  colorSubtleBackground: colorSubtleBackground,
  colorSubtleBackgroundHover: colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed: colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected: colorSubtleBackgroundSelected,
  colorSubtleBackgroundLightAlphaHover: colorSubtleBackgroundLightAlphaHover,
  colorSubtleBackgroundLightAlphaPressed: colorSubtleBackgroundLightAlphaPressed,
  colorSubtleBackgroundLightAlphaSelected: colorSubtleBackgroundLightAlphaSelected,
  colorSubtleBackgroundInverted: colorSubtleBackgroundInverted,
  colorSubtleBackgroundInvertedHover: colorSubtleBackgroundInvertedHover,
  colorSubtleBackgroundInvertedPressed: colorSubtleBackgroundInvertedPressed,
  colorSubtleBackgroundInvertedSelected: colorSubtleBackgroundInvertedSelected,
  colorTransparentBackground: colorTransparentBackground,
  colorTransparentBackgroundHover: colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed: colorTransparentBackgroundPressed,
  colorTransparentBackgroundSelected: colorTransparentBackgroundSelected,
  colorNeutralBackgroundDisabled: colorNeutralBackgroundDisabled,
  colorNeutralBackgroundInvertedDisabled: colorNeutralBackgroundInvertedDisabled,
  colorNeutralStencil1: colorNeutralStencil1,
  colorNeutralStencil2: colorNeutralStencil2,
  colorNeutralStencil1Alpha: colorNeutralStencil1Alpha,
  colorNeutralStencil2Alpha: colorNeutralStencil2Alpha,
  colorBackgroundOverlay: colorBackgroundOverlay,
  colorScrollbarOverlay: colorScrollbarOverlay,
  colorBrandBackground: colorBrandBackground,
  colorBrandBackgroundHover: colorBrandBackgroundHover,
  colorBrandBackgroundPressed: colorBrandBackgroundPressed,
  colorBrandBackgroundSelected: colorBrandBackgroundSelected,
  colorCompoundBrandBackground: colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover: colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed: colorCompoundBrandBackgroundPressed,
  colorBrandBackgroundStatic: colorBrandBackgroundStatic,
  colorBrandBackground2: colorBrandBackground2,
  colorBrandBackgroundInverted: colorBrandBackgroundInverted,
  colorBrandBackgroundInvertedHover: colorBrandBackgroundInvertedHover,
  colorBrandBackgroundInvertedPressed: colorBrandBackgroundInvertedPressed,
  colorBrandBackgroundInvertedSelected: colorBrandBackgroundInvertedSelected,
  colorNeutralStrokeAccessible: colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover: colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed: colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeAccessibleSelected: colorNeutralStrokeAccessibleSelected,
  colorNeutralStroke1: colorNeutralStroke1,
  colorNeutralStroke1Hover: colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed: colorNeutralStroke1Pressed,
  colorNeutralStroke1Selected: colorNeutralStroke1Selected,
  colorNeutralStroke2: colorNeutralStroke2,
  colorNeutralStroke3: colorNeutralStroke3,
  colorNeutralStrokeOnBrand: colorNeutralStrokeOnBrand,
  colorNeutralStrokeOnBrand2: colorNeutralStrokeOnBrand2,
  colorNeutralStrokeOnBrand2Hover: colorNeutralStrokeOnBrand2Hover,
  colorNeutralStrokeOnBrand2Pressed: colorNeutralStrokeOnBrand2Pressed,
  colorNeutralStrokeOnBrand2Selected: colorNeutralStrokeOnBrand2Selected,
  colorBrandStroke1: colorBrandStroke1,
  colorBrandStroke2: colorBrandStroke2,
  colorCompoundBrandStroke: colorCompoundBrandStroke,
  colorCompoundBrandStrokeHover: colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed: colorCompoundBrandStrokePressed,
  colorNeutralStrokeDisabled: colorNeutralStrokeDisabled,
  colorNeutralStrokeInvertedDisabled: colorNeutralStrokeInvertedDisabled,
  colorTransparentStroke: colorTransparentStroke,
  colorTransparentStrokeInteractive: colorTransparentStrokeInteractive,
  colorTransparentStrokeDisabled: colorTransparentStrokeDisabled,
  colorStrokeFocus1: colorStrokeFocus1,
  colorStrokeFocus2: colorStrokeFocus2,
  colorNeutralShadowAmbient: colorNeutralShadowAmbient,
  colorNeutralShadowKey: colorNeutralShadowKey,
  colorNeutralShadowAmbientLighter: colorNeutralShadowAmbientLighter,
  colorNeutralShadowKeyLighter: colorNeutralShadowKeyLighter,
  colorNeutralShadowAmbientDarker: colorNeutralShadowAmbientDarker,
  colorNeutralShadowKeyDarker: colorNeutralShadowKeyDarker,
  colorBrandShadowAmbient: colorBrandShadowAmbient,
  colorBrandShadowKey: colorBrandShadowKey,
  colorPaletteRedBackground1: colorPaletteRedBackground1,
  colorPaletteRedBackground2: colorPaletteRedBackground2,
  colorPaletteRedBackground3: colorPaletteRedBackground3,
  colorPaletteRedForeground1: colorPaletteRedForeground1,
  colorPaletteRedForeground2: colorPaletteRedForeground2,
  colorPaletteRedForeground3: colorPaletteRedForeground3,
  colorPaletteRedBorderActive: colorPaletteRedBorderActive,
  colorPaletteRedBorder1: colorPaletteRedBorder1,
  colorPaletteRedBorder2: colorPaletteRedBorder2,
  colorPaletteGreenBackground1: colorPaletteGreenBackground1,
  colorPaletteGreenBackground2: colorPaletteGreenBackground2,
  colorPaletteGreenBackground3: colorPaletteGreenBackground3,
  colorPaletteGreenForeground1: colorPaletteGreenForeground1,
  colorPaletteGreenForeground2: colorPaletteGreenForeground2,
  colorPaletteGreenForeground3: colorPaletteGreenForeground3,
  colorPaletteGreenBorderActive: colorPaletteGreenBorderActive,
  colorPaletteGreenBorder1: colorPaletteGreenBorder1,
  colorPaletteGreenBorder2: colorPaletteGreenBorder2,
  colorPaletteDarkOrangeBackground1: colorPaletteDarkOrangeBackground1,
  colorPaletteDarkOrangeBackground2: colorPaletteDarkOrangeBackground2,
  colorPaletteDarkOrangeBackground3: colorPaletteDarkOrangeBackground3,
  colorPaletteDarkOrangeForeground1: colorPaletteDarkOrangeForeground1,
  colorPaletteDarkOrangeForeground2: colorPaletteDarkOrangeForeground2,
  colorPaletteDarkOrangeForeground3: colorPaletteDarkOrangeForeground3,
  colorPaletteDarkOrangeBorderActive: colorPaletteDarkOrangeBorderActive,
  colorPaletteDarkOrangeBorder1: colorPaletteDarkOrangeBorder1,
  colorPaletteDarkOrangeBorder2: colorPaletteDarkOrangeBorder2,
  colorPaletteYellowBackground1: colorPaletteYellowBackground1,
  colorPaletteYellowBackground2: colorPaletteYellowBackground2,
  colorPaletteYellowBackground3: colorPaletteYellowBackground3,
  colorPaletteYellowForeground1: colorPaletteYellowForeground1,
  colorPaletteYellowForeground2: colorPaletteYellowForeground2,
  colorPaletteYellowForeground3: colorPaletteYellowForeground3,
  colorPaletteYellowBorderActive: colorPaletteYellowBorderActive,
  colorPaletteYellowBorder1: colorPaletteYellowBorder1,
  colorPaletteYellowBorder2: colorPaletteYellowBorder2,
  colorPaletteBerryBackground1: colorPaletteBerryBackground1,
  colorPaletteBerryBackground2: colorPaletteBerryBackground2,
  colorPaletteBerryBackground3: colorPaletteBerryBackground3,
  colorPaletteBerryForeground1: colorPaletteBerryForeground1,
  colorPaletteBerryForeground2: colorPaletteBerryForeground2,
  colorPaletteBerryForeground3: colorPaletteBerryForeground3,
  colorPaletteBerryBorderActive: colorPaletteBerryBorderActive,
  colorPaletteBerryBorder1: colorPaletteBerryBorder1,
  colorPaletteBerryBorder2: colorPaletteBerryBorder2,
  colorPaletteLightGreenBackground1: colorPaletteLightGreenBackground1,
  colorPaletteLightGreenBackground2: colorPaletteLightGreenBackground2,
  colorPaletteLightGreenBackground3: colorPaletteLightGreenBackground3,
  colorPaletteLightGreenForeground1: colorPaletteLightGreenForeground1,
  colorPaletteLightGreenForeground2: colorPaletteLightGreenForeground2,
  colorPaletteLightGreenForeground3: colorPaletteLightGreenForeground3,
  colorPaletteLightGreenBorderActive: colorPaletteLightGreenBorderActive,
  colorPaletteLightGreenBorder1: colorPaletteLightGreenBorder1,
  colorPaletteLightGreenBorder2: colorPaletteLightGreenBorder2,
  colorPaletteMarigoldBackground1: colorPaletteMarigoldBackground1,
  colorPaletteMarigoldBackground2: colorPaletteMarigoldBackground2,
  colorPaletteMarigoldBackground3: colorPaletteMarigoldBackground3,
  colorPaletteMarigoldForeground1: colorPaletteMarigoldForeground1,
  colorPaletteMarigoldForeground2: colorPaletteMarigoldForeground2,
  colorPaletteMarigoldForeground3: colorPaletteMarigoldForeground3,
  colorPaletteMarigoldBorderActive: colorPaletteMarigoldBorderActive,
  colorPaletteMarigoldBorder1: colorPaletteMarigoldBorder1,
  colorPaletteMarigoldBorder2: colorPaletteMarigoldBorder2,
  colorPaletteDarkRedBackground2: colorPaletteDarkRedBackground2,
  colorPaletteDarkRedForeground2: colorPaletteDarkRedForeground2,
  colorPaletteDarkRedBorderActive: colorPaletteDarkRedBorderActive,
  colorPaletteCranberryBackground2: colorPaletteCranberryBackground2,
  colorPaletteCranberryForeground2: colorPaletteCranberryForeground2,
  colorPaletteCranberryBorderActive: colorPaletteCranberryBorderActive,
  colorPalettePumpkinBackground2: colorPalettePumpkinBackground2,
  colorPalettePumpkinForeground2: colorPalettePumpkinForeground2,
  colorPalettePumpkinBorderActive: colorPalettePumpkinBorderActive,
  colorPalettePeachBackground2: colorPalettePeachBackground2,
  colorPalettePeachForeground2: colorPalettePeachForeground2,
  colorPalettePeachBorderActive: colorPalettePeachBorderActive,
  colorPaletteGoldBackground2: colorPaletteGoldBackground2,
  colorPaletteGoldForeground2: colorPaletteGoldForeground2,
  colorPaletteGoldBorderActive: colorPaletteGoldBorderActive,
  colorPaletteBrassBackground2: colorPaletteBrassBackground2,
  colorPaletteBrassForeground2: colorPaletteBrassForeground2,
  colorPaletteBrassBorderActive: colorPaletteBrassBorderActive,
  colorPaletteBrownBackground2: colorPaletteBrownBackground2,
  colorPaletteBrownForeground2: colorPaletteBrownForeground2,
  colorPaletteBrownBorderActive: colorPaletteBrownBorderActive,
  colorPaletteForestBackground2: colorPaletteForestBackground2,
  colorPaletteForestForeground2: colorPaletteForestForeground2,
  colorPaletteForestBorderActive: colorPaletteForestBorderActive,
  colorPaletteSeafoamBackground2: colorPaletteSeafoamBackground2,
  colorPaletteSeafoamForeground2: colorPaletteSeafoamForeground2,
  colorPaletteSeafoamBorderActive: colorPaletteSeafoamBorderActive,
  colorPaletteDarkGreenBackground2: colorPaletteDarkGreenBackground2,
  colorPaletteDarkGreenForeground2: colorPaletteDarkGreenForeground2,
  colorPaletteDarkGreenBorderActive: colorPaletteDarkGreenBorderActive,
  colorPaletteLightTealBackground2: colorPaletteLightTealBackground2,
  colorPaletteLightTealForeground2: colorPaletteLightTealForeground2,
  colorPaletteLightTealBorderActive: colorPaletteLightTealBorderActive,
  colorPaletteTealBackground2: colorPaletteTealBackground2,
  colorPaletteTealForeground2: colorPaletteTealForeground2,
  colorPaletteTealBorderActive: colorPaletteTealBorderActive,
  colorPaletteSteelBackground2: colorPaletteSteelBackground2,
  colorPaletteSteelForeground2: colorPaletteSteelForeground2,
  colorPaletteSteelBorderActive: colorPaletteSteelBorderActive,
  colorPaletteBlueBackground2: colorPaletteBlueBackground2,
  colorPaletteBlueForeground2: colorPaletteBlueForeground2,
  colorPaletteBlueBorderActive: colorPaletteBlueBorderActive,
  colorPaletteRoyalBlueBackground2: colorPaletteRoyalBlueBackground2,
  colorPaletteRoyalBlueForeground2: colorPaletteRoyalBlueForeground2,
  colorPaletteRoyalBlueBorderActive: colorPaletteRoyalBlueBorderActive,
  colorPaletteCornflowerBackground2: colorPaletteCornflowerBackground2,
  colorPaletteCornflowerForeground2: colorPaletteCornflowerForeground2,
  colorPaletteCornflowerBorderActive: colorPaletteCornflowerBorderActive,
  colorPaletteNavyBackground2: colorPaletteNavyBackground2,
  colorPaletteNavyForeground2: colorPaletteNavyForeground2,
  colorPaletteNavyBorderActive: colorPaletteNavyBorderActive,
  colorPaletteLavenderBackground2: colorPaletteLavenderBackground2,
  colorPaletteLavenderForeground2: colorPaletteLavenderForeground2,
  colorPaletteLavenderBorderActive: colorPaletteLavenderBorderActive,
  colorPalettePurpleBackground2: colorPalettePurpleBackground2,
  colorPalettePurpleForeground2: colorPalettePurpleForeground2,
  colorPalettePurpleBorderActive: colorPalettePurpleBorderActive,
  colorPaletteGrapeBackground2: colorPaletteGrapeBackground2,
  colorPaletteGrapeForeground2: colorPaletteGrapeForeground2,
  colorPaletteGrapeBorderActive: colorPaletteGrapeBorderActive,
  colorPaletteLilacBackground2: colorPaletteLilacBackground2,
  colorPaletteLilacForeground2: colorPaletteLilacForeground2,
  colorPaletteLilacBorderActive: colorPaletteLilacBorderActive,
  colorPalettePinkBackground2: colorPalettePinkBackground2,
  colorPalettePinkForeground2: colorPalettePinkForeground2,
  colorPalettePinkBorderActive: colorPalettePinkBorderActive,
  colorPaletteMagentaBackground2: colorPaletteMagentaBackground2,
  colorPaletteMagentaForeground2: colorPaletteMagentaForeground2,
  colorPaletteMagentaBorderActive: colorPaletteMagentaBorderActive,
  colorPalettePlumBackground2: colorPalettePlumBackground2,
  colorPalettePlumForeground2: colorPalettePlumForeground2,
  colorPalettePlumBorderActive: colorPalettePlumBorderActive,
  colorPaletteBeigeBackground2: colorPaletteBeigeBackground2,
  colorPaletteBeigeForeground2: colorPaletteBeigeForeground2,
  colorPaletteBeigeBorderActive: colorPaletteBeigeBorderActive,
  colorPaletteMinkBackground2: colorPaletteMinkBackground2,
  colorPaletteMinkForeground2: colorPaletteMinkForeground2,
  colorPaletteMinkBorderActive: colorPaletteMinkBorderActive,
  colorPalettePlatinumBackground2: colorPalettePlatinumBackground2,
  colorPalettePlatinumForeground2: colorPalettePlatinumForeground2,
  colorPalettePlatinumBorderActive: colorPalettePlatinumBorderActive,
  colorPaletteAnchorBackground2: colorPaletteAnchorBackground2,
  colorPaletteAnchorForeground2: colorPaletteAnchorForeground2,
  colorPaletteAnchorBorderActive: colorPaletteAnchorBorderActive,
  colorPaletteRedForegroundInverted: colorPaletteRedForegroundInverted,
  colorPaletteGreenForegroundInverted: colorPaletteGreenForegroundInverted,
  colorPaletteYellowForegroundInverted: colorPaletteYellowForegroundInverted,
  shadow2: shadow2,
  shadow4: shadow4,
  shadow8: shadow8,
  shadow16: shadow16,
  shadow28: shadow28,
  shadow64: shadow64,
  shadow2Brand: shadow2Brand,
  shadow4Brand: shadow4Brand,
  shadow8Brand: shadow8Brand,
  shadow16Brand: shadow16Brand,
  shadow28Brand: shadow28Brand,
  shadow64Brand: shadow64Brand
});

const styles$q = css`
  ${display("block")}

  :host{max-width:fit-content;contain:content}.heading{height:44px;display:grid;position:relative;vertical-align:middle;padding-inline:${spacingHorizontalM} ${spacingHorizontalMNudge};border-radius:${borderRadiusMedium};font-family:${fontFamilyBase};font-size:${fontSizeBase300};font-weight:${fontWeightRegular};line-height:${lineHeightBase300};grid-template-columns:auto auto 1fr auto}.heading-content{height:100%;display:flex;align-items:center}.button{box-sizing:border-box;appearance:none;border:none;outline:none;text-align:start;cursor:pointer;font-family:inherit;height:44px;color:${colorNeutralForeground1};background:${colorTransparentBackground};line-height:${lineHeightBase300};height:auto;padding:0;font-size:inherit;grid-column:auto / span 2;grid-row:1}.button::before{content:'';position:absolute;inset:0px;cursor:pointer;border-radius:${borderRadiusSmall}}.icon{display:flex;align-items:center;justify-content:center;pointer-events:none;position:relative;height:100%;padding-right:${spacingHorizontalS};grid-column:1 / span 1;grid-row:1}.region{margin:0 ${spacingHorizontalM}}::slotted([slot='start']),::slotted([slot='end']){justify-content:center;align-items:center;padding-right:${spacingHorizontalS};grid-column:2 / span 1;grid-row:1 / span 1}button:focus-visible::after{content:'';position:absolute;inset:0px;cursor:pointer;border-radius:${borderRadiusSmall};outline:none;border:2px solid ${colorStrokeFocus1};box-shadow:inset 0 0 0 1px ${colorStrokeFocus2}}:host([disabled]) .button{color:${colorNeutralForegroundDisabled}}:host([disabled]) svg{filter:invert(89%) sepia(0%) saturate(569%) hue-rotate(155deg) brightness(88%) contrast(87%)}:host([expanded]) .region{display:block}:host([expanded]) .default-collapsed-icon,:host([expanded]) ::slotted([slot='collapsed-icon']),:host(:not([expanded])) .default-expanded-icon,:host(:not([expanded])) ::slotted([slot='expanded-icon']),:host([expanded]) ::slotted([slot='end']),::slotted([slot='start']),.region{display:none}:host([expanded]) ::slotted([slot='start']),:host([expanded]) ::slotted([slot='expanded-icon']),:host(:not([expanded])) ::slotted([slot='collapsed-icon']),::slotted([slot='end']){display:flex}.heading{font-size:${fontSizeBase300};line-height:${lineHeightBase300}}:host([size='small']) .heading{font-size:${fontSizeBase200};line-height:${lineHeightBase200}}:host([size='large']) .heading{font-size:${fontSizeBase400};line-height:${lineHeightBase400}}:host([size='extra-large']) .heading{font-size:${fontSizeBase500};line-height:${lineHeightBase500}}:host([expand-icon-position='end']) :slotted(span[slot='start']),:host([expand-icon-position='end']) ::slotted(span[slot='end']){grid-column:1 / span 1;grid-row:1}:host([expand-icon-position='end']) ::slotted(span[slot='start']),:host([expand-icon-position='end']) ::slotted(span[slot='end']){grid-column:1 / span 1;grid-row:1}:host([expand-icon-position='end']) .icon{grid-column:4 / span 1;grid-row:1;display:flex;padding-left:10px;padding-right:0}:host([expand-icon-position='end']) .button{grid-column:2 / span 3;grid-row:1}:host([block]){max-width:100%}:host([expand-icon-position='end']) .heading{grid-template-columns:auto auto 28px}:host([expand-icon-position='end']) .icon{grid-column:5 / span 1}:host([block][expand-icon-position='end']) .heading{grid-template-columns:auto 1fr}:host([block][expand-icon-position='end']) .icon{grid-column:5 / span 1}`;

const chevronRight20Filled = html.partial(`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="default-collapsed-icon"
>
  <path
    d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
    fill="currentColor"
  />
</svg>`);
const chevronDown20Filled = html.partial(`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="default-expanded-icon"
>
  <path
    d="M15.794 7.73271C16.0797 8.03263 16.0681 8.50737 15.7682 8.79306L10.5178 13.7944C10.2281 14.0703 9.77285 14.0703 9.48318 13.7944L4.23271 8.79306C3.93279 8.50737 3.92125 8.03263 4.20694 7.73271C4.49264 7.43279 4.96737 7.42125 5.26729 7.70694L10.0005 12.2155L14.7336 7.70694C15.0336 7.42125 15.5083 7.43279 15.794 7.73271Z"
    fill="currentColor"
  />
</svg>`);
const template$r = accordionItemTemplate({
  collapsedIcon: chevronRight20Filled,
  expandedIcon: chevronDown20Filled
});

const definition$r = AccordionItem.compose({
  name: `${FluentDesignSystem.prefix}-accordion-item`,
  template: template$r,
  styles: styles$q
});

/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @slot start - Content which can be provided before the anchor content
 * @slot end - Content which can be provided after the anchor content
 * @slot - The default slot for anchor content
 * @csspart control - The anchor element
 * @csspart content - The element wrapping anchor content
 *
 * @public
 */
class FASTAnchor extends FASTElement {}
__decorate([attr], FASTAnchor.prototype, "download", void 0);
__decorate([attr], FASTAnchor.prototype, "href", void 0);
__decorate([attr], FASTAnchor.prototype, "hreflang", void 0);
__decorate([attr], FASTAnchor.prototype, "ping", void 0);
__decorate([attr], FASTAnchor.prototype, "referrerpolicy", void 0);
__decorate([attr], FASTAnchor.prototype, "rel", void 0);
__decorate([attr], FASTAnchor.prototype, "target", void 0);
__decorate([attr], FASTAnchor.prototype, "type", void 0);
__decorate([observable], FASTAnchor.prototype, "defaultSlottedContent", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA link role
 *
 * @public
 */
class DelegatesARIALink {}
__decorate([attr({
  attribute: "aria-expanded"
})], DelegatesARIALink.prototype, "ariaExpanded", void 0);
applyMixins$1(DelegatesARIALink, ARIAGlobalStatesAndProperties);
applyMixins$1(FASTAnchor, StartEnd, DelegatesARIALink);

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTAnchor:class)} component.
 * @public
 */
function anchorTemplate(options = {}) {
  return html`<a class="control" part="control" download="${x => x.download}" href="${x => x.href}" hreflang="${x => x.hreflang}" ping="${x => x.ping}" referrerpolicy="${x => x.referrerpolicy}" rel="${x => x.rel}" target="${x => x.target}" type="${x => x.type}" aria-atomic="${x => x.ariaAtomic}" aria-busy="${x => x.ariaBusy}" aria-controls="${x => x.ariaControls}" aria-current="${x => x.ariaCurrent}" aria-describedby="${x => x.ariaDescribedby}" aria-details="${x => x.ariaDetails}" aria-disabled="${x => x.ariaDisabled}" aria-errormessage="${x => x.ariaErrormessage}" aria-expanded="${x => x.ariaExpanded}" aria-flowto="${x => x.ariaFlowto}" aria-haspopup="${x => x.ariaHaspopup}" aria-hidden="${x => x.ariaHidden}" aria-invalid="${x => x.ariaInvalid}" aria-keyshortcuts="${x => x.ariaKeyshortcuts}" aria-label="${x => x.ariaLabel}" aria-labelledby="${x => x.ariaLabelledby}" aria-live="${x => x.ariaLive}" aria-owns="${x => x.ariaOwns}" aria-relevant="${x => x.ariaRelevant}" aria-roledescription="${x => x.ariaRoledescription}" ${ref("control")}>${startSlotTemplate(options)}<span class="content" part="content"><slot ${slotted("defaultSlottedContent")}></slot></span>${endSlotTemplate(options)}</a>`;
}

var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$j(target, key, result);
  return result;
};
class AnchorButton extends FASTAnchor {
  constructor() {
    super(...arguments);
    this.iconOnly = false;
    this.disabled = false;
    this.disabledFocusable = false;
    this.handleDisabledFocusableClick = e => {
      if (e && this.disabled || this.disabledFocusable) {
        e.stopImmediatePropagation();
        return;
      }
    };
  }
  disabledChanged(prev, next) {
    if (this.disabled) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("tabindex", "-1");
    } else {
      this.removeAttribute("aria-disabled");
      this.removeAttribute("tabindex");
    }
  }
  disabledFocusableChanged(prev, next) {
    if (!this.$fastController.isConnected) {
      return;
    }
    if (this.disabledFocusable) {
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("aria-disabled");
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleDisabledFocusableClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleDisabledFocusableClick);
  }
}
__decorateClass$j([attr], AnchorButton.prototype, "appearance", 2);
__decorateClass$j([attr], AnchorButton.prototype, "shape", 2);
__decorateClass$j([attr], AnchorButton.prototype, "size", 2);
__decorateClass$j([attr({
  attribute: "icon-only",
  mode: "boolean"
})], AnchorButton.prototype, "iconOnly", 2);
__decorateClass$j([attr({
  mode: "boolean"
})], AnchorButton.prototype, "disabled", 2);
__decorateClass$j([attr({
  attribute: "disabled-focusable",
  mode: "boolean"
})], AnchorButton.prototype, "disabledFocusable", 2);

const ButtonAppearance = {
  primary: "primary",
  outline: "outline",
  subtle: "subtle",
  secondary: "secondary",
  transparent: "transparent"
};
const ButtonShape = {
  circular: "circular",
  rounded: "rounded",
  square: "square"
};
const ButtonSize = {
  small: "small",
  medium: "medium",
  large: "large"
};

const AnchorButtonAppearance = ButtonAppearance;
const AnchorButtonShape = ButtonShape;
const AnchorButtonSize = ButtonSize;

const template$q = anchorTemplate();

const styles$p = css`
  ${display("inline-flex")}

  :host{--icon-spacing:${spacingHorizontalSNudge};contain:layout style;vertical-align:middle}:host .control{display:inline-flex;align-items:center;box-sizing:border-box;justify-content:center;text-decoration-line:none;margin:0;min-height:32px;outline-style:none;background-color:${colorNeutralBackground1};color:${colorNeutralForeground1};border:${strokeWidthThin} solid ${colorNeutralStroke1};padding:0 ${spacingHorizontalM};min-width:96px;border-radius:${borderRadiusMedium};font-size:${fontSizeBase300};font-family:${fontFamilyBase};font-weight:${fontWeightSemibold};line-height:${lineHeightBase300};transition-duration:${durationFaster};transition-property:background,border,color;transition-timing-function:${curveEasyEase};cursor:pointer}.content{display:inherit}:host(:hover) .control{background-color:${colorNeutralBackground1Hover};color:${colorNeutralForeground1Hover};border-color:${colorNeutralStroke1Hover}}:host(:hover:active) .control{background-color:${colorNeutralBackground1Pressed};border-color:${colorNeutralStroke1Pressed};color:${colorNeutralForeground1Pressed};outline-style:none}:host .control:focus-visible{border-color:${colorTransparentStroke};outline:${strokeWidthThick} solid ${colorTransparentStroke};box-shadow:${shadow4},0 0 0 2px ${colorStrokeFocus2}}@media screen and (prefers-reduced-motion:reduce){transition-duration:0.01ms}::slotted(svg){font-size:20px;height:20px;width:20px;fill:currentColor}[slot='start'],::slotted([slot='start']){margin-inline-end:var(--icon-spacing)}[slot='end'],::slotted([slot='end']){margin-inline-start:var(--icon-spacing)}:host([icon-only]) .control{min-width:32px;max-width:32px}:host([size='small']){--icon-spacing:${spacingHorizontalXS}}:host([size='small']) .control{min-height:24px;min-width:64px;padding:0 ${spacingHorizontalS};border-radius:${borderRadiusSmall};font-size:${fontSizeBase200};line-height:${lineHeightBase200};font-weight:${fontWeightRegular}}:host([size='small'][icon-only]) .control{min-width:24px;max-width:24px}:host([size='large']) .control{min-height:40px;border-radius:${borderRadiusLarge};padding:0 ${spacingHorizontalL};font-size:${fontSizeBase400};line-height:${lineHeightBase400}}:host([size='large'][icon-only]) .control{min-width:40px;max-width:40px}:host([size='large']) ::slotted(svg){font-size:24px;height:24px;width:24px}:host([shape='circular']) .control,:host([shape='circular']) .control:focus-visible{border-radius:${borderRadiusCircular}}:host([shape='square']) .control,:host([shape='square']) .control:focus-visible{border-radius:${borderRadiusNone}}:host([appearance='primary']) .control{background-color:${colorBrandBackground};color:${colorNeutralForegroundOnBrand};border-color:transparent}:host([appearance='primary']:hover) .control{background-color:${colorBrandBackgroundHover}}:host([appearance='primary']:hover) .control,:host([appearance='primary']:hover:active) .control{border-color:transparent;color:${colorNeutralForegroundOnBrand}}:host([appearance='primary']:hover:active) .control{background-color:${colorBrandBackgroundPressed}}:host([appearance='primary']) .control:focus-visible{border-color:${colorNeutralForegroundOnBrand};box-shadow:${shadow2},0 0 0 2px ${colorStrokeFocus2}}:host(is:([disabled][appearance='primary'],[disabled-focusabale][appearance="primary"])) .control,:host(is:([disabled][appearance='primary'],[disabled-focusabale][appearance="primary"]):hover) .control,:host(is:([disabled][appearance='primary'],[disabled-focusabale][appearance="primary"]):hover:active) .control{border-color:transparent}:host([appearance='outline']) .control{background-color:${colorTransparentBackground}}:host([appearance='outline']:hover) .control{background-color:${colorTransparentBackgroundHover}}:host([appearance='outline']:hover:active) .control{background-color:${colorTransparentBackgroundPressed}}:host(is:([disabled][appearance='outline'],[disabled-focusabale][appearance="outline"])) .control,:host(is:([disabled][appearance='outline'],[disabled-focusabale][appearance="outline"]):hover) .control,:host(is:([disabled][appearance='outline'],[disabled-focusabale][appearance="outline"]):hover:active) .control{background-color:${colorTransparentBackground}}:host([appearance='subtle']) .control{background-color:${colorSubtleBackground};color:${colorNeutralForeground2};border-color:transparent}:host([appearance='subtle']:hover) .control{background-color:${colorSubtleBackgroundHover};color:${colorNeutralForeground2Hover};border-color:transparent}:host([appearance='subtle']:hover:active) .control{background-color:${colorSubtleBackgroundPressed};color:${colorNeutralForeground2Pressed};border-color:transparent}:host(is:([disabled][appearance='subtle'],[disabled-focusabale][appearance="subtle"])) .control,:host(is:([disabled][appearance='subtle'],[disabled-focusabale][appearance="subtle"]):hover) .control,:host(is:([disabled][appearance='subtle'],[disabled-focusabale][appearance="subtle"]):hover:active) .control{background-color:${colorTransparentBackground};border-color:transparent}:host([appearance='subtle']:hover) ::slotted(svg){fill:${colorNeutralForeground2BrandHover}}:host([appearance='subtle']:hover:active) ::slotted(svg){fill:${colorNeutralForeground2BrandPressed}}:host([appearance='transparent']) .control{background-color:${colorTransparentBackground};color:${colorNeutralForeground2}}:host([appearance='transparent']:hover) .control{background-color:${colorTransparentBackgroundHover};color:${colorNeutralForeground2BrandHover}}:host([appearance='transparent']:hover:active) .control{background-color:${colorTransparentBackgroundPressed};color:${colorNeutralForeground2BrandPressed}}:host([appearance='transparent']) .control,:host([appearance='transparent']:hover) .control,:host([appearance='transparent']:hover:active) .control{border-color:transparent}:host(is:([disabled][appearance='transparent'],[disabled-focusabale][appearance="transparent"])) .control,:host(is:([disabled][appearance='transparent'],[disabled-focusabale][appearance="transparent"]):hover) .control,:host(is:([disabled][appearance='transparent'],[disabled-focusabale][appearance="transparent"]):hover:active) .control{border-color:transparent;background-color:${colorTransparentBackground}}:host(:is([disabled],[disabled-focusable],[appearance][disabled],[appearance][disabled-focusable])) .control,:host(:is([disabled],[disabled-focusable],[appearance][disabled],[appearance][disabled-focusable]):hover) .control,:host(:is([disabled],[disabled-focusable],[appearance][disabled],[appearance][disabled-focusable]):hover:active)
    .control{background-color:${colorNeutralBackgroundDisabled};border-color:${colorNeutralStrokeDisabled};color:${colorNeutralForegroundDisabled};cursor:not-allowed}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    :host([appearance='transparent']:hover) .control{border-color:Highlight}`));

const styles$o = css`
  ${styles$p}

  .content{text-align:center}`;

const definition$q = AnchorButton.compose({
  name: `${FluentDesignSystem.prefix}-anchor-button`,
  template: template$q,
  styles: styles$o,
  shadowOptions: {
    delegatesFocus: true
  }
});

const UNWANTED_ENCLOSURES_REGEX = /[\(\[\{][^\)\]\}]*[\)\]\}]/g;
const UNWANTED_CHARS_REGEX = /[\0-\u001F\!-/:-@\[-`\{-\u00BF\u0250-\u036F\uD800-\uFFFF]/g;
const PHONENUMBER_REGEX = /^\d+[\d\s]*(:?ext|x|)\s*\d+$/i;
const MULTIPLE_WHITESPACES_REGEX = /\s+/g;
const UNSUPPORTED_TEXT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD869][\uDC00-\uDED6]/;
function getInitialsLatin(displayName, isRtl, firstInitialOnly) {
  let initials = "";
  const splits = displayName.split(" ");
  if (splits.length !== 0) {
    initials += splits[0].charAt(0).toUpperCase();
  }
  if (!firstInitialOnly) {
    if (splits.length === 2) {
      initials += splits[1].charAt(0).toUpperCase();
    } else if (splits.length === 3) {
      initials += splits[2].charAt(0).toUpperCase();
    }
  }
  if (isRtl && initials.length > 1) {
    return initials.charAt(1) + initials.charAt(0);
  }
  return initials;
}
function cleanupDisplayName(displayName) {
  displayName = displayName.replace(UNWANTED_ENCLOSURES_REGEX, "");
  displayName = displayName.replace(UNWANTED_CHARS_REGEX, "");
  displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX, " ");
  displayName = displayName.trim();
  return displayName;
}
function getInitials(displayName, isRtl, options) {
  if (!displayName) {
    return "";
  }
  displayName = cleanupDisplayName(displayName);
  if (UNSUPPORTED_TEXT_REGEX.test(displayName) || !(options == null ? void 0 : options.allowPhoneInitials) && PHONENUMBER_REGEX.test(displayName)) {
    return "";
  }
  return getInitialsLatin(displayName, isRtl, options == null ? void 0 : options.firstInitialOnly);
}

const AvatarActive = {
  active: "active",
  inactive: "inactive"
};
const AvatarShape = {
  circular: "circular",
  square: "square"
};
const AvatarAppearance = {
  ring: "ring",
  shadow: "shadow",
  ringShadow: "ring-shadow"
};
const AvatarNamedColor = {
  darkRed: "dark-red",
  cranberry: "cranberry",
  red: "red",
  pumpkin: "pumpkin",
  peach: "peach",
  marigold: "marigold",
  gold: "gold",
  brass: "brass",
  brown: "brown",
  forest: "forest",
  seafoam: "seafoam",
  darkGreen: "dark-green",
  lightTeal: "light-teal",
  teal: "teal",
  steel: "steel",
  blue: "blue",
  royalBlue: "royal-blue",
  cornflower: "cornflower",
  navy: "navy",
  lavender: "lavender",
  purple: "purple",
  grape: "grape",
  lilac: "lilac",
  pink: "pink",
  magenta: "magenta",
  plum: "plum",
  beige: "beige",
  mink: "mink",
  platinum: "platinum",
  anchor: "anchor"
};
const AvatarColor = {
  neutral: "neutral",
  brand: "brand",
  colorful: "colorful",
  ...AvatarNamedColor
};
const AvatarSize = {
  _16: 16,
  _20: 20,
  _24: 24,
  _28: 28,
  _32: 32,
  _36: 36,
  _40: 40,
  _48: 48,
  _56: 56,
  _64: 64,
  _72: 72,
  _96: 96,
  _120: 120,
  _128: 128
};

var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
const _Avatar = class extends FASTElement {
  constructor() {
    super(...arguments);
    this.color = "neutral";
  }
  generateColor() {
    var _a, _b;
    if (!this.color) {
      return;
    }
    return this.color === AvatarColor.colorful ? _Avatar.colors[getHashCode((_b = (_a = this.colorId) != null ? _a : this.name) != null ? _b : "") % _Avatar.colors.length] : this.color;
  }
  generateInitials() {
    var _a, _b;
    if (!this.name && !this.initials) {
      return;
    }
    const size = (_a = this.size) != null ? _a : 32;
    return (_b = this.initials) != null ? _b : getInitials(this.name, window.getComputedStyle(this).direction === "rtl", {
      firstInitialOnly: size <= 16
    });
  }
};
let Avatar = _Avatar;
Avatar.colors = Object.values(AvatarNamedColor);
__decorateClass$i([attr], Avatar.prototype, "name", 2);
__decorateClass$i([attr], Avatar.prototype, "initials", 2);
__decorateClass$i([attr({
  converter: nullableNumberConverter
})], Avatar.prototype, "size", 2);
__decorateClass$i([attr], Avatar.prototype, "shape", 2);
__decorateClass$i([attr], Avatar.prototype, "active", 2);
__decorateClass$i([attr], Avatar.prototype, "appearance", 2);
__decorateClass$i([attr], Avatar.prototype, "color", 2);
__decorateClass$i([attr({
  attribute: "color-id"
})], Avatar.prototype, "colorId", 2);
const getHashCode = str => {
  let hashCode = 0;
  for (let len = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> 8 - shift);
  }
  return hashCode;
};

const defaultIconTemplate = html`<svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="default-icon" fill="currentcolor" aria-hidden="true"><path d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0010 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0017 13a2 2 0 00-2-2H5zm-1 2a1 1 0 011-1h10a1 1 0 011 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0110 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 014 13z"></path></svg>`;
function avatarTemplate() {
  return html`<template role="img" data-color=${x => x.generateColor()}><slot>${x => x.name || x.initials ? x.generateInitials() : defaultIconTemplate}</slot><slot name="badge"></slot></template>`;
}
const template$p = avatarTemplate();

const animations = {
  fastOutSlowInMax: curveDecelerateMax,
  fastOutSlowInMid: curveDecelerateMid,
  fastOutSlowInMin: curveDecelerateMin,
  slowOutFastInMax: curveAccelerateMax,
  slowOutFastInMid: curveAccelerateMid,
  slowOutFastInMin: curveAccelerateMin,
  fastEase: curveEasyEaseMax,
  normalEase: curveEasyEase,
  nullEasing: curveLinear
};
const styles$n = css`
  ${display("inline-flex")} :host{position:relative;align-items:center;justify-content:center;flex-shrink:0;width:32px;height:32px;font-family:${fontFamilyBase};font-weight:${fontWeightSemibold};font-size:${fontSizeBase300};border-radius:${borderRadiusCircular};color:${colorNeutralForeground3};background-color:${colorNeutralBackground6};contain:layout style}.default-icon,::slotted(svg){width:20px;height:20px;font-size:20px}::slotted(img){box-sizing:border-box;width:100%;height:100%;border-radius:${borderRadiusCircular}}::slotted([slot='badge']){position:absolute;bottom:0;right:0;box-shadow:0 0 0 ${strokeWidthThin} ${colorNeutralBackground1}}:host([size='64']) ::slotted([slot='badge']),:host([size='72']) ::slotted([slot='badge']),:host([size='96']) ::slotted([slot='badge']),:host([size='120']) ::slotted([slot='badge']),:host([size='128']) ::slotted([slot='badge']){box-shadow:0 0 0 ${strokeWidthThick} ${colorNeutralBackground1}}:host([size='16']),:host([size='20']),:host([size='24']){font-size:${fontSizeBase100};font-weight:${fontWeightRegular}}:host([size='16']){width:16px;height:16px}:host([size='20']){width:20px;height:20px}:host([size='24']){width:24px;height:24px}:host([size='16']) .default-icon,:host([size='16']) ::slotted(svg){width:12px;height:12px;font-size:12px}:host([size='20']) .default-icon,:host([size='24']) .default-icon,:host([size='20']) ::slotted(svg),:host([size='24']) ::slotted(svg){width:16px;height:16px;font-size:16px}:host([size='28']){width:28px;height:28px;font-size:${fontSizeBase200}}:host([size='36']){width:36px;height:36px}:host([size='40']){width:40px;height:40px}:host([size='48']),:host([size='56']){font-size:${fontSizeBase400}}:host([size='48']){width:48px;height:48px}:host([size='48']) .default-icon,:host([size='48']) ::slotted(svg){width:24px;height:24px;font-size:24px}:host([size='56']){width:56px;height:56px}:host([size='56']) .default-icon,:host([size='56']) ::slotted(svg){width:28px;height:28px;font-size:28px}:host([size='64']),:host([size='72']),:host([size='96']){font-size:${fontSizeBase500}}:host([size='64']) .default-icon,:host([size='72']) .default-icon,:host([size='64']) ::slotted(svg),:host([size='72']) ::slotted(svg){width:32px;height:32px;font-size:32px}:host([size='64']){width:64px;height:64px}:host([size='72']){width:72px;height:72px}:host([size='96']){width:96px;height:96px}:host([size='96']) .default-icon,:host([size='120']) .default-icon,:host([size='128']) .default-icon,:host([size='96']) ::slotted(svg),:host([size='120']) ::slotted(svg),:host([size='128']) ::slotted(svg){width:48px;height:48px;font-size:48px}:host([size='120']),:host([size='128']){font-size:${fontSizeBase600}}:host([size='120']){width:120px;height:120px}:host([size='128']){width:128px;height:128px}:host([shape='square']){border-radius:${borderRadiusMedium}}:host([shape='square'][size='20']),:host([shape='square'][size='24']){border-radius:${borderRadiusSmall}}:host([shape='square'][size='56']),:host([shape='square'][size='64']),:host([shape='square'][size='72']){border-radius:${borderRadiusLarge}}:host([shape='square'][size='96']),:host([shape='square'][size='120']),:host([shape='square'][size='128']){border-radius:${borderRadiusXLarge}}:host([data-color='brand']){color:${colorNeutralForegroundStaticInverted};background-color:${colorBrandBackgroundStatic}}:host([data-color='dark-red']){color:${colorPaletteDarkRedForeground2};background-color:${colorPaletteDarkRedBackground2}}:host([data-color='cranberry']){color:${colorPaletteCranberryForeground2};background-color:${colorPaletteCranberryBackground2}}:host([data-color='red']){color:${colorPaletteRedForeground2};background-color:${colorPaletteRedBackground2}}:host([data-color='pumpkin']){color:${colorPalettePumpkinForeground2};background-color:${colorPalettePumpkinBackground2}}:host([data-color='peach']){color:${colorPalettePeachForeground2};background-color:${colorPalettePeachBackground2}}:host([data-color='marigold']){color:${colorPaletteMarigoldForeground2};background-color:${colorPaletteMarigoldBackground2}}:host([data-color='gold']){color:${colorPaletteGoldForeground2};background-color:${colorPaletteGoldBackground2}}:host([data-color='brass']){color:${colorPaletteBrassForeground2};background-color:${colorPaletteBrassBackground2}}:host([data-color='brown']){color:${colorPaletteBrownForeground2};background-color:${colorPaletteBrownBackground2}}:host([data-color='forest']){color:${colorPaletteForestForeground2};background-color:${colorPaletteForestBackground2}}:host([data-color='seafoam']){color:${colorPaletteSeafoamForeground2};background-color:${colorPaletteSeafoamBackground2}}:host([data-color='dark-green']){color:${colorPaletteDarkGreenForeground2};background-color:${colorPaletteDarkGreenBackground2}}:host([data-color='light-teal']){color:${colorPaletteLightTealForeground2};background-color:${colorPaletteLightTealBackground2}}:host([data-color='teal']){color:${colorPaletteTealForeground2};background-color:${colorPaletteTealBackground2}}:host([data-color='steel']){color:${colorPaletteSteelForeground2};background-color:${colorPaletteSteelBackground2}}:host([data-color='blue']){color:${colorPaletteBlueForeground2};background-color:${colorPaletteBlueBackground2}}:host([data-color='royal-blue']){color:${colorPaletteRoyalBlueForeground2};background-color:${colorPaletteRoyalBlueBackground2}}:host([data-color='cornflower']){color:${colorPaletteCornflowerForeground2};background-color:${colorPaletteCornflowerBackground2}}:host([data-color='navy']){color:${colorPaletteNavyForeground2};background-color:${colorPaletteNavyBackground2}}:host([data-color='lavender']){color:${colorPaletteLavenderForeground2};background-color:${colorPaletteLavenderBackground2}}:host([data-color='purple']){color:${colorPalettePurpleForeground2};background-color:${colorPalettePurpleBackground2}}:host([data-color='grape']){color:${colorPaletteGrapeForeground2};background-color:${colorPaletteGrapeBackground2}}:host([data-color='lilac']){color:${colorPaletteLilacForeground2};background-color:${colorPaletteLilacBackground2}}:host([data-color='pink']){color:${colorPalettePinkForeground2};background-color:${colorPalettePinkBackground2}}:host([data-color='magenta']){color:${colorPaletteMagentaForeground2};background-color:${colorPaletteMagentaBackground2}}:host([data-color='plum']){color:${colorPalettePlumForeground2};background-color:${colorPalettePlumBackground2}}:host([data-color='beige']){color:${colorPaletteBeigeForeground2};background-color:${colorPaletteBeigeBackground2}}:host([data-color='mink']){color:${colorPaletteMinkForeground2};background-color:${colorPaletteMinkBackground2}}:host([data-color='platinum']){color:${colorPalettePlatinumForeground2};background-color:${colorPalettePlatinumBackground2}}:host([data-color='anchor']){color:${colorPaletteAnchorForeground2};background-color:${colorPaletteAnchorBackground2}}:host([active]){transform:perspective(1px);transition-property:transform,opacity;transition-duration:${durationUltraSlow},${durationFaster};transition-delay:${animations.fastEase},${animations.nullEasing}}:host([active])::before{content:'';position:absolute;top:0;left:0;bottom:0;right:0;border-radius:inherit;transition-property:margin,opacity;transition-duration:${durationUltraSlow},${durationSlower};transition-delay:${animations.fastEase},${animations.nullEasing}}:host([active])::before{box-shadow:${shadow8};border-style:solid;border-color:${colorBrandBackgroundStatic}}:host([active][appearance='shadow'])::before{border-style:none;border-color:none}:host([active]:not([appearance='shadow']))::before{margin:calc(-2 * ${strokeWidthThick});border-width:${strokeWidthThick}}:host([size='56'][active]:not([appearance='shadow']))::before,:host([size='64'][active]:not([appearance='shadow']))::before{margin:calc(-2 * ${strokeWidthThicker});border-width:${strokeWidthThicker}}:host([size='72'][active]:not([appearance='shadow']))::before,:host([size='96'][active]:not([appearance='shadow']))::before,:host([size='120'][active]:not([appearance='shadow']))::before,:host([size='128'][active]:not([appearance='shadow']))::before{margin:calc(-2 * ${strokeWidthThickest});border-width:${strokeWidthThickest}}:host([size='20'][active][appearance])::before,:host([size='24'][active][appearance])::before,:host([size='28'][active][appearance])::before{box-shadow:${shadow4}}:host([size='56'][active][appearance])::before,:host([size='64'][active][appearance])::before{box-shadow:${shadow16}}:host([size='72'][active][appearance])::before,:host([size='96'][active][appearance])::before,:host([size='120'][active][appearance])::before,:host([size='128'][active][appearance])::before{box-shadow:${shadow28}}:host([active][appearance='ring'])::before{box-shadow:none}:host([active='inactive']){opacity:0.8;transform:scale(0.875);transition-property:transform,opacity;transition-duration:${durationUltraSlow},${durationFaster};transition-delay:${animations.fastOutSlowInMin},${animations.nullEasing}}:host([active='inactive'])::before{margin:0;opacity:0;transition-property:margin,opacity;transition-duration:${durationUltraSlow},${durationSlower};transition-delay:${animations.fastOutSlowInMin},${animations.nullEasing}}@media screen and (prefers-reduced-motion:reduce){:host([active]){transition-duration:0.01ms}:host([active])::before{transition-duration:0.01ms;transition-delay:0.01ms}}`;

const definition$p = Avatar.compose({
  name: `${FluentDesignSystem.prefix}-avatar`,
  template: template$p,
  styles: styles$n
});

function applyMixins(derivedCtor, ...baseCtors) {
  const derivedAttributes = AttributeConfiguration.locate(derivedCtor);
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== "constructor") {
        Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      }
    });
    const baseAttributes = AttributeConfiguration.locate(baseCtor);
    baseAttributes.forEach(x => derivedAttributes.push(x));
  });
}

const BadgeAppearance = {
  filled: "filled",
  ghost: "ghost",
  outline: "outline",
  tint: "tint"
};
const BadgeColor = {
  brand: "brand",
  danger: "danger",
  important: "important",
  informative: "informative",
  severe: "severe",
  subtle: "subtle",
  success: "success",
  warning: "warning"
};
const BadgeShape = {
  circular: "circular",
  rounded: "rounded",
  square: "square"
};
const BadgeSize = {
  tiny: "tiny",
  extraSmall: "extra-small",
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extra-large"
};

var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
class Badge extends FASTElement {
  constructor() {
    super(...arguments);
    this.appearance = BadgeAppearance.filled;
    this.color = BadgeColor.brand;
  }
}
__decorateClass$h([attr], Badge.prototype, "appearance", 2);
__decorateClass$h([attr], Badge.prototype, "color", 2);
__decorateClass$h([attr], Badge.prototype, "shape", 2);
__decorateClass$h([attr], Badge.prototype, "size", 2);
applyMixins(Badge, StartEnd);

function badgeTemplate(options = {}) {
  return html` ${startSlotTemplate(options)}<slot>${staticallyCompose(options.defaultContent)}</slot>${endSlotTemplate(options)} `;
}
const template$o = badgeTemplate();

const textPadding = spacingHorizontalXXS;
const badgeBaseStyles = css.partial`
  ${display("inline-flex")} :host {
    position: relative;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    min-width: 20px;
    height: 20px;
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
    border-radius: ${borderRadiusCircular};
    border-color: ${colorTransparentStroke};
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    contain: content;
  }

  ::slotted(svg) {
    font-size: 12px;
  }

  :host(:not([appearance='ghost']))::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: ${strokeWidthThin};
    border-color: inherit;
    border-radius: inherit;
  }
`;
const badgeSizeStyles = css.partial`
  :host([size='tiny']) {
    width: 6px;
    height: 6px;
    font-size: 4px;
    line-height: 4px;
    padding-inline: 0;
    min-width: unset;
  }
  :host([size='tiny']) ::slotted(svg) {
    font-size: 6px;
  }
  :host([size='extra-small']) {
    width: 10px;
    height: 10px;
    font-size: 6px;
    line-height: 6px;
    padding-inline: 0;
    min-width: unset;
  }
  :host([size='extra-small']) ::slotted(svg) {
    font-size: 10px;
  }
  :host([size='small']) {
    min-width: 16px;
    height: 16px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXXS} + ${textPadding});
  }
  :host([size='small']) ::slotted(svg) {
    font-size: 12px;
  }
  :host([size='large']) {
    min-width: 24px;
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
  }
  :host([size='large']) ::slotted(svg) {
    font-size: 16px;
  }
  :host([size='extra-large']) {
    min-width: 32px;
    height: 32px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalSNudge} + ${textPadding});
  }
  :host([size='extra-large']) ::slotted(svg) {
    font-size: 20px;
  }
`;
const badgeFilledStyles = css.partial`
  :host([color='danger']) {
    background-color: ${colorPaletteRedBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='important']) {
    background-color: ${colorNeutralForeground1};
    color: ${colorNeutralBackground1};
  }

  :host([color='informative']) {
    background-color: ${colorNeutralBackground5};
    color: ${colorNeutralForeground3};
  }

  :host([color='severe']) {
    background-color: ${colorPaletteDarkOrangeBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='subtle']) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }

  :host([color='success']) {
    background-color: ${colorPaletteGreenBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='warning']) {
    background-color: ${colorPaletteYellowBackground3};
    color: ${colorNeutralForeground1Static};
  }
`;
const badgeGhostStyles = css.partial`
  :host([appearance='ghost']) {
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host([appearance='ghost'][color='danger']) {
    color: ${colorPaletteRedForeground3};
  }

  :host([appearance='ghost'][color='important']) {
    color: ${colorNeutralForeground1};
  }

  :host([appearance='ghost'][color='informative']) {
    color: ${colorNeutralForeground3};
  }

  :host([appearance='ghost'][color='severe']) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host([appearance='ghost'][color='subtle']) {
    color: ${colorNeutralForegroundInverted};
  }

  :host([appearance='ghost'][color='success']) {
    color: ${colorPaletteGreenForeground3};
  }

  :host([appearance='ghost'][color='warning']) {
    color: ${colorPaletteYellowForeground2};
  }
`;
const badgeOutlineStyles = css.partial`
  :host([appearance='outline']) {
    border-color: currentColor;
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host([appearance='outline'][color='danger']) {
    color: ${colorPaletteRedForeground3};
  }

  :host([appearance='outline'][color='important']) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStrokeAccessible};
  }

  :host([appearance='outline'][color='informative']) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='outline'][color='severe']) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host([appearance='outline'][color='subtle']) {
    color: ${colorNeutralForegroundStaticInverted};
  }

  :host([appearance='outline'][color='success']) {
    color: ${colorPaletteGreenForeground2};
  }

  :host([appearance='outline'][color='warning']) {
    color: ${colorPaletteYellowForeground2};
  }
`;
const badgeTintStyles = css.partial`
  :host([appearance='tint']) {
    background-color: ${colorBrandBackground2};
    color: ${colorBrandForeground2};
    border-color: ${colorBrandStroke2};
  }

  :host([appearance='tint'][color='danger']) {
    background-color: ${colorPaletteRedBackground1};
    color: ${colorPaletteRedForeground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host([appearance='tint'][color='important']) {
    background-color: ${colorNeutralForeground3};
    color: ${colorNeutralBackground1};
    border-color: ${colorTransparentStroke};
  }

  :host([appearance='tint'][color='informative']) {
    background-color: ${colorNeutralBackground4};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='tint'][color='severe']) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    color: ${colorPaletteDarkOrangeForeground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host([appearance='tint'][color='subtle']) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='tint'][color='success']) {
    background-color: ${colorPaletteGreenBackground1};
    color: ${colorPaletteGreenForeground1};
    border-color: ${colorPaletteGreenBorder2};
  }

  :host([appearance='tint'][color='warning']) {
    background-color: ${colorPaletteYellowBackground1};
    color: ${colorPaletteYellowForeground2};
    border-color: ${colorPaletteYellowBorder1};
  }
`;

const styles$m = css`
  :host([shape='square']){border-radius:${borderRadiusNone}}:host([shape='rounded']){border-radius:${borderRadiusMedium}}:host([shape='rounded'][size='tiny']),:host([shape='rounded'][size='extra-small']),:host([shape='rounded'][size='small']){border-radius:${borderRadiusSmall}}${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeOutlineStyles}
  ${badgeTintStyles}
  ${badgeBaseStyles}
`;

const definition$o = Badge.compose({
  name: `${FluentDesignSystem.prefix}-badge`,
  template: template$o,
  styles: styles$m
});

const proxySlotName = "form-associated-proxy";
const ElementInternalsKey = "ElementInternals";
/**
 * @alpha
 */
const supportsElementInternals = ElementInternalsKey in window && "setFormValue" in window[ElementInternalsKey].prototype;
const InternalsMap = new WeakMap();
/**
 * Base function for providing Custom Element Form Association.
 *
 * @beta
 */
function FormAssociated(BaseCtor) {
  const C = class extends BaseCtor {
    constructor(...args) {
      super(...args);
      /**
       * Track whether the value has been changed from the initial value
       */
      this.dirtyValue = false;
      /**
       * Sets the element's disabled state. A disabled element will not be included during form submission.
       *
       * @remarks
       * HTML Attribute: disabled
       */
      this.disabled = false;
      /**
       * These are events that are still fired by the proxy
       * element based on user / programmatic interaction.
       *
       * The proxy implementation should be transparent to
       * the app author, so block these events from emitting.
       */
      this.proxyEventsToBlock = ["change", "click"];
      this.proxyInitialized = false;
      this.required = false;
      this.initialValue = this.initialValue || "";
      if (!this.elementInternals) {
        // When elementInternals is not supported, formResetCallback is
        // bound to an event listener, so ensure the handler's `this`
        // context is correct.
        this.formResetCallback = this.formResetCallback.bind(this);
      }
    }
    /**
     * Must evaluate to true to enable elementInternals.
     * Feature detects API support and resolve respectively
     *
     * @internal
     */
    static get formAssociated() {
      return supportsElementInternals;
    }
    /**
     * Returns the validity state of the element
     *
     * @beta
     */
    get validity() {
      return this.elementInternals ? this.elementInternals.validity : this.proxy.validity;
    }
    /**
     * Retrieve a reference to the associated form.
     * Returns null if not associated to any form.
     *
     * @beta
     */
    get form() {
      return this.elementInternals ? this.elementInternals.form : this.proxy.form;
    }
    /**
     * Retrieve the localized validation message,
     * or custom validation message if set.
     *
     * @beta
     */
    get validationMessage() {
      return this.elementInternals ? this.elementInternals.validationMessage : this.proxy.validationMessage;
    }
    /**
     * Whether the element will be validated when the
     * form is submitted
     */
    get willValidate() {
      return this.elementInternals ? this.elementInternals.willValidate : this.proxy.willValidate;
    }
    /**
     * A reference to all associated label elements
     */
    get labels() {
      if (this.elementInternals) {
        return Object.freeze(Array.from(this.elementInternals.labels));
      } else if (this.proxy instanceof HTMLElement && this.proxy.ownerDocument && this.id) {
        // Labels associated by wrapping the element: <label><custom-element></custom-element></label>
        const parentLabels = this.proxy.labels;
        // Labels associated using the `for` attribute
        const forLabels = Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`));
        const labels = parentLabels ? forLabels.concat(Array.from(parentLabels)) : forLabels;
        return Object.freeze(labels);
      } else {
        return emptyArray;
      }
    }
    /**
     * Invoked when the `value` property changes
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `valueChanged` method
     * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    valueChanged(previous, next) {
      this.dirtyValue = true;
      if (this.proxy instanceof HTMLElement) {
        this.proxy.value = this.value;
      }
      this.currentValue = this.value;
      this.setFormValue(this.value);
      this.validate();
    }
    currentValueChanged() {
      this.value = this.currentValue;
    }
    /**
     * Invoked when the `initialValue` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `initialValueChanged` method
     * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    initialValueChanged(previous, next) {
      // If the value is clean and the component is connected to the DOM
      // then set value equal to the attribute value.
      if (!this.dirtyValue) {
        this.value = this.initialValue;
        this.dirtyValue = false;
      }
    }
    /**
     * Invoked when the `disabled` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `disabledChanged` method
     * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    disabledChanged(previous, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.disabled = this.disabled;
      }
      Updates.enqueue(() => this.classList.toggle("disabled", this.disabled));
    }
    /**
     * Invoked when the `name` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `nameChanged` method
     * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    nameChanged(previous, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.name = this.name;
      }
    }
    /**
     * Invoked when the `required` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `requiredChanged` method
     * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    requiredChanged(prev, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.required = this.required;
      }
      Updates.enqueue(() => this.classList.toggle("required", this.required));
      this.validate();
    }
    /**
     * The element internals object. Will only exist
     * in browsers supporting the attachInternals API
     */
    get elementInternals() {
      if (!supportsElementInternals) {
        return null;
      }
      let internals = InternalsMap.get(this);
      if (!internals) {
        internals = this.attachInternals();
        InternalsMap.set(this, internals);
      }
      return internals;
    }
    /**
     * @internal
     */
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keypress", this._keypressHandler);
      if (!this.value) {
        this.value = this.initialValue;
        this.dirtyValue = false;
      }
      if (!this.elementInternals) {
        this.attachProxy();
        if (this.form) {
          this.form.addEventListener("reset", this.formResetCallback);
        }
      }
    }
    /**
     * @internal
     */
    disconnectedCallback() {
      this.proxyEventsToBlock.forEach(name => this.proxy.removeEventListener(name, this.stopPropagation));
      if (!this.elementInternals && this.form) {
        this.form.removeEventListener("reset", this.formResetCallback);
      }
    }
    /**
     * Return the current validity of the element.
     */
    checkValidity() {
      return this.elementInternals ? this.elementInternals.checkValidity() : this.proxy.checkValidity();
    }
    /**
     * Return the current validity of the element.
     * If false, fires an invalid event at the element.
     */
    reportValidity() {
      return this.elementInternals ? this.elementInternals.reportValidity() : this.proxy.reportValidity();
    }
    /**
     * Set the validity of the control. In cases when the elementInternals object is not
     * available (and the proxy element is used to report validity), this function will
     * do nothing unless a message is provided, at which point the setCustomValidity method
     * of the proxy element will be invoked with the provided message.
     * @param flags - Validity flags
     * @param message - Optional message to supply
     * @param anchor - Optional element used by UA to display an interactive validation UI
     */
    setValidity(flags, message, anchor) {
      if (this.elementInternals) {
        this.elementInternals.setValidity(flags, message, anchor);
      } else if (typeof message === "string") {
        this.proxy.setCustomValidity(message);
      }
    }
    /**
     * Invoked when a connected component's form or fieldset has its disabled
     * state changed.
     * @param disabled - the disabled value of the form / fieldset
     */
    formDisabledCallback(disabled) {
      this.disabled = disabled;
    }
    formResetCallback() {
      this.value = this.initialValue;
      this.dirtyValue = false;
    }
    /**
     * Attach the proxy element to the DOM
     */
    attachProxy() {
      var _a;
      if (!this.proxyInitialized) {
        this.proxyInitialized = true;
        this.proxy.style.display = "none";
        this.proxyEventsToBlock.forEach(name => this.proxy.addEventListener(name, this.stopPropagation));
        // These are typically mapped to the proxy during
        // property change callbacks, but during initialization
        // on the initial call of the callback, the proxy is
        // still undefined. We should find a better way to address this.
        this.proxy.disabled = this.disabled;
        this.proxy.required = this.required;
        if (typeof this.name === "string") {
          this.proxy.name = this.name;
        }
        if (typeof this.value === "string") {
          this.proxy.value = this.value;
        }
        this.proxy.setAttribute("slot", proxySlotName);
        this.proxySlot = document.createElement("slot");
        this.proxySlot.setAttribute("name", proxySlotName);
      }
      (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.proxySlot);
      this.appendChild(this.proxy);
    }
    /**
     * Detach the proxy element from the DOM
     */
    detachProxy() {
      var _a;
      this.removeChild(this.proxy);
      (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.removeChild(this.proxySlot);
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(anchor) {
      if (this.proxy instanceof HTMLElement) {
        this.setValidity(this.proxy.validity, this.proxy.validationMessage, anchor);
      }
    }
    /**
     * Associates the provided value (and optional state) with the parent form.
     * @param value - The value to set
     * @param state - The state object provided to during session restores and when autofilling.
     */
    setFormValue(value, state) {
      if (this.elementInternals) {
        this.elementInternals.setFormValue(value, state || value);
      }
    }
    _keypressHandler(e) {
      switch (e.key) {
        case keyEnter:
          if (this.form instanceof HTMLFormElement) {
            // Implicit submission
            const defaultButton = this.form.querySelector("[type=submit]");
            defaultButton === null || defaultButton === void 0 ? void 0 : defaultButton.click();
          }
          break;
      }
    }
    /**
     * Used to stop propagation of proxy element events
     * @param e - Event object
     */
    stopPropagation(e) {
      e.stopPropagation();
    }
  };
  attr({
    mode: "boolean"
  })(C.prototype, "disabled");
  attr({
    mode: "fromView",
    attribute: "value"
  })(C.prototype, "initialValue");
  attr({
    attribute: "current-value"
  })(C.prototype, "currentValue");
  attr(C.prototype, "name");
  attr({
    mode: "boolean"
  })(C.prototype, "required");
  observable(C.prototype, "value");
  return C;
}
/**
 * Creates a checkable form associated component.
 * @beta
 */
function CheckableFormAssociated(BaseCtor) {
  class C extends FormAssociated(BaseCtor) {}
  class D extends C {
    constructor(...args) {
      super(args);
      /**
       * Tracks whether the "checked" property has been changed.
       * This is necessary to provide consistent behavior with
       * normal input checkboxes
       */
      this.dirtyChecked = false;
      /**
       * Provides the default checkedness of the input element
       * Passed down to proxy
       *
       * @public
       * @remarks
       * HTML Attribute: checked
       */
      this.checkedAttribute = false;
      /**
       * The checked state of the control.
       *
       * @public
       */
      this.checked = false;
      // Re-initialize dirtyChecked because initialization of other values
      // causes it to become true
      this.dirtyChecked = false;
    }
    checkedAttributeChanged() {
      this.defaultChecked = this.checkedAttribute;
    }
    /**
     * @internal
     */
    defaultCheckedChanged() {
      if (!this.dirtyChecked) {
        // Setting this.checked will cause us to enter a dirty state,
        // but if we are clean when defaultChecked is changed, we want to stay
        // in a clean state, so reset this.dirtyChecked
        this.checked = this.defaultChecked;
        this.dirtyChecked = false;
      }
    }
    checkedChanged(prev, next) {
      if (!this.dirtyChecked) {
        this.dirtyChecked = true;
      }
      this.currentChecked = this.checked;
      this.updateForm();
      if (this.proxy instanceof HTMLInputElement) {
        this.proxy.checked = this.checked;
      }
      if (prev !== undefined) {
        this.$emit("change");
      }
      this.validate();
    }
    currentCheckedChanged(prev, next) {
      this.checked = this.currentChecked;
    }
    updateForm() {
      const value = this.checked ? this.value : null;
      this.setFormValue(value, value);
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateForm();
    }
    formResetCallback() {
      super.formResetCallback();
      this.checked = !!this.checkedAttribute;
      this.dirtyChecked = false;
    }
  }
  attr({
    attribute: "checked",
    mode: "boolean"
  })(D.prototype, "checkedAttribute");
  attr({
    attribute: "current-checked",
    converter: booleanConverter
  })(D.prototype, "currentChecked");
  observable(D.prototype, "defaultChecked");
  observable(D.prototype, "checked");
  return D;
}

class _Button extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTButton:class)} component.
 *
 * @beta
 */
class FormAssociatedButton extends FormAssociated(_Button) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * Button type values.
 *
 * @public
 */
const ButtonType = {
  submit: "submit",
  reset: "reset",
  button: "button"
};

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
class FASTButton extends FormAssociatedButton {
  constructor() {
    super(...arguments);
    /**
     * Submits the parent form
     */
    this.handleSubmission = () => {
      if (!this.form) {
        return;
      }
      const attached = this.proxy.isConnected;
      if (!attached) {
        this.attachProxy();
      }
      // Browser support for requestSubmit is not comprehensive
      // so click the proxy if it isn't supported
      typeof this.form.requestSubmit === "function" ? this.form.requestSubmit(this.proxy) : this.proxy.click();
      if (!attached) {
        this.detachProxy();
      }
    };
    /**
     * Resets the parent form
     */
    this.handleFormReset = () => {
      var _a;
      (_a = this.form) === null || _a === void 0 ? void 0 : _a.reset();
    };
  }
  formactionChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formAction = this.formaction;
    }
  }
  formenctypeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formEnctype = this.formenctype;
    }
  }
  formmethodChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formMethod = this.formmethod;
    }
  }
  formnovalidateChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formNoValidate = this.formnovalidate;
    }
  }
  formtargetChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formTarget = this.formtarget;
    }
  }
  typeChanged(previous, next) {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
    }
    next === ButtonType.submit && this.addEventListener("click", this.handleSubmission);
    previous === ButtonType.submit && this.removeEventListener("click", this.handleSubmission);
    next === ButtonType.reset && this.addEventListener("click", this.handleFormReset);
    previous === ButtonType.reset && this.removeEventListener("click", this.handleFormReset);
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute("type", this.type);
  }
}
__decorate([attr({
  mode: "boolean"
})], FASTButton.prototype, "autofocus", void 0);
__decorate([attr({
  attribute: "form"
})], FASTButton.prototype, "formId", void 0);
__decorate([attr], FASTButton.prototype, "formaction", void 0);
__decorate([attr], FASTButton.prototype, "formenctype", void 0);
__decorate([attr], FASTButton.prototype, "formmethod", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTButton.prototype, "formnovalidate", void 0);
__decorate([attr], FASTButton.prototype, "formtarget", void 0);
__decorate([attr], FASTButton.prototype, "type", void 0);
__decorate([observable], FASTButton.prototype, "defaultSlottedContent", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
class DelegatesARIAButton {}
__decorate([attr({
  attribute: "aria-expanded"
})], DelegatesARIAButton.prototype, "ariaExpanded", void 0);
__decorate([attr({
  attribute: "aria-pressed"
})], DelegatesARIAButton.prototype, "ariaPressed", void 0);
applyMixins$1(DelegatesARIAButton, ARIAGlobalStatesAndProperties);
applyMixins$1(FASTButton, StartEnd, DelegatesARIAButton);

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTButton:class)} component.
 * @public
 */
function buttonTemplate$1(options = {}) {
  return html`<button class="control" part="control" ?autofocus="${x => x.autofocus}" ?disabled="${x => x.disabled}" form="${x => x.formId}" formaction="${x => x.formaction}" formenctype="${x => x.formenctype}" formmethod="${x => x.formmethod}" ?formnovalidate="${x => x.formnovalidate}" formtarget="${x => x.formtarget}" name="${x => x.name}" type="${x => x.type}" value="${x => x.value}" aria-atomic="${x => x.ariaAtomic}" aria-busy="${x => x.ariaBusy}" aria-controls="${x => x.ariaControls}" aria-current="${x => x.ariaCurrent}" aria-describedby="${x => x.ariaDescribedby}" aria-details="${x => x.ariaDetails}" aria-disabled="${x => x.ariaDisabled}" aria-errormessage="${x => x.ariaErrormessage}" aria-expanded="${x => x.ariaExpanded}" aria-flowto="${x => x.ariaFlowto}" aria-haspopup="${x => x.ariaHaspopup}" aria-hidden="${x => x.ariaHidden}" aria-invalid="${x => x.ariaInvalid}" aria-keyshortcuts="${x => x.ariaKeyshortcuts}" aria-label="${x => x.ariaLabel}" aria-labelledby="${x => x.ariaLabelledby}" aria-live="${x => x.ariaLive}" aria-owns="${x => x.ariaOwns}" aria-pressed="${x => x.ariaPressed}" aria-relevant="${x => x.ariaRelevant}" aria-roledescription="${x => x.ariaRoledescription}" ${ref("control")}>${startSlotTemplate(options)}<span class="content" part="content"><slot ${slotted("defaultSlottedContent")}></slot></span>${endSlotTemplate(options)}</button>`;
}

var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
class Button extends FASTButton {
  constructor() {
    super(...arguments);
    this.iconOnly = false;
    this.disabledFocusable = false;
    this.handleDisabledFocusableClick = e => {
      if (e && this.disabledFocusable) {
        e.stopImmediatePropagation();
        return;
      }
    };
  }
  disabledFocusableChanged(prev, next) {
    if (!this.$fastController.isConnected) {
      return;
    }
    if (this.disabledFocusable) {
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("aria-disabled");
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleDisabledFocusableClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleDisabledFocusableClick);
  }
}
__decorateClass$g([attr], Button.prototype, "appearance", 2);
__decorateClass$g([attr], Button.prototype, "shape", 2);
__decorateClass$g([attr], Button.prototype, "size", 2);
__decorateClass$g([attr({
  attribute: "icon-only",
  mode: "boolean"
})], Button.prototype, "iconOnly", 2);
__decorateClass$g([attr({
  attribute: "disabled-focusable",
  mode: "boolean"
})], Button.prototype, "disabledFocusable", 2);

const template$n = buttonTemplate$1();

const definition$n = Button.compose({
  name: `${FluentDesignSystem.prefix}-button`,
  template: template$n,
  styles: styles$p,
  shadowOptions: {
    delegatesFocus: true
  }
});

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTCheckbox:class)} component.
 * @public
 */
function checkboxTemplate(options = {}) {
  return html`<template role="checkbox" aria-checked="${x => x.indeterminate ? "mixed" : x.checked}" aria-required="${x => x.required}" aria-disabled="${x => x.disabled}" tabindex="${x => x.disabled ? null : 0}" @keypress="${(x, c) => x.keypressHandler(c.event)}" @click="${(x, c) => x.clickHandler(c.event)}"><div part="control" class="control"><slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot><slot name="indeterminate-indicator">${staticallyCompose(options.indeterminateIndicator)}</slot></div><label part="label" class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"><slot ${slotted("defaultSlottedNodes")}></slot></label></template>`;
}

class _Checkbox extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 *
 * @beta
 */
class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual checkbox control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
class FASTCheckbox extends FormAssociatedCheckbox {
  constructor() {
    super();
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    this.initialValue = "on";
    /**
     * The indeterminate state of the control
     */
    this.indeterminate = false;
    /**
     * @internal
     */
    this.keypressHandler = e => {
      if (this.disabled) {
        return;
      }
      switch (e.key) {
        case keySpace:
          this.toggleChecked();
          break;
      }
    };
    /**
     * @internal
     */
    this.clickHandler = e => {
      if (!this.disabled) {
        this.toggleChecked();
      }
    };
    this.proxy.setAttribute("type", "checkbox");
  }
  toggleChecked() {
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.checked = !this.checked;
  }
}
__decorate([observable], FASTCheckbox.prototype, "defaultSlottedNodes", void 0);
__decorate([observable], FASTCheckbox.prototype, "indeterminate", void 0);

var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
class Checkbox extends FASTCheckbox {}
__decorateClass$f([attr], Checkbox.prototype, "shape", 2);
__decorateClass$f([attr], Checkbox.prototype, "size", 2);
__decorateClass$f([attr({
  attribute: "label-position"
})], Checkbox.prototype, "labelPosition", 2);

const CheckboxShape = {
  circular: "circular",
  square: "square"
};
const CheckboxSize = {
  medium: "medium",
  large: "large"
};
const CheckboxLabelPosition = {
  before: "before",
  after: "after"
};

const checkedIndicator = html.partial(`
    <div class="checked-indicator">
        <svg fill="currentColor" 
            aria-hidden="true" 
            width="1em" 
            height="1em" 
            viewBox="0 0 12 12" 
            xmlns="http://www.w3.org/2000/svg">
                <path d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z" fill="currentColor">
                </path>
        </svg>
    </div>
`);
const indeterminateIndicator = html.partial(`
    <div class="indeterminate-indicator"></div>
`);
const template$m = checkboxTemplate({
  checkedIndicator,
  indeterminateIndicator
});

const styles$l = css`
  ${display("inline-flex")}
  :host{align-items:center;outline:none;user-select:none;vertical-align:middle;cursor:pointer;font-family:${fontFamilyBase};font-size:${fontSizeBase300};line-height:${lineHeightBase300};color:${colorNeutralForeground3};position:relative}:host(:focus-visible)::after{content:'';position:absolute;inset:0px;cursor:pointer;border-radius:${borderRadiusMedium};outline:none;border:2px solid ${colorStrokeFocus1};box-shadow:inset 0 0 0 1px ${colorStrokeFocus2}}.control{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;align-items:center;justify-content:center;overflow:hidden;margin:${spacingVerticalS} ${spacingHorizontalS};fill:currentcolor;height:16px;width:16px;border:${strokeWidthThin} solid ${colorNeutralStrokeAccessible};border-radius:${borderRadiusSmall};outline:none}.label{align-self:center;cursor:inherit;padding-inline:${spacingHorizontalS};padding-bottom:${spacingVerticalS};padding-top:${spacingVerticalS}}.label__hidden{display:none;visibility:hidden}.checked-indicator{display:flex;align-items:center;justify-content:center;color:${colorNeutralForegroundInverted};font-size:12px;margin:auto;opacity:0}.indeterminate-indicator{position:absolute;width:8px;height:8px;border-radius:${borderRadiusSmall};background-color:${colorCompoundBrandForeground1};opacity:0}:host(:hover){color:${colorNeutralForeground2}}:host(:hover) .control{border-color:${colorNeutralStrokeAccessibleHover}}:host(:hover) .indeterminate-indicator{background-color:${colorCompoundBrandForeground1Hover}}:host(:active) .control{border-color:${colorNeutralStrokeAccessiblePressed}}:host(:active) .indeterminate-indicator{background-color:${colorCompoundBrandForeground1Pressed}}:host([aria-checked='true']),:host([aria-checked='mixed']),:host(:active){color:${colorNeutralForeground1}}:host([aria-checked='true']) .control{background-color:${colorCompoundBrandBackground}}:host([aria-checked='true']:hover) .control{border-color:${colorCompoundBrandStrokeHover};background-color:${colorCompoundBrandBackgroundHover}}:host([aria-checked='true']:active) .control{background-color:${colorCompoundBrandBackgroundPressed}}:host([aria-checked='mixed']:hover) .control{border-color:${colorCompoundBrandStrokeHover}}:host([aria-checked='true']) .checked-indicator,:host([aria-checked='mixed']) .indeterminate-indicator{opacity:1}:host([aria-checked='true']) .control,:host([aria-checked='mixed']) .control{border-color:${colorCompoundBrandStroke}}:host([aria-checked='mixed']:active) .control,:host([aria-checked='true']:active) .control{border-color:${colorCompoundBrandStrokePressed}}:host([label-position='before']){flex-direction:row-reverse}:host([label-position='before']) .label{padding-inline:${spacingHorizontalS} ${spacingHorizontalXS};padding-top:${spacingVerticalS};padding-bottom:${spacingVerticalS}}:host([size='large']) .control{width:20px;height:20px}:host([size='large']) .checked-indicator{font-size:16px;height:20px}:host([aria-checked='mixed'][size='large']) .indeterminate-indicator{height:10px;width:10px}:host([shape='circular']) .control,:host([shape='circular']) .indeterminate-indicator{border-radius:${borderRadiusCircular}}:host([disabled]) .control,:host([aria-checked='mixed'][disabled]) .control,:host([aria-checked='true'][disabled]) .control{background-color:${colorTransparentBackgroundHover};border-color:${colorNeutralStrokeDisabled}}:host([aria-checked='true'][disabled]) .checked-indicator,:host([disabled]) ::slotted([slot='start']),:host([disabled]) .label,:host([aria-checked='mixed'][disabled]) .label,:host([aria-checked='true'][disabled]) .label{color:${colorNeutralForegroundDisabled}}:host([disabled]) .indeterminate-indicator{background-color:${colorNeutralForegroundDisabled}}`;

const definition$m = Checkbox.compose({
  name: `${FluentDesignSystem.prefix}-checkbox`,
  template: template$m,
  styles: styles$l
});

class CompoundButton extends Button {}

const CompoundButtonAppearance = ButtonAppearance;
const CompoundButtonShape = ButtonShape;
const CompoundButtonSize = ButtonSize;

function buttonTemplate(options = {}) {
  return html`<button class="control" part="control" ?autofocus="${x => x.autofocus}" ?disabled="${x => x.disabled}" form="${x => x.formId}" formaction="${x => x.formaction}" formenctype="${x => x.formenctype}" formmethod="${x => x.formmethod}" ?formnovalidate="${x => x.formnovalidate}" formtarget="${x => x.formtarget}" name="${x => x.name}" type="${x => x.type}" value="${x => x.value}" aria-atomic="${x => x.ariaAtomic}" aria-busy="${x => x.ariaBusy}" aria-controls="${x => x.ariaControls}" aria-current="${x => x.ariaCurrent}" aria-describedby="${x => x.ariaDescribedby}" aria-details="${x => x.ariaDetails}" aria-disabled="${x => x.ariaDisabled}" aria-errormessage="${x => x.ariaErrormessage}" aria-expanded="${x => x.ariaExpanded}" aria-flowto="${x => x.ariaFlowto}" aria-haspopup="${x => x.ariaHaspopup}" aria-hidden="${x => x.ariaHidden}" aria-invalid="${x => x.ariaInvalid}" aria-keyshortcuts="${x => x.ariaKeyshortcuts}" aria-label="${x => x.ariaLabel}" aria-labelledby="${x => x.ariaLabelledby}" aria-live="${x => x.ariaLive}" aria-owns="${x => x.ariaOwns}" aria-pressed="${x => x.ariaPressed}" aria-relevant="${x => x.ariaRelevant}" aria-roledescription="${x => x.ariaRoledescription}" ${ref("control")}>${startSlotTemplate(options)}<span class="content" part="content"><slot ${slotted("defaultSlottedContent")}></slot><slot name="description"></slot></span>${endSlotTemplate(options)}</button>`;
}
const template$l = buttonTemplate();

const styles$k = css`
  ${styles$p}

  :host .control,:host(:is([size])) .control{gap:12px;height:auto;padding-top:14px;padding-inline:12px;padding-bottom:16px;font-size:${fontSizeBase300};line-height:${lineHeightBase300}}.content{display:flex;flex-direction:column;text-align:start}::slotted([slot='description']){color:${colorNeutralForeground2};line-height:100%;font-size:${fontSizeBase200};font-weight:${fontWeightRegular}}::slotted(svg),:host([size='large']) ::slotted(svg){font-size:40px;height:40px;width:40px}:host(:hover) ::slotted([slot='description']){color:${colorNeutralForeground2Hover}}:host(:active) ::slotted([slot='description']){color:${colorNeutralForeground2Pressed}}:host(:is([appearance='primary'],[appearance='primary']:hover,[appearance='primary']:active))
    ::slotted([slot='description']){color:${colorNeutralForegroundOnBrand}}:host(:is([appearance='subtle'],[appearance='subtle']:hover,[appearance='subtle']:active))
    ::slotted([slot='description']),:host([appearance='transparent']) ::slotted([slot='description']){color:${colorNeutralForeground2}}:host([appearance='transparent']:hover) ::slotted([slot='description']){color:${colorNeutralForeground2BrandHover}}:host([appearance='transparent']:active) ::slotted([slot='description']){color:${colorNeutralForeground2BrandPressed}}:host(:is([disabled],[disabled][appearance],[disabled-focusable],[disabled-focusable][appearance]))
    ::slotted([slot='description']){color:${colorNeutralForegroundDisabled}}:host([size='small']) .control{padding:8px;padding-bottom:10px}:host([icon-only]) .control{min-width:52px;max-width:52px;padding:${spacingHorizontalSNudge}}:host([icon-only][size='small']) .control{min-width:48px;max-width:48px;padding:${spacingHorizontalXS}}:host([icon-only][size='large']) .control{min-width:56px;max-width:56px;padding:${spacingHorizontalS}}:host([size='large']) .control{padding-top:18px;padding-inline:16px;padding-bottom:20px;font-size:${fontSizeBase400};line-height:${lineHeightBase400}}:host([size='large']) ::slotted([slot='description']){font-size:${fontSizeBase300}}`;

const definition$l = CompoundButton.compose({
  name: `${FluentDesignSystem.prefix}-compound-button`,
  template: template$l,
  styles: styles$k,
  shadowOptions: {
    delegatesFocus: true
  }
});

var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
class CounterBadge extends FASTElement {
  constructor() {
    super(...arguments);
    this.count = 0;
    this.overflowCount = 99;
    this.showZero = false;
    this.dot = false;
  }
  countChanged() {
    this.setCount();
  }
  overflowCountChanged() {
    this.setCount();
  }
  setCount() {
    var _a;
    const count = (_a = this.count) != null ? _a : 0;
    if ((count !== 0 || this.showZero) && !this.dot) {
      return count > this.overflowCount ? `${this.overflowCount}+` : `${count}`;
    }
    return;
  }
}
__decorateClass$e([attr], CounterBadge.prototype, "appearance", 2);
__decorateClass$e([attr], CounterBadge.prototype, "color", 2);
__decorateClass$e([attr], CounterBadge.prototype, "shape", 2);
__decorateClass$e([attr], CounterBadge.prototype, "size", 2);
__decorateClass$e([attr({
  converter: nullableNumberConverter
})], CounterBadge.prototype, "count", 2);
__decorateClass$e([attr({
  attribute: "overflow-count",
  converter: nullableNumberConverter
})], CounterBadge.prototype, "overflowCount", 2);
__decorateClass$e([attr({
  attribute: "show-zero",
  mode: "boolean"
})], CounterBadge.prototype, "showZero", 2);
__decorateClass$e([attr({
  mode: "boolean"
})], CounterBadge.prototype, "dot", 2);
applyMixins(CounterBadge, StartEnd);

const CounterBadgeAppearance = {
  filled: "filled",
  ghost: "ghost"
};
const CounterBadgeColor = {
  brand: "brand",
  danger: "danger",
  important: "important",
  informative: "informative",
  severe: "severe",
  subtle: "subtle",
  success: "success",
  warning: "warning"
};
const CounterBadgeShape = {
  circular: "circular",
  rounded: "rounded"
};
const CounterBadgeSize = {
  tiny: "tiny",
  extraSmall: "extra-small",
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extra-large"
};

function composeTemplate(options = {}) {
  return badgeTemplate({
    defaultContent: html`${x => x.setCount()}`
  });
}
const template$k = composeTemplate();

const styles$j = css`
  :host([shape='rounded']){border-radius:${borderRadiusMedium}}:host([shape='rounded'][size='tiny']),:host([shape='rounded'][size='extra-small']),:host([shape='rounded'][size='small']){border-radius:${borderRadiusSmall}}${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeBaseStyles}

  :host([dot]),:host([dot][appearance][size]){min-width:auto;width:6px;height:6px;padding:0}`;

const definition$k = CounterBadge.compose({
  name: `${FluentDesignSystem.prefix}-counter-badge`,
  template: template$k,
  styles: styles$j
});

/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};
var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;

  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.

  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
  if (!displayCheck || displayCheck === 'full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled
    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (nodeIsAttached) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    } // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  } // visible, as far as we can tell, or per current `displayCheck` mode

  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset

var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        } // the disabled <fieldset> containing `node` has no <legend>

        return true;
      }
      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state

  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};

const DialogModalType = {
  modal: "modal",
  nonModal: "non-modal",
  alert: "alert"
};

var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
const _Dialog = class extends FASTElement {
  constructor() {
    super(...arguments);
    this.isTrappingFocus = false;
    this.titleAction = [];
    this.modalType = DialogModalType.modal;
    this.open = false;
    this.noTitleAction = false;
    this.trapFocus = false;
    this.onOpenChangeEvent = (dismissed = false) => {
      this.$emit("onOpenChange", {
        open: this.dialog.open,
        dismissed
      });
    };
    this.handleKeydown = e => {
      if (e.defaultPrevented) {
        return;
      }
      switch (e.key) {
        case keyEscape:
          if (this.modalType !== DialogModalType.alert) {
            this.hide(true);
            this.$emit("dismiss");
          }
          break;
        default:
          return true;
      }
    };
    this.handleDocumentKeydown = e => {
      if (!e.defaultPrevented && this.dialog.open) {
        switch (e.key) {
          case keyTab:
            this.handleTabKeyDown(e);
            break;
        }
      }
    };
    this.handleTabKeyDown = e => {
      if (!this.trapFocus || !this.dialog.open) {
        return;
      }
      const bounds = this.getTabQueueBounds();
      if (bounds.length === 1) {
        bounds[0].focus();
        e.preventDefault();
        return;
      }
      if (e.shiftKey && e.target === bounds[0]) {
        bounds[bounds.length - 1].focus();
        e.preventDefault();
      } else if (!e.shiftKey && e.target === bounds[bounds.length - 1]) {
        bounds[0].focus();
        e.preventDefault();
      }
      return;
    };
    this.getTabQueueBounds = () => {
      const bounds = [];
      return _Dialog.reduceTabbableItems(bounds, this);
    };
    this.focusFirstElement = () => {
      const bounds = this.getTabQueueBounds();
      if (bounds.length > 0) {
        bounds[0].focus();
      } else {
        if (this.dialog instanceof HTMLElement) {
          this.dialog.focus();
        }
      }
    };
    this.shouldForceFocus = currentFocusElement => {
      return this.isTrappingFocus && !this.contains(currentFocusElement);
    };
    this.shouldTrapFocus = () => {
      return this.trapFocus && this.dialog.open;
    };
    this.handleDocumentFocus = e => {
      if (!e.defaultPrevented && this.shouldForceFocus(e.target)) {
        this.focusFirstElement();
        e.preventDefault();
      }
    };
    this.updateTrapFocus = shouldTrapFocusOverride => {
      const shouldTrapFocus = shouldTrapFocusOverride === void 0 ? this.shouldTrapFocus() : shouldTrapFocusOverride;
      if (shouldTrapFocus && !this.isTrappingFocus) {
        this.isTrappingFocus = true;
        document.addEventListener("focusin", this.handleDocumentFocus);
        Updates.enqueue(() => {
          if (this.shouldForceFocus(document.activeElement)) {
            this.focusFirstElement();
          }
        });
      } else if (!shouldTrapFocus && this.isTrappingFocus) {
        this.isTrappingFocus = false;
        document.removeEventListener("focusin", this.handleDocumentFocus);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleDocumentKeydown);
    Updates.enqueue(() => {
      this.updateTrapFocus();
      this.setComponent();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeydown);
    this.updateTrapFocus(false);
  }
  openChanged(oldValue, newValue) {
    if (newValue !== oldValue) {
      if (newValue && !oldValue) {
        this.show();
      } else if (!newValue && oldValue) {
        this.hide();
      }
    }
  }
  modalTypeChanged(oldValue, newValue) {
    if (newValue !== oldValue) {
      if (newValue == DialogModalType.alert || newValue == DialogModalType.modal) {
        this.trapFocus = true;
      } else {
        this.trapFocus = false;
      }
    }
  }
  setComponent() {
    if (this.modalType == DialogModalType.modal || this.modalType == DialogModalType.alert) {
      this.trapFocus = true;
    } else {
      this.trapFocus = false;
    }
  }
  show() {
    Updates.enqueue(() => {
      if (this.modalType === DialogModalType.alert || this.modalType === DialogModalType.modal) {
        this.dialog.showModal();
        this.open = true;
        this.updateTrapFocus(true);
      } else if (this.modalType === DialogModalType.nonModal) {
        this.dialog.show();
        this.open = true;
      }
      this.onOpenChangeEvent();
    });
  }
  hide(dismissed = false) {
    this.dialog.close();
    this.open = false;
    this.onOpenChangeEvent(dismissed);
  }
  dismiss() {
    if (this.modalType === DialogModalType.alert) {
      return;
    }
    this.hide(true);
  }
  handleClick(event) {
    event.preventDefault();
    if (this.dialog.open && this.modalType !== DialogModalType.alert && event.target === this.dialog) {
      this.dismiss();
    }
    return true;
  }
  static reduceTabbableItems(elements, element) {
    if (element.getAttribute("tabindex") === "-1") {
      return elements;
    }
    if (isTabbable(element) || _Dialog.isFocusableFastElement(element) && _Dialog.hasTabbableShadow(element)) {
      elements.push(element);
      return elements;
    }
    return Array.from(element.children).reduce((elements2, currentElement) => _Dialog.reduceTabbableItems(elements2, currentElement), elements);
  }
  static isFocusableFastElement(element) {
    var _a, _b;
    return !!((_b = (_a = element.$fastController) == null ? void 0 : _a.definition.shadowOptions) == null ? void 0 : _b.delegatesFocus);
  }
  static hasTabbableShadow(element) {
    var _a, _b;
    return Array.from((_b = (_a = element.shadowRoot) == null ? void 0 : _a.querySelectorAll("*")) != null ? _b : []).some(x => {
      return isTabbable(x);
    });
  }
};
let Dialog = _Dialog;
__decorateClass$d([observable], Dialog.prototype, "dialog", 2);
__decorateClass$d([observable], Dialog.prototype, "titleAction", 2);
__decorateClass$d([observable], Dialog.prototype, "defaultTitleAction", 2);
__decorateClass$d([attr({
  attribute: "aria-describedby"
})], Dialog.prototype, "ariaDescribedby", 2);
__decorateClass$d([attr({
  attribute: "aria-labelledby"
})], Dialog.prototype, "ariaLabelledby", 2);
__decorateClass$d([attr({
  attribute: "modal-type"
})], Dialog.prototype, "modalType", 2);
__decorateClass$d([attr({
  mode: "boolean"
})], Dialog.prototype, "open", 2);
__decorateClass$d([attr({
  mode: "boolean",
  attribute: "no-title-action"
})], Dialog.prototype, "noTitleAction", 2);

const dismissed16Regular = html.partial(`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>`);
const template$j = html`<template ?open="${x => x.open}"><dialog role="${x => x.modalType === DialogModalType.alert ? "alertdialog" : "dialog"}" modal-type="${x => x.modalType}" class="dialog" part="dialog" aria-modal="${x => x.modalType === DialogModalType.modal || x.modalType === DialogModalType.alert ? "true" : void 0}" aria-describedby="${x => x.ariaDescribedby}" aria-labelledby="${x => x.ariaLabelledby}" aria-label="${x => x.ariaLabel}" @keydown="${(x, c) => x.handleKeydown(c.event)}" @click="${(x, c) => x.handleClick(c.event)}" ${ref("dialog")}><div class="root" part="root"><div class="title" part="title"><slot name="title"></slot><slot ${slotted({
  property: "titleAction",
  filter: elements()
})} name="title-action"></slot>${when(x => x.modalType === DialogModalType.nonModal && x.titleAction.length === 0 && !x.noTitleAction, html`<fluent-button tabindex="0" part="title-action" class="title-action" appearance="transparent" icon-only @click=${x => x.dismiss()} ${ref("defaultTitleAction")}>${dismissed16Regular}</fluent-button>`)}</div><div class="content" part="content"><slot></slot></div><div class="actions" part="actions"><slot name="action"></slot></div></div></dialog></template>`;

const sides = ['top', 'right', 'bottom', 'left'];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}
const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

/**
 * Divider roles
 * @public
 */
const DividerRole = {
  /**
   * The divider semantically separates content
   */
  separator: "separator",
  /**
   * The divider has no semantic value and is for visual presentation only.
   */
  presentation: "presentation"
};
/**
 * Divider orientation
 * @public
 */
const DividerOrientation = Orientation;

/**
 * The template for the {@link @microsoft/fast-foundation#FASTDivider} component.
 * @public
 */
function dividerTemplate() {
  return html`<template role="${x => x.role}" aria-orientation="${x => x.role !== DividerRole.presentation ? x.orientation : void 0}"><slot></slot></template>`;
}

/**
 * A Divider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#separator | ARIA separator } or {@link https://www.w3.org/TR/wai-aria-1.1/#presentation | ARIA presentation}.
 *
 * @public
 */
class FASTDivider extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    this.role = DividerRole.separator;
    /**
     * The orientation of the divider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    this.orientation = DividerOrientation.horizontal;
  }
}
__decorate([attr], FASTDivider.prototype, "role", void 0);
__decorate([attr], FASTDivider.prototype, "orientation", void 0);

/**
 * Menu items roles.
 * @public
 */
const MenuItemRole = {
  /**
   * The menu item has a "menuitem" role
   */
  menuitem: "menuitem",
  /**
   * The menu item has a "menuitemcheckbox" role
   */
  menuitemcheckbox: "menuitemcheckbox",
  /**
   * The menu item has a "menuitemradio" role
   */
  menuitemradio: "menuitemradio"
};
/**
 * @internal
 */
({
  [MenuItemRole.menuitem]: "menuitem",
  [MenuItemRole.menuitemcheckbox]: "menuitemcheckbox",
  [MenuItemRole.menuitemradio]: "menuitemradio"
});

/**
 * Generates a template for the {@link @microsoft/fast-foundation#(FASTMenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
function menuItemTemplate(options = {}) {
  return html`<template aria-haspopup="${x => x.hasSubmenu ? "menu" : void 0}" aria-checked="${x => x.role !== MenuItemRole.menuitem ? x.checked : void 0}" aria-disabled="${x => x.disabled}" aria-expanded="${x => x.expanded}" @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event)}" @click="${(x, c) => x.handleMenuItemClick(c.event)}" @mouseover="${(x, c) => x.handleMouseOver(c.event)}" @mouseout="${(x, c) => x.handleMouseOut(c.event)}">${when(x => x.role === MenuItemRole.menuitemcheckbox, html`<div part="input-container" class="input-container"><span part="checkbox" class="checkbox"><slot name="checkbox-indicator">${staticallyCompose(options.checkboxIndicator)}</slot></span></div>`)} ${when(x => x.role === MenuItemRole.menuitemradio, html`<div part="input-container" class="input-container"><span part="radio" class="radio"><slot name="radio-indicator">${staticallyCompose(options.radioIndicator)}</slot></span></div>`)}</div>${startSlotTemplate(options)}<span class="content" part="content"><slot></slot></span>${endSlotTemplate(options)} ${when(x => x.hasSubmenu, html`<div part="expand-collapse-glyph-container" class="expand-collapse-glyph-container"><span part="expand-collapse" class="expand-collapse"><slot name="expand-collapse-indicator">${staticallyCompose(options.expandCollapseGlyph)}</slot></span></div>`)}<span ?hidden="${x => !x.expanded}" class="submenu-container" part="submenu-container" ${ref("submenuContainer")}><slot name="submenu" ${slotted({
    property: "slottedSubmenu",
    filter: elements("[role='menu']")
  })}></slot></span></template>`;
}

/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot radio-indicator - The radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot - The default slot for menu item content
 * @slot expand-collapse-indicator - The expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart input-container - The element representing the visual checked or radio indicator
 * @csspart checkbox - The element wrapping the `menuitemcheckbox` indicator
 * @csspart radio - The element wrapping the `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart expand-collapse-glyph-container - The element wrapping the expand collapse element
 * @csspart expand-collapse - The expand/collapse element
 * @csspart submenu-region - The container for the submenu, used for positioning
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
class FASTMenuItem extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    this.role = MenuItemRole.menuitem;
    /**
     * The checked value of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: checked
     */
    this.checked = false;
    this.focusSubmenuOnLoad = false;
    /**
     * @internal
     */
    this.handleMenuItemKeyDown = e => {
      if (e.defaultPrevented) {
        return false;
      }
      switch (e.key) {
        case keyEnter:
        case keySpace:
          this.invoke();
          return false;
        case keyArrowRight:
          //open/focus on submenu
          this.expanded && this.submenu ? this.submenu.focus() : this.expandAndFocus();
          return false;
        case keyEscape:
          // close submenu
          if (this.expanded) {
            this.closeSubMenu();
            return false;
          }
          break;
        case keyArrowLeft:
          //close submenu
          if (this.expanded) {
            this.closeSubMenu();
            return false;
          }
      }
      return true;
    };
    /**
     * @internal
     */
    this.handleMenuItemClick = e => {
      if (e.defaultPrevented || this.disabled) {
        return false;
      }
      this.invoke();
      return false;
    };
    /**
     * @internal
     */
    this.submenuLoaded = () => {
      if (!this.focusSubmenuOnLoad) {
        return;
      }
      this.focusSubmenuOnLoad = false;
      if (this.submenu) {
        this.submenu.focus();
        this.setAttribute("tabindex", "-1");
      }
    };
    /**
     * @internal
     */
    this.handleMouseOver = e => {
      if (this.disabled || !this.hasSubmenu || this.expanded) {
        return false;
      }
      this.expanded = true;
      return false;
    };
    /**
     * @internal
     */
    this.handleMouseOut = e => {
      if (!this.expanded || this.contains(document.activeElement)) {
        return false;
      }
      this.expanded = false;
      return false;
    };
    /**
     * @internal
     */
    this.closeSubMenu = () => {
      // close submenu
      this.expanded = false;
      this.focus();
    };
    /**
     * @internal
     */
    this.expandAndFocus = () => {
      if (!this.hasSubmenu) {
        return;
      }
      this.focusSubmenuOnLoad = true;
      this.expanded = true;
    };
    /**
     * @internal
     */
    this.invoke = () => {
      if (this.disabled) {
        return;
      }
      switch (this.role) {
        case MenuItemRole.menuitemcheckbox:
          this.checked = !this.checked;
          break;
        case MenuItemRole.menuitem:
          if (this.hasSubmenu) {
            this.expandAndFocus();
            break;
          }
          this.$emit("change");
          break;
        case MenuItemRole.menuitemradio:
          if (!this.checked) {
            this.checked = true;
          }
          break;
      }
    };
  }
  expandedChanged(prev, next) {
    if (this.$fastController.isConnected) {
      if (next && this.submenu) {
        this.updateSubmenu();
      }
      this.$emit("expanded-change", this, {
        bubbles: false
      });
    }
  }
  checkedChanged(oldValue, newValue) {
    if (this.$fastController.isConnected) {
      this.$emit("change");
    }
  }
  /**
   * @internal
   */
  get hasSubmenu() {
    return !!this.submenu;
  }
  /**
   * Sets the submenu and updates its position.
   *
   * @internal
   */
  slottedSubmenuChanged(prev, next) {
    if (next.length) {
      this.submenu = next[0];
      this.updateSubmenu();
    }
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var _a;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    super.disconnectedCallback();
  }
  /**
   * Calculate and apply submenu positioning.
   *
   * @public
   */
  updateSubmenu() {
    var _a;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    if (!this.submenu || !this.expanded) {
      return;
    }
    Updates.enqueue(() => {
      this.cleanup = autoUpdate(this, this.submenuContainer, () => __awaiter(this, void 0, void 0, function* () {
        const fallbackPlacements = ["left-start", "right-start"];
        const {
          x,
          y
        } = yield computePosition(this, this.submenuContainer, {
          middleware: [shift(), size({
            apply: ({
              availableWidth,
              rects
            }) => {
              if (availableWidth < rects.floating.width) {
                fallbackPlacements.push("bottom-end", "top-end");
              }
            }
          }), flip({
            fallbackPlacements
          })],
          placement: "right-start",
          strategy: "fixed"
        });
        Object.assign(this.submenuContainer.style, {
          left: `${x}px`,
          position: "fixed",
          top: `${y}px`
        });
        this.submenuLoaded();
      }));
    });
  }
}
__decorate([attr({
  mode: "boolean"
})], FASTMenuItem.prototype, "disabled", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTMenuItem.prototype, "expanded", void 0);
__decorate([attr], FASTMenuItem.prototype, "role", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTMenuItem.prototype, "checked", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTMenuItem.prototype, "hidden", void 0);
__decorate([observable], FASTMenuItem.prototype, "slottedSubmenu", void 0);
__decorate([observable], FASTMenuItem.prototype, "submenu", void 0);
applyMixins$1(FASTMenuItem, StartEnd);

/**
 * The template for the {@link @microsoft/fast-foundation#FASTMenu} component.
 * @public
 */
function menuTemplate$1() {
  return html`<template slot="${x => x.slot ? x.slot : x.isNestedMenu() ? "submenu" : void 0}" role="menu" @keydown="${(x, c) => x.handleMenuKeyDown(c.event)}" @focusout="${(x, c) => x.handleFocusOut(c.event)}"><slot ${slotted("items")}></slot></template>`;
}

/**
 * A Menu Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
class FASTMenu extends FASTElement {
  constructor() {
    super(...arguments);
    this.expandedItem = null;
    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    this.focusIndex = -1;
    /**
     * @internal
     */
    this.isNestedMenu = () => {
      return this.parentElement !== null && isHTMLElement$1(this.parentElement) && this.parentElement.getAttribute("role") === "menuitem";
    };
    /**
     * if focus is moving out of the menu, reset to a stable initial state
     * @internal
     */
    this.handleFocusOut = e => {
      if (!this.contains(e.relatedTarget) && this.menuItems !== undefined) {
        this.collapseExpandedItem();
        // find our first focusable element
        const focusIndex = this.menuItems.findIndex(this.isFocusableElement);
        // set the current focus index's tabindex to -1
        this.menuItems[this.focusIndex].setAttribute("tabindex", "-1");
        // set the first focusable element tabindex to 0
        this.menuItems[focusIndex].setAttribute("tabindex", "0");
        // set the focus index
        this.focusIndex = focusIndex;
      }
    };
    this.handleItemFocus = e => {
      const targetItem = e.target;
      if (this.menuItems !== undefined && targetItem !== this.menuItems[this.focusIndex]) {
        this.menuItems[this.focusIndex].setAttribute("tabindex", "-1");
        this.focusIndex = this.menuItems.indexOf(targetItem);
        targetItem.setAttribute("tabindex", "0");
      }
    };
    this.handleExpandedChanged = e => {
      if (e.defaultPrevented || e.target === null || this.menuItems === undefined || this.menuItems.indexOf(e.target) < 0) {
        return;
      }
      e.preventDefault();
      const changedItem = e.target;
      // closing an expanded item without opening another
      if (this.expandedItem !== null && changedItem === this.expandedItem && changedItem.expanded === false) {
        this.expandedItem = null;
        return;
      }
      if (changedItem.expanded) {
        if (this.expandedItem !== null && this.expandedItem !== changedItem) {
          this.expandedItem.expanded = false;
        }
        this.menuItems[this.focusIndex].setAttribute("tabindex", "-1");
        this.expandedItem = changedItem;
        this.focusIndex = this.menuItems.indexOf(changedItem);
        changedItem.setAttribute("tabindex", "0");
      }
    };
    /**
     * handle change from child element
     */
    this.changeHandler = e => {
      if (this.menuItems === undefined) {
        return;
      }
      const changedMenuItem = e.target;
      const changeItemIndex = this.menuItems.indexOf(changedMenuItem);
      if (changeItemIndex === -1) {
        return;
      }
      if (changedMenuItem.role === "menuitemradio" && changedMenuItem.checked === true) {
        for (let i = changeItemIndex - 1; i >= 0; --i) {
          const item = this.menuItems[i];
          const role = item.getAttribute("role");
          if (role === MenuItemRole.menuitemradio) {
            item.checked = false;
          }
          if (role === "separator") {
            break;
          }
        }
        const maxIndex = this.menuItems.length - 1;
        for (let i = changeItemIndex + 1; i <= maxIndex; ++i) {
          const item = this.menuItems[i];
          const role = item.getAttribute("role");
          if (role === MenuItemRole.menuitemradio) {
            item.checked = false;
          }
          if (role === "separator") {
            break;
          }
        }
      }
    };
    /**
     * check if the item is a menu item
     */
    this.isMenuItemElement = el => {
      return el instanceof FASTMenuItem || isHTMLElement$1(el) && el.getAttribute("role") in FASTMenu.focusableElementRoles;
    };
    /**
     * check if the item is focusable
     */
    this.isFocusableElement = el => {
      return this.isMenuItemElement(el);
    };
  }
  itemsChanged(oldValue, newValue) {
    // only update children after the component is connected and
    // the setItems has run on connectedCallback
    // (menuItems is undefined until then)
    if (this.$fastController.isConnected && this.menuItems !== undefined) {
      this.setItems();
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    Updates.enqueue(() => {
      // wait until children have had a chance to
      // connect before setting/checking their props/attributes
      this.setItems();
    });
    this.addEventListener("change", this.changeHandler);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeItemListeners();
    this.menuItems = undefined;
    this.removeEventListener("change", this.changeHandler);
  }
  /**
   * Focuses the first item in the menu.
   *
   * @public
   */
  focus() {
    this.setFocus(0, 1);
  }
  /**
   * Collapses any expanded menu items.
   *
   * @public
   */
  collapseExpandedItem() {
    if (this.expandedItem !== null) {
      this.expandedItem.expanded = false;
      this.expandedItem = null;
    }
  }
  /**
   * @internal
   */
  handleMenuKeyDown(e) {
    if (e.defaultPrevented || this.menuItems === undefined) {
      return;
    }
    switch (e.key) {
      case keyArrowDown:
        // go forward one index
        this.setFocus(this.focusIndex + 1, 1);
        return;
      case keyArrowUp:
        // go back one index
        this.setFocus(this.focusIndex - 1, -1);
        return;
      case keyEnd:
        // set focus on last item
        this.setFocus(this.menuItems.length - 1, -1);
        return;
      case keyHome:
        // set focus on first item
        this.setFocus(0, 1);
        return;
      default:
        // if we are not handling the event, do not prevent default
        return true;
    }
  }
  removeItemListeners(items = this.items) {
    items.forEach(item => {
      item.removeEventListener("focus", this.handleItemFocus);
      item.removeEventListener("expanded-changed", this.handleExpandedChanged);
      Observable.getNotifier(item).unsubscribe(this, "hidden");
    });
  }
  setItems() {
    const children = Array.from(this.children);
    this.removeItemListeners(children);
    children.forEach(child => Observable.getNotifier(child).subscribe(this, "hidden"));
    const newItems = children.filter(child => !child.hasAttribute("hidden"));
    this.menuItems = newItems;
    const menuItems = this.menuItems.filter(this.isMenuItemElement);
    // if our focus index is not -1 we have items
    if (menuItems.length) {
      this.focusIndex = 0;
    }
    menuItems.forEach((item, index) => {
      item.setAttribute("tabindex", index === 0 ? "0" : "-1");
      item.addEventListener("expanded-change", this.handleExpandedChanged);
      item.addEventListener("focus", this.handleItemFocus);
    });
  }
  handleChange(source, propertyName) {
    if (propertyName === "hidden") {
      this.setItems();
    }
  }
  setFocus(focusIndex, adjustment) {
    if (this.menuItems === undefined) {
      return;
    }
    while (focusIndex >= 0 && focusIndex < this.menuItems.length) {
      const child = this.menuItems[focusIndex];
      if (this.isFocusableElement(child)) {
        // change the previous index to -1
        if (this.focusIndex > -1 && this.menuItems.length >= this.focusIndex - 1) {
          this.menuItems[this.focusIndex].setAttribute("tabindex", "-1");
        }
        // update the focus index
        this.focusIndex = focusIndex;
        // update the tabindex of next focusable element
        child.setAttribute("tabindex", "0");
        // focus the element
        child.focus();
        break;
      }
      focusIndex += adjustment;
    }
  }
}
FASTMenu.focusableElementRoles = MenuItemRole;
__decorate([observable], FASTMenu.prototype, "items", void 0);

class _TextField extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 *
 * @beta
 */
class FormAssociatedTextField extends FormAssociated(_TextField) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * Text field sub-types
 * @public
 */
const TextFieldType = {
  /**
   * An email TextField
   */
  email: "email",
  /**
   * A password TextField
   */
  password: "password",
  /**
   * A telephone TextField
   */
  tel: "tel",
  /**
   * A text TextField
   */
  text: "text",
  /**
   * A URL TextField
   */
  url: "url"
};

/**
 * A Text Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text | <input type="text" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The text field element
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
class FASTTextField extends FormAssociatedTextField {
  constructor() {
    super(...arguments);
    /**
     * Allows setting a type or mode of text.
     * @public
     * @remarks
     * HTML Attribute: type
     */
    this.type = TextFieldType.text;
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
      this.validate();
    }
  }
  autofocusChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.autofocus = this.autofocus;
      this.validate();
    }
  }
  placeholderChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.placeholder = this.placeholder;
    }
  }
  typeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
      this.validate();
    }
  }
  listChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.setAttribute("list", this.list);
      this.validate();
    }
  }
  maxlengthChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.maxLength = this.maxlength;
      this.validate();
    }
  }
  minlengthChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.minLength = this.minlength;
      this.validate();
    }
  }
  patternChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.pattern = this.pattern;
      this.validate();
    }
  }
  sizeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.size = this.size;
    }
  }
  spellcheckChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.spellcheck = this.spellcheck;
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute("type", this.type);
    this.validate();
    if (this.autofocus) {
      Updates.enqueue(() => {
        this.focus();
      });
    }
  }
  /**
   * Selects all the text in the text field
   *
   * @public
   */
  select() {
    this.control.select();
    /**
     * The select event does not permeate the shadow DOM boundary.
     * This fn effectively proxies the select event,
     * emitting a `select` event whenever the internal
     * control emits a `select` event
     */
    this.$emit("select");
  }
  /**
   * Handles the internal control's `input` event
   * @internal
   */
  handleTextInput() {
    this.value = this.control.value;
  }
  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  handleChange() {
    this.$emit("change");
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
}
__decorate([attr({
  attribute: "readonly",
  mode: "boolean"
})], FASTTextField.prototype, "readOnly", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTTextField.prototype, "autofocus", void 0);
__decorate([attr], FASTTextField.prototype, "placeholder", void 0);
__decorate([attr], FASTTextField.prototype, "type", void 0);
__decorate([attr], FASTTextField.prototype, "list", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTTextField.prototype, "maxlength", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTTextField.prototype, "minlength", void 0);
__decorate([attr], FASTTextField.prototype, "pattern", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTTextField.prototype, "size", void 0);
__decorate([attr({
  mode: "boolean"
})], FASTTextField.prototype, "spellcheck", void 0);
__decorate([observable], FASTTextField.prototype, "defaultSlottedNodes", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
class DelegatesARIATextbox {}
applyMixins$1(DelegatesARIATextbox, ARIAGlobalStatesAndProperties);
applyMixins$1(FASTTextField, StartEnd, DelegatesARIATextbox);

/**
 * A base class for progress components.
 * @public
 */
class FASTBaseProgress extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * Indicates progress in %
     * @internal
     */
    this.percentComplete = 0;
  }
  valueChanged() {
    this.updatePercentComplete();
  }
  minChanged() {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }
  maxChanged() {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.updatePercentComplete();
  }
  updatePercentComplete() {
    const min = typeof this.min === "number" ? this.min : 0;
    const max = typeof this.max === "number" ? this.max : 100;
    const value = typeof this.value === "number" ? this.value : 0;
    const range = max - min;
    this.percentComplete = range === 0 ? 0 : Math.fround((value - min) / range * 100);
  }
}
__decorate([attr({
  converter: nullableNumberConverter
})], FASTBaseProgress.prototype, "value", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTBaseProgress.prototype, "min", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTBaseProgress.prototype, "max", void 0);
__decorate([observable], FASTBaseProgress.prototype, "percentComplete", void 0);

/**
 * An circular Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @slot determinate - The slot for a custom determinate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart background - The background
 *
 * @public
 */
class FASTProgressRing extends FASTBaseProgress {}

const progressSegments = 44;
/**
 * The template for the {@link @microsoft/fast-foundation#FASTProgressRing} component.
 * @public
 */
function progressRingTemplate(options = {}) {
  return html`<template role="progressbar" aria-valuenow="${x => x.value}" aria-valuemin="${x => x.min}" aria-valuemax="${x => x.max}">${when(x => typeof x.value === "number", html`<svg class="progress" part="progress" viewBox="0 0 16 16" slot="determinate"><circle class="background" part="background" cx="8px" cy="8px" r="7px"></circle><circle class="determinate" part="determinate" style="stroke-dasharray: ${x => progressSegments * x.percentComplete / 100}px ${progressSegments}px" cx="8px" cy="8px" r="7px"></circle></svg>`, html`<slot name="indeterminate">${staticallyCompose(options.indeterminateIndicator)}</slot>`)}</template>`;
}

/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart indeterminate - The indeterminate indicator
 *
 * @public
 */
class FASTProgress extends FASTBaseProgress {}

/**
 * The template for the {@link @microsoft/fast-foundation#FASTProgress} component.
 * @public
 */
function progressTemplate(options = {}) {
  return html`<template role="progressbar" aria-valuenow="${x => x.value}" aria-valuemin="${x => x.min}" aria-valuemax="${x => x.max}">${when(x => typeof x.value === "number", html`<div class="progress" part="progress" slot="determinate"><div class="determinate" part="determinate" style="width: ${x => x.percentComplete}%"></div></div>`, html`<div class="progress" part="progress" slot="indeterminate"><slot name="indeterminate">${staticallyCompose(options.indeterminateIndicator1)} ${staticallyCompose(options.indeterminateIndicator2)}</slot></div>`)}</template>`;
}

/**
 * Radio Group orientation
 * @public
 */
const RadioGroupOrientation = Orientation;

/**
 * The template for the {@link @microsoft/fast-foundation#FASTRadioGroup} component.
 * @public
 */
function radioGroupTemplate() {
  return html`<template role="radiogroup" tabindex="${x => x.disabled ? -1 : void 0}" aria-disabled="${x => x.disabled}" aria-readonly="${x => x.readOnly}" aria-orientation="${x => x.orientation}" @click="${(x, c) => x.clickHandler(c.event)}" @mousedown="${(x, c) => x.handleDisabledClick(c.event)}" @keydown="${(x, c) => x.keydownHandler(c.event)}" @focusout="${(x, c) => x.focusOutHandler(c.event)}"><slot name="label"></slot><div class="positioning-region ${x => x.orientation === RadioGroupOrientation.horizontal ? "horizontal" : "vertical"}" part="positioning-region"><slot ${slotted({
    property: "slottedRadioButtons",
    filter: elements("[role=radio]")
  })}></slot></div></template>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTRadio:class)} component.
 * @public
 */
function radioTemplate(options = {}) {
  return html`<template role="radio" aria-checked="${x => x.checked}" aria-required="${x => x.required}" aria-disabled="${x => x.disabled}" @keypress="${(x, c) => x.keypressHandler(c.event)}"><div part="control" class="control"><slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot></div><label part="label" class="${x => {
    var _a;
    return ["label", !((_a = x.defaultSlottedNodes) === null || _a === void 0 ? void 0 : _a.length) && "label__hidden"].filter(Boolean).join(" ");
  }}"><slot ${slotted({
    property: "defaultSlottedNodes",
    filter: whitespaceFilter
  })}></slot></label></template>`;
}

class _Radio extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTRadio:class)} component.
 *
 * @beta
 */
class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radio | ARIA radio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual radio control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
class FASTRadio extends FormAssociatedRadio {
  constructor() {
    super();
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="radio"]
     *
     * @internal
     */
    this.initialValue = "on";
    this.proxy.setAttribute("type", "radio");
  }
  get radioGroup() {
    return this.closest("[role=radiogroup]");
  }
  /**
   * @internal
   */
  defaultCheckedChanged() {
    var _a;
    if (this.$fastController.isConnected && !this.dirtyChecked) {
      // Setting this.checked will cause us to enter a dirty state,
      // but if we are clean when defaultChecked is changed, we want to stay
      // in a clean state, so reset this.dirtyChecked
      if (!this.isInsideRadioGroup()) {
        this.checked = (_a = this.defaultChecked) !== null && _a !== void 0 ? _a : false;
        this.dirtyChecked = false;
      }
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    var _a, _b;
    super.connectedCallback();
    this.validate();
    if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute("role")) !== "radiogroup" && this.getAttribute("tabindex") === null) {
      if (!this.disabled) {
        this.setAttribute("tabindex", "0");
      }
    }
    if (this.checkedAttribute) {
      if (!this.dirtyChecked) {
        // Setting this.checked will cause us to enter a dirty state,
        // but if we are clean when defaultChecked is changed, we want to stay
        // in a clean state, so reset this.dirtyChecked
        if (!this.isInsideRadioGroup()) {
          this.checked = (_b = this.defaultChecked) !== null && _b !== void 0 ? _b : false;
          this.dirtyChecked = false;
        }
      }
    }
  }
  isInsideRadioGroup() {
    return this.radioGroup !== null;
  }
  /**
   * Handles key presses on the radio.
   * @beta
   */
  keypressHandler(e) {
    var _a;
    switch (e.key) {
      case keySpace:
        if (!this.checked && !((_a = this.radioGroup) === null || _a === void 0 ? void 0 : _a.readOnly)) {
          this.checked = true;
        }
        return;
    }
    return true;
  }
}
__decorate([observable], FASTRadio.prototype, "name", void 0);
__decorate([observable], FASTRadio.prototype, "defaultSlottedNodes", void 0);

/**
 * An Radio Group Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radiogroup | ARIA radiogroup }.
 *
 * @slot label - The slot for the label
 * @slot - The default slot for radio buttons
 * @csspart positioning-region - The positioning region for laying out the radios
 * @fires change - Fires a custom 'change' event when the value changes
 *
 * @public
 */
class FASTRadioGroup extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * The orientation of the group
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    this.orientation = RadioGroupOrientation.horizontal;
    this.radioChangeHandler = e => {
      const changedRadio = e.target;
      if (changedRadio.checked) {
        this.slottedRadioButtons.forEach(radio => {
          if (radio !== changedRadio) {
            radio.checked = false;
            if (!this.isInsideFoundationToolbar) {
              radio.setAttribute("tabindex", "-1");
            }
          }
        });
        this.selectedRadio = changedRadio;
        this.value = changedRadio.value;
        changedRadio.setAttribute("tabindex", "0");
        this.focusedRadio = changedRadio;
      }
      e.stopPropagation();
    };
    this.moveToRadioByIndex = (group, index) => {
      const radio = group[index];
      if (!this.isInsideToolbar) {
        radio.setAttribute("tabindex", "0");
        radio.checked = true;
        this.selectedRadio = radio;
      }
      this.focusedRadio = radio;
      radio.focus();
    };
    this.moveRightOffGroup = () => {
      var _a;
      (_a = this.nextElementSibling) === null || _a === void 0 ? void 0 : _a.focus();
    };
    this.moveLeftOffGroup = () => {
      var _a;
      (_a = this.previousElementSibling) === null || _a === void 0 ? void 0 : _a.focus();
    };
    /**
     * @internal
     */
    this.focusOutHandler = e => {
      const group = this.slottedRadioButtons;
      const radio = e.target;
      const index = radio !== null ? group.indexOf(radio) : 0;
      const focusedIndex = this.focusedRadio ? group.indexOf(this.focusedRadio) : -1;
      if (focusedIndex === 0 && index === focusedIndex || focusedIndex === group.length - 1 && focusedIndex === index) {
        if (!this.selectedRadio) {
          this.focusedRadio = group[0];
          this.focusedRadio.setAttribute("tabindex", "0");
          group.forEach(nextRadio => {
            if (nextRadio !== this.focusedRadio) {
              nextRadio.setAttribute("tabindex", "-1");
            }
          });
        } else {
          this.focusedRadio = this.selectedRadio;
          if (!this.isInsideFoundationToolbar) {
            this.selectedRadio.setAttribute("tabindex", "0");
            group.forEach(nextRadio => {
              if (nextRadio !== this.selectedRadio) {
                nextRadio.setAttribute("tabindex", "-1");
              }
            });
          }
        }
      }
      return true;
    };
    /**
     * @internal
     */
    this.handleDisabledClick = e => {
      // prevent focus events on items from the click handler when disabled
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      return true;
    };
    /**
     * @internal
     */
    this.clickHandler = e => {
      if (this.disabled) {
        return;
      }
      e.preventDefault();
      const radio = e.target;
      if (radio && radio instanceof FASTRadio) {
        radio.checked = true;
        radio.setAttribute("tabindex", "0");
        this.selectedRadio = radio;
        this.focusedRadio = radio;
      }
    };
    this.shouldMoveOffGroupToTheRight = (index, group, key) => {
      return index === group.length && this.isInsideToolbar && key === keyArrowRight;
    };
    this.shouldMoveOffGroupToTheLeft = (group, key) => {
      const index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
      return index < 0 && this.isInsideToolbar && key === keyArrowLeft;
    };
    this.checkFocusedRadio = () => {
      if (this.focusedRadio !== null && !this.focusedRadio.checked) {
        this.focusedRadio.checked = true;
        this.focusedRadio.setAttribute("tabindex", "0");
        this.focusedRadio.focus();
        this.selectedRadio = this.focusedRadio;
      }
    };
    this.moveRight = e => {
      const group = this.slottedRadioButtons;
      let index = 0;
      index = this.focusedRadio ? group.indexOf(this.focusedRadio) + 1 : 1;
      if (this.shouldMoveOffGroupToTheRight(index, group, e.key)) {
        this.moveRightOffGroup();
        return;
      } else if (index === group.length) {
        index = 0;
      }
      /* looping to get to next radio that is not disabled */
      /* matching native radio/radiogroup which does not select an item if there is only 1 in the group */
      while (index < group.length && group.length > 1) {
        if (!group[index].disabled) {
          this.moveToRadioByIndex(group, index);
          break;
        } else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
          break;
        } else if (index + 1 >= group.length) {
          if (this.isInsideToolbar) {
            break;
          } else {
            index = 0;
          }
        } else {
          index += 1;
        }
      }
    };
    this.moveLeft = e => {
      const group = this.slottedRadioButtons;
      let index = 0;
      index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
      index = index < 0 ? group.length - 1 : index;
      if (this.shouldMoveOffGroupToTheLeft(group, e.key)) {
        this.moveLeftOffGroup();
        return;
      }
      /* looping to get to next radio that is not disabled */
      while (index >= 0 && group.length > 1) {
        if (!group[index].disabled) {
          this.moveToRadioByIndex(group, index);
          break;
        } else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
          break;
        } else if (index - 1 < 0) {
          index = group.length - 1;
        } else {
          index -= 1;
        }
      }
    };
    /**
     * keyboard handling per https://w3c.github.io/aria-practices/#for-radio-groups-not-contained-in-a-toolbar
     * navigation is different when there is an ancestor with role='toolbar'
     *
     * @internal
     */
    this.keydownHandler = e => {
      const key = e.key;
      if (key in ArrowKeys && (this.isInsideFoundationToolbar || this.disabled)) {
        return true;
      }
      switch (key) {
        case keyEnter:
          {
            this.checkFocusedRadio();
            break;
          }
        case keyArrowRight:
        case keyArrowDown:
          {
            if (this.direction === Direction.ltr) {
              this.moveRight(e);
            } else {
              this.moveLeft(e);
            }
            break;
          }
        case keyArrowLeft:
        case keyArrowUp:
          {
            if (this.direction === Direction.ltr) {
              this.moveLeft(e);
            } else {
              this.moveRight(e);
            }
            break;
          }
        default:
          {
            return true;
          }
      }
    };
  }
  disabledChanged() {}
  nameChanged() {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach(radio => {
        radio.setAttribute("name", this.name);
      });
    }
  }
  valueChanged() {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach(radio => {
        if (radio.value === this.value) {
          radio.checked = true;
          this.selectedRadio = radio;
        }
      });
    }
    this.$emit("change");
  }
  slottedRadioButtonsChanged(oldValue, newValue) {
    if (this.slottedRadioButtons && this.slottedRadioButtons.length > 0) {
      this.setupRadioButtons();
    }
  }
  get parentToolbar() {
    return this.closest('[role="toolbar"]');
  }
  get isInsideToolbar() {
    var _a;
    return (_a = this.parentToolbar) !== null && _a !== void 0 ? _a : false;
  }
  get isInsideFoundationToolbar() {
    var _a;
    return !!((_a = this.parentToolbar) === null || _a === void 0 ? void 0 : _a["$fastController"]);
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.direction = getDirection(this);
    this.setupRadioButtons();
  }
  disconnectedCallback() {
    this.slottedRadioButtons.forEach(radio => {
      radio.removeEventListener("change", this.radioChangeHandler);
    });
  }
  setupRadioButtons() {
    const checkedRadios = this.slottedRadioButtons.filter(radio => {
      return radio.hasAttribute("checked");
    });
    const numberOfCheckedRadios = checkedRadios ? checkedRadios.length : 0;
    if (numberOfCheckedRadios > 1) {
      const lastCheckedRadio = checkedRadios[numberOfCheckedRadios - 1];
      lastCheckedRadio.checked = true;
    }
    let foundMatchingVal = false;
    this.slottedRadioButtons.forEach(radio => {
      if (this.name !== undefined) {
        radio.setAttribute("name", this.name);
      }
      if (this.value && this.value === radio.value) {
        this.selectedRadio = radio;
        this.focusedRadio = radio;
        radio.checked = true;
        radio.setAttribute("tabindex", "0");
        foundMatchingVal = true;
      } else {
        if (!this.isInsideFoundationToolbar) {
          radio.setAttribute("tabindex", "-1");
        }
        radio.checked = false;
      }
      radio.addEventListener("change", this.radioChangeHandler);
    });
    if (this.value === undefined && this.slottedRadioButtons.length > 0) {
      const checkedRadios = this.slottedRadioButtons.filter(radio => {
        return radio.hasAttribute("checked");
      });
      const numberOfCheckedRadios = checkedRadios !== null ? checkedRadios.length : 0;
      if (numberOfCheckedRadios > 0 && !foundMatchingVal) {
        const lastCheckedRadio = checkedRadios[numberOfCheckedRadios - 1];
        lastCheckedRadio.checked = true;
        this.focusedRadio = lastCheckedRadio;
        lastCheckedRadio.setAttribute("tabindex", "0");
      } else {
        this.slottedRadioButtons[0].setAttribute("tabindex", "0");
        this.focusedRadio = this.slottedRadioButtons[0];
      }
    }
  }
}
__decorate([attr({
  attribute: "readonly",
  mode: "boolean"
})], FASTRadioGroup.prototype, "readOnly", void 0);
__decorate([attr({
  attribute: "disabled",
  mode: "boolean"
})], FASTRadioGroup.prototype, "disabled", void 0);
__decorate([attr], FASTRadioGroup.prototype, "name", void 0);
__decorate([attr], FASTRadioGroup.prototype, "value", void 0);
__decorate([attr], FASTRadioGroup.prototype, "orientation", void 0);
__decorate([observable], FASTRadioGroup.prototype, "childItems", void 0);
__decorate([observable], FASTRadioGroup.prototype, "slottedRadioButtons", void 0);

/**
 * The orientation of a {@link @microsoft/fast-foundation#(FASTSlider:class)}.
 * @public
 */
const SliderOrientation = Orientation;
/**
 * The selection modes of a {@link @microsoft/fast-foundation#(FASTSlider:class)}.
 * @public
 */
const SliderMode = {
  singleValue: "single-value"
};

/**
 * Converts a pixel coordinate on the track to a percent of the track's range
 */
function convertPixelToPercent(pixelPos, minPosition, maxPosition, direction) {
  let pct = limit(0, 1, (pixelPos - minPosition) / (maxPosition - minPosition));
  if (direction === Direction.rtl) {
    pct = 1 - pct;
  }
  return pct;
}

class _Slider extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Slider:class)} component.
 *
 * @beta
 */
class FormAssociatedSlider extends FormAssociated(_Slider) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * A Slider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#slider | ARIA slider }.
 *
 * @slot track - The track of the slider
 * @slot track-start - The track-start visual indicator
 * @slot thumb - The slider thumb
 * @slot - The default slot for labels
 * @csspart positioning-region - The region used to position the elements of the slider
 * @csspart track-container - The region containing the track elements
 * @csspart track-start - The element wrapping the track start slot
 * @csspart thumb-container - The thumb container element which is programatically positioned
 * @fires change - Fires a custom 'change' event when the slider value changes
 *
 * @public
 */
class FASTSlider extends FormAssociatedSlider {
  constructor() {
    super(...arguments);
    /**
     * @internal
     */
    this.direction = Direction.ltr;
    /**
     * @internal
     */
    this.isDragging = false;
    /**
     * @internal
     */
    this.trackWidth = 0;
    /**
     * @internal
     */
    this.trackMinWidth = 0;
    /**
     * @internal
     */
    this.trackHeight = 0;
    /**
     * @internal
     */
    this.trackLeft = 0;
    /**
     * @internal
     */
    this.trackMinHeight = 0;
    /**
     * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
     *
     * @public
     */
    this.valueTextFormatter = () => null;
    /**
     * The minimum allowed value.
     *
     * @defaultValue - 0
     * @public
     * @remarks
     * HTML Attribute: min
     */
    this.min = 0; // Map to proxy element.
    /**
     * The maximum allowed value.
     *
     * @defaultValue - 10
     * @public
     * @remarks
     * HTML Attribute: max
     */
    this.max = 10; // Map to proxy element.
    /**
     * The orientation of the slider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    this.orientation = Orientation.horizontal;
    /**
     * The selection mode.
     *
     * @public
     * @remarks
     * HTML Attribute: mode
     */
    this.mode = SliderMode.singleValue;
    this.keypressHandler = e => {
      if (this.readOnly || this.disabled) {
        return;
      }
      if (e.key === keyHome) {
        e.preventDefault();
        this.direction !== Direction.rtl && this.orientation !== Orientation.vertical ? this.value = `${this.min}` : this.value = `${this.max}`;
      } else if (e.key === keyEnd) {
        e.preventDefault();
        this.direction !== Direction.rtl && this.orientation !== Orientation.vertical ? this.value = `${this.max}` : this.value = `${this.min}`;
      } else if (!e.shiftKey) {
        switch (e.key) {
          case keyArrowRight:
          case keyArrowUp:
            e.preventDefault();
            this.increment();
            break;
          case keyArrowLeft:
          case keyArrowDown:
            e.preventDefault();
            this.decrement();
            break;
        }
      }
    };
    this.setupTrackConstraints = () => {
      const clientRect = this.track.getBoundingClientRect();
      this.trackWidth = this.track.clientWidth;
      this.trackMinWidth = this.track.clientLeft;
      this.trackHeight = clientRect.top;
      this.trackMinHeight = clientRect.bottom;
      this.trackLeft = this.getBoundingClientRect().left;
      if (this.trackWidth === 0) {
        this.trackWidth = 1;
      }
    };
    this.setupListeners = (remove = false) => {
      const eventAction = `${remove ? "remove" : "add"}EventListener`;
      this[eventAction]("keydown", this.keypressHandler);
      this[eventAction]("mousedown", this.handleMouseDown);
      this.thumb[eventAction]("mousedown", this.handleThumbMouseDown, {
        passive: true
      });
      this.thumb[eventAction]("touchstart", this.handleThumbMouseDown, {
        passive: true
      });
      // removes handlers attached by mousedown handlers
      if (remove) {
        this.handleMouseDown(null);
        this.handleThumbMouseDown(null);
      }
    };
    /**
     * @internal
     */
    this.initialValue = "";
    /**
     *  Handle mouse moves during a thumb drag operation
     *  If the event handler is null it removes the events
     */
    this.handleThumbMouseDown = event => {
      const eventAction = `${event !== null ? "add" : "remove"}EventListener`;
      window[eventAction]("mouseup", this.handleWindowMouseUp);
      window[eventAction]("mousemove", this.handleMouseMove, {
        passive: true
      });
      window[eventAction]("touchmove", this.handleMouseMove, {
        passive: true
      });
      window[eventAction]("touchend", this.handleWindowMouseUp);
      this.isDragging = event !== null;
    };
    /**
     *  Handle mouse moves during a thumb drag operation
     */
    this.handleMouseMove = e => {
      if (this.readOnly || this.disabled || e.defaultPrevented) {
        return;
      }
      // update the value based on current position
      const sourceEvent = window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : e;
      const eventValue = this.orientation === Orientation.horizontal ? sourceEvent.pageX - document.documentElement.scrollLeft - this.trackLeft : sourceEvent.pageY - document.documentElement.scrollTop;
      this.value = `${this.calculateNewValue(eventValue)}`;
    };
    /**
     * Handle a window mouse up during a drag operation
     */
    this.handleWindowMouseUp = event => {
      this.stopDragging();
    };
    this.stopDragging = () => {
      this.isDragging = false;
      this.handleMouseDown(null);
      this.handleThumbMouseDown(null);
    };
    /**
     *
     * @param e - MouseEvent or null. If there is no event handler it will remove the events
     */
    this.handleMouseDown = e => {
      const eventAction = `${e !== null ? "add" : "remove"}EventListener`;
      if (e === null || !this.disabled && !this.readOnly) {
        window[eventAction]("mouseup", this.handleWindowMouseUp);
        window.document[eventAction]("mouseleave", this.handleWindowMouseUp);
        window[eventAction]("mousemove", this.handleMouseMove);
        if (e) {
          this.setupTrackConstraints();
          const controlValue = this.orientation === Orientation.horizontal ? e.pageX - document.documentElement.scrollLeft - this.trackLeft : e.pageY - document.documentElement.scrollTop;
          this.value = `${this.calculateNewValue(controlValue)}`;
        }
      }
    };
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }
  /**
   * The value property, typed as a number.
   *
   * @public
   */
  get valueAsNumber() {
    return parseFloat(super.value);
  }
  set valueAsNumber(next) {
    this.value = next.toString();
  }
  /**
   * @internal
   */
  valueChanged(previous, next) {
    if (this.$fastController.isConnected) {
      const nextAsNumber = parseFloat(next);
      const value = limit(this.min, this.max, this.convertToConstrainedValue(nextAsNumber)).toString();
      if (value !== next) {
        this.value = value;
        return;
      }
      super.valueChanged(previous, next);
      this.setThumbPositionForOrientation(this.direction);
      this.$emit("change");
    }
  }
  minChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.min = `${this.min}`;
    }
    this.validate();
  }
  maxChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.max = `${this.max}`;
    }
    this.validate();
  }
  stepChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.step = `${this.step}`;
    }
    this.updateStepMultiplier();
    this.validate();
  }
  orientationChanged() {
    if (this.$fastController.isConnected) {
      this.setThumbPositionForOrientation(this.direction);
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute("type", "range");
    this.direction = getDirection(this);
    this.updateStepMultiplier();
    this.setupTrackConstraints();
    this.setupListeners();
    this.setupDefaultValue();
    this.setThumbPositionForOrientation(this.direction);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    this.setupListeners(true);
  }
  /**
   * Increment the value by the step
   *
   * @public
   */
  increment() {
    const newVal = this.direction !== Direction.rtl && this.orientation !== Orientation.vertical ? Number(this.value) + Number(this.stepValue) : Number(this.value) + Number(this.stepValue);
    const incrementedVal = this.convertToConstrainedValue(newVal);
    const incrementedValString = incrementedVal < Number(this.max) ? `${incrementedVal}` : `${this.max}`;
    this.value = incrementedValString;
  }
  /**
   * Decrement the value by the step
   *
   * @public
   */
  decrement() {
    const newVal = this.direction !== Direction.rtl && this.orientation !== Orientation.vertical ? Number(this.value) - Number(this.stepValue) : Number(this.value) - Number(this.stepValue);
    const decrementedVal = this.convertToConstrainedValue(newVal);
    const decrementedValString = decrementedVal > Number(this.min) ? `${decrementedVal}` : `${this.min}`;
    this.value = decrementedValString;
  }
  /**
   * Gets the actual step value for the slider
   *
   */
  get stepValue() {
    return this.step === undefined ? 1 : this.step;
  }
  /**
   * Places the thumb based on the current value
   *
   * @public
   * @param direction - writing mode
   */
  setThumbPositionForOrientation(direction) {
    const newPct = convertPixelToPercent(Number(this.value), Number(this.min), Number(this.max), direction);
    const percentage = (1 - newPct) * 100;
    if (this.orientation === Orientation.horizontal) {
      this.position = this.isDragging ? `right: ${percentage}%; transition: none;` : `right: ${percentage}%; transition: all 0.2s ease;`;
    } else {
      this.position = this.isDragging ? `top: ${percentage}%; transition: none;` : `top: ${percentage}%; transition: all 0.2s ease;`;
    }
  }
  /**
   * Update the step multiplier used to ensure rounding errors from steps that
   * are not whole numbers
   */
  updateStepMultiplier() {
    const stepString = this.stepValue + "";
    const decimalPlacesOfStep = !!(this.stepValue % 1) ? stepString.length - stepString.indexOf(".") - 1 : 0;
    this.stepMultiplier = Math.pow(10, decimalPlacesOfStep);
  }
  get midpoint() {
    return `${this.convertToConstrainedValue((this.max + this.min) / 2)}`;
  }
  setupDefaultValue() {
    if (typeof this.value === "string") {
      if (this.value.length === 0) {
        this.initialValue = this.midpoint;
      } else {
        const value = parseFloat(this.value);
        if (!Number.isNaN(value) && (value < this.min || value > this.max)) {
          this.value = this.midpoint;
        }
      }
    }
  }
  /**
   * Calculate the new value based on the given raw pixel value.
   *
   * @param rawValue - the value to be converted to a constrained value
   * @returns the constrained value
   *
   * @internal
   */
  calculateNewValue(rawValue) {
    this.setupTrackConstraints();
    // update the value based on current position
    const newPosition = convertPixelToPercent(rawValue, this.orientation === Orientation.horizontal ? this.trackMinWidth : this.trackMinHeight, this.orientation === Orientation.horizontal ? this.trackWidth : this.trackHeight, this.direction);
    const newValue = (this.max - this.min) * newPosition + this.min;
    return this.convertToConstrainedValue(newValue);
  }
  convertToConstrainedValue(value) {
    if (isNaN(value)) {
      value = this.min;
    }
    /**
     * The following logic intends to overcome the issue with math in JavaScript with regards to floating point numbers.
     * This is needed as the `step` may be an integer but could also be a float. To accomplish this the step  is assumed to be a float
     * and is converted to an integer by determining the number of decimal places it represent, multiplying it until it is an
     * integer and then dividing it to get back to the correct number.
     */
    let constrainedValue = value - this.min;
    const roundedConstrainedValue = Math.round(constrainedValue / this.stepValue);
    const remainderValue = constrainedValue - roundedConstrainedValue * (this.stepMultiplier * this.stepValue) / this.stepMultiplier;
    constrainedValue = remainderValue >= Number(this.stepValue) / 2 ? constrainedValue - remainderValue + Number(this.stepValue) : constrainedValue - remainderValue;
    return constrainedValue + this.min;
  }
}
__decorate([attr({
  attribute: "readonly",
  mode: "boolean"
})], FASTSlider.prototype, "readOnly", void 0);
__decorate([observable], FASTSlider.prototype, "direction", void 0);
__decorate([observable], FASTSlider.prototype, "isDragging", void 0);
__decorate([observable], FASTSlider.prototype, "position", void 0);
__decorate([observable], FASTSlider.prototype, "trackWidth", void 0);
__decorate([observable], FASTSlider.prototype, "trackMinWidth", void 0);
__decorate([observable], FASTSlider.prototype, "trackHeight", void 0);
__decorate([observable], FASTSlider.prototype, "trackLeft", void 0);
__decorate([observable], FASTSlider.prototype, "trackMinHeight", void 0);
__decorate([observable], FASTSlider.prototype, "valueTextFormatter", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTSlider.prototype, "min", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTSlider.prototype, "max", void 0);
__decorate([attr({
  converter: nullableNumberConverter
})], FASTSlider.prototype, "step", void 0);
__decorate([attr], FASTSlider.prototype, "orientation", void 0);
__decorate([attr], FASTSlider.prototype, "mode", void 0);

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTSlider:class)} component.
 * @public
 */
function sliderTemplate(options = {}) {
  return html`<template role="slider" tabindex="${x => x.disabled ? null : 0}" aria-valuetext="${x => x.valueTextFormatter(x.value)}" aria-valuenow="${x => x.value}" aria-valuemin="${x => x.min}" aria-valuemax="${x => x.max}" aria-disabled="${x => x.disabled ? true : void 0}" aria-readonly="${x => x.readOnly ? true : void 0}" aria-orientation="${x => x.orientation}" class="${x => x.orientation}"><div part="positioning-region" class="positioning-region"><div ${ref("track")} part="track-container" class="track"><slot name="track"></slot><div part="track-start" class="track-start" style="${x => x.position}"><slot name="track-start"></slot></div></div><slot></slot><div ${ref("thumb")} part="thumb-container" class="thumb-container" style="${x => x.position}"><slot name="thumb">${staticallyCompose(options.thumb)}</slot></div></div></template>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTSwitch:class)} component.
 * @public
 */
function switchTemplate(options = {}) {
  return html`<template role="switch" aria-checked="${x => x.checked}" aria-disabled="${x => x.disabled}" aria-readonly="${x => x.readOnly}" tabindex="${x => x.disabled ? null : 0}" @keypress="${(x, c) => x.keypressHandler(c.event)}" @click="${(x, c) => x.clickHandler(c.event)}"><label part="label" class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"><slot ${slotted("defaultSlottedNodes")}></slot></label><div part="switch" class="switch"><slot name="switch">${staticallyCompose(options.switch)}</slot></div></template>`;
}

class _Switch extends FASTElement {}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTSwitch:class)} component.
 *
 * @beta
 */
class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}

/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#switch | ARIA switch }.
 *
 * @slot - The deafult slot for the label
 * @slot checked-message - The message when in a checked state
 * @slot unchecked-message - The message when in an unchecked state
 * @csspart label - The label
 * @csspart switch - The element representing the switch, which wraps the indicator
 * @csspart status-message - The wrapper for the status messages
 * @csspart checked-message - The checked message
 * @csspart unchecked-message - The unchecked message
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
class FASTSwitch extends FormAssociatedSwitch {
  constructor() {
    super();
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    this.initialValue = "on";
    /**
     * @internal
     */
    this.keypressHandler = e => {
      if (this.readOnly) {
        return;
      }
      switch (e.key) {
        case keyEnter:
        case keySpace:
          this.checked = !this.checked;
          break;
      }
    };
    /**
     * @internal
     */
    this.clickHandler = e => {
      if (!this.disabled && !this.readOnly) {
        this.checked = !this.checked;
      }
    };
    this.proxy.setAttribute("type", "checkbox");
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }
}
__decorate([attr({
  attribute: "readonly",
  mode: "boolean"
})], FASTSwitch.prototype, "readOnly", void 0);
__decorate([observable], FASTSwitch.prototype, "defaultSlottedNodes", void 0);

/**
 * The template for the {@link @microsoft/fast-foundation#FASTTabPanel} component.
 * @public
 */
function tabPanelTemplate() {
  return html`<template slot="tabpanel" role="tabpanel"><slot></slot></template>`;
}

/**
 * A TabPanel Component to be used with {@link @microsoft/fast-foundation#(FASTTabs:class)}
 *
 * @slot - The default slot for the tabpanel content
 *
 * @public
 */
class FASTTabPanel extends FASTElement {}

/**
 * A Tab Component to be used with {@link @microsoft/fast-foundation#(FASTTabs:class)}
 *
 * @slot start - Content which can be provided before the tab content
 * @slot end - Content which can be provided after the tab content
 * @slot - The default slot for the tab content
 *
 * @public
 */
class FASTTab extends FASTElement {}
__decorate([attr({
  mode: "boolean"
})], FASTTab.prototype, "disabled", void 0);
applyMixins$1(FASTTab, StartEnd);

/**
 * The orientation of the {@link @microsoft/fast-foundation#(FASTTabs:class)} component
 * @public
 */
const TabsOrientation = Orientation;

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTTabs:class)} component.
 * @public
 */
function tabsTemplate(options = {}) {
  return html` ${startSlotTemplate(options)}<div class="tablist" part="tablist" role="tablist"><slot name="tab" ${slotted("tabs")}></slot></div>${endSlotTemplate(options)}<div class="tabpanel" part="tabpanel"><slot name="tabpanel" ${slotted("tabpanels")}></slot></div>`;
}

/**
 * A Tabs Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#tablist | ARIA tablist }.
 *
 * @slot start - Content which can be provided before the tablist element
 * @slot end - Content which can be provided after the tablist element
 * @slot tab - The slot for tabs
 * @slot tabpanel - The slot for tabpanels
 * @csspart tablist - The element wrapping for the tabs
 * @fires change - Fires a custom 'change' event when a tab is clicked or during keyboard navigation
 *
 * @public
 */
class FASTTabs extends FASTElement {
  constructor() {
    super(...arguments);
    /**
     * The orientation
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    this.orientation = TabsOrientation.horizontal;
    this.prevActiveTabIndex = 0;
    this.activeTabIndex = 0;
    this.change = () => {
      this.$emit("change", this.activetab);
    };
    this.isDisabledElement = el => {
      return el.getAttribute("aria-disabled") === "true";
    };
    this.isHiddenElement = el => {
      return el.hasAttribute("hidden");
    };
    this.isFocusableElement = el => {
      return !this.isDisabledElement(el) && !this.isHiddenElement(el);
    };
    this.setTabs = () => {
      const gridHorizontalProperty = "gridColumn";
      const gridVerticalProperty = "gridRow";
      const gridProperty = this.isHorizontal() ? gridHorizontalProperty : gridVerticalProperty;
      this.activeTabIndex = this.getActiveIndex();
      this.tabs.forEach((tab, index) => {
        if (tab.slot === "tab") {
          const isActiveTab = this.activeTabIndex === index && this.isFocusableElement(tab);
          const tabId = this.tabIds[index];
          const tabpanelId = this.tabpanelIds[index];
          tab.setAttribute("id", tabId);
          tab.setAttribute("aria-selected", isActiveTab ? "true" : "false");
          tab.setAttribute("aria-controls", tabpanelId);
          tab.addEventListener("click", this.handleTabClick);
          tab.addEventListener("keydown", this.handleTabKeyDown);
          tab.setAttribute("tabindex", isActiveTab ? "0" : "-1");
          if (isActiveTab) {
            this.activetab = tab;
            this.activeid = tabId;
          }
        }
        // If the original property isn't emptied out,
        // the next set will morph into a grid-area style setting that is not what we want
        tab.style[gridHorizontalProperty] = "";
        tab.style[gridVerticalProperty] = "";
        tab.style[gridProperty] = `${index + 1}`;
        !this.isHorizontal() ? tab.classList.add("vertical") : tab.classList.remove("vertical");
      });
    };
    this.setTabPanels = () => {
      this.tabpanels.forEach((tabpanel, index) => {
        const tabId = this.tabIds[index];
        const tabpanelId = this.tabpanelIds[index];
        tabpanel.setAttribute("id", tabpanelId);
        tabpanel.setAttribute("aria-labelledby", tabId);
        this.activeTabIndex !== index ? tabpanel.setAttribute("hidden", "") : tabpanel.removeAttribute("hidden");
      });
    };
    this.handleTabClick = event => {
      const selectedTab = event.currentTarget;
      if (selectedTab.nodeType === 1 && this.isFocusableElement(selectedTab)) {
        this.prevActiveTabIndex = this.activeTabIndex;
        this.activeTabIndex = this.tabs.indexOf(selectedTab);
        this.setComponent();
      }
    };
    this.handleTabKeyDown = event => {
      if (this.isHorizontal()) {
        switch (event.key) {
          case keyArrowLeft:
            event.preventDefault();
            this.adjustBackward(event);
            break;
          case keyArrowRight:
            event.preventDefault();
            this.adjustForward(event);
            break;
        }
      } else {
        switch (event.key) {
          case keyArrowUp:
            event.preventDefault();
            this.adjustBackward(event);
            break;
          case keyArrowDown:
            event.preventDefault();
            this.adjustForward(event);
            break;
        }
      }
      switch (event.key) {
        case keyHome:
          event.preventDefault();
          this.adjust(-this.activeTabIndex);
          break;
        case keyEnd:
          event.preventDefault();
          this.adjust(this.tabs.length - this.activeTabIndex - 1);
          break;
      }
    };
    this.adjustForward = e => {
      const group = this.tabs;
      let index = 0;
      index = this.activetab ? group.indexOf(this.activetab) + 1 : 1;
      if (index === group.length) {
        index = 0;
      }
      while (index < group.length && group.length > 1) {
        if (this.isFocusableElement(group[index])) {
          this.moveToTabByIndex(group, index);
          break;
        } else if (this.activetab && index === group.indexOf(this.activetab)) {
          break;
        } else if (index + 1 >= group.length) {
          index = 0;
        } else {
          index += 1;
        }
      }
    };
    this.adjustBackward = e => {
      const group = this.tabs;
      let index = 0;
      index = this.activetab ? group.indexOf(this.activetab) - 1 : 0;
      index = index < 0 ? group.length - 1 : index;
      while (index >= 0 && group.length > 1) {
        if (this.isFocusableElement(group[index])) {
          this.moveToTabByIndex(group, index);
          break;
        } else if (index - 1 < 0) {
          index = group.length - 1;
        } else {
          index -= 1;
        }
      }
    };
    this.moveToTabByIndex = (group, index) => {
      const tab = group[index];
      this.activetab = tab;
      this.prevActiveTabIndex = this.activeTabIndex;
      this.activeTabIndex = index;
      tab.focus();
      this.setComponent();
    };
  }
  /**
   * @internal
   */
  orientationChanged() {
    if (this.$fastController.isConnected) {
      this.setTabs();
      this.setTabPanels();
    }
  }
  /**
   * @internal
   */
  activeidChanged(oldValue, newValue) {
    if (this.$fastController.isConnected && this.tabs.length <= this.tabpanels.length) {
      this.prevActiveTabIndex = this.tabs.findIndex(item => item.id === oldValue);
      this.setTabs();
      this.setTabPanels();
    }
  }
  /**
   * @internal
   */
  tabsChanged() {
    if (this.$fastController.isConnected && this.tabs.length <= this.tabpanels.length) {
      this.tabIds = this.getTabIds();
      this.tabpanelIds = this.getTabPanelIds();
      this.setTabs();
      this.setTabPanels();
    }
  }
  /**
   * @internal
   */
  tabpanelsChanged() {
    if (this.$fastController.isConnected && this.tabpanels.length <= this.tabs.length) {
      this.tabIds = this.getTabIds();
      this.tabpanelIds = this.getTabPanelIds();
      this.setTabs();
      this.setTabPanels();
    }
  }
  getActiveIndex() {
    const id = this.activeid;
    if (id !== undefined) {
      return this.tabIds.indexOf(this.activeid) === -1 ? 0 : this.tabIds.indexOf(this.activeid);
    } else {
      return 0;
    }
  }
  getTabIds() {
    return this.tabs.map(tab => {
      var _a;
      return (_a = tab.getAttribute("id")) !== null && _a !== void 0 ? _a : `tab-${uniqueId()}`;
    });
  }
  getTabPanelIds() {
    return this.tabpanels.map(tabPanel => {
      var _a;
      return (_a = tabPanel.getAttribute("id")) !== null && _a !== void 0 ? _a : `panel-${uniqueId()}`;
    });
  }
  setComponent() {
    if (this.activeTabIndex !== this.prevActiveTabIndex) {
      this.activeid = this.tabIds[this.activeTabIndex];
      this.focusTab();
      this.change();
    }
  }
  isHorizontal() {
    return this.orientation === TabsOrientation.horizontal;
  }
  /**
   * The adjust method for FASTTabs
   * @public
   * @remarks
   * This method allows the active index to be adjusted by numerical increments
   */
  adjust(adjustment) {
    const focusableTabs = this.tabs.filter(t => this.isFocusableElement(t));
    const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);
    const nextTabIndex = limit(0, focusableTabs.length - 1, currentActiveTabIndex + adjustment);
    // the index of the next focusable tab within the context of all available tabs
    const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);
    if (nextIndex > -1) {
      this.moveToTabByIndex(this.tabs, nextIndex);
    }
  }
  focusTab() {
    this.tabs[this.activeTabIndex].focus();
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.tabIds = this.getTabIds();
    this.tabpanelIds = this.getTabPanelIds();
    this.activeTabIndex = this.getActiveIndex();
  }
}
__decorate([attr], FASTTabs.prototype, "orientation", void 0);
__decorate([attr], FASTTabs.prototype, "activeid", void 0);
__decorate([observable], FASTTabs.prototype, "tabs", void 0);
__decorate([observable], FASTTabs.prototype, "tabpanels", void 0);
applyMixins$1(FASTTabs, StartEnd);

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTTextField:class)} component.
 * @public
 */
function textFieldTemplate(options = {}) {
  return html`<label part="label" for="control" class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"><slot ${slotted({
    property: "defaultSlottedNodes",
    filter: whitespaceFilter
  })}></slot></label><div class="root" part="root">${startSlotTemplate(options)}<input class="control" part="control" id="control" @input="${x => x.handleTextInput()}" @change="${x => x.handleChange()}" ?autofocus="${x => x.autofocus}" ?disabled="${x => x.disabled}" list="${x => x.list}" maxlength="${x => x.maxlength}" name="${x => x.name}" minlength="${x => x.minlength}" pattern="${x => x.pattern}" placeholder="${x => x.placeholder}" ?readonly="${x => x.readOnly}" ?required="${x => x.required}" size="${x => x.size}" ?spellcheck="${x => x.spellcheck}" :value="${x => x.value}" type="${x => x.type}" aria-atomic="${x => x.ariaAtomic}" aria-busy="${x => x.ariaBusy}" aria-controls="${x => x.ariaControls}" aria-current="${x => x.ariaCurrent}" aria-describedby="${x => x.ariaDescribedby}" aria-details="${x => x.ariaDetails}" aria-disabled="${x => x.ariaDisabled}" aria-errormessage="${x => x.ariaErrormessage}" aria-flowto="${x => x.ariaFlowto}" aria-haspopup="${x => x.ariaHaspopup}" aria-hidden="${x => x.ariaHidden}" aria-invalid="${x => x.ariaInvalid}" aria-keyshortcuts="${x => x.ariaKeyshortcuts}" aria-label="${x => x.ariaLabel}" aria-labelledby="${x => x.ariaLabelledby}" aria-live="${x => x.ariaLive}" aria-owns="${x => x.ariaOwns}" aria-relevant="${x => x.ariaRelevant}" aria-roledescription="${x => x.ariaRoledescription}" ${ref("control")} />${endSlotTemplate(options)}</div>`;
}

const styles$i = css`
  ${display("flex")}

  :host{--dialog-backdrop:${colorBackgroundOverlay}}dialog{background:${colorNeutralBackground1};border:${strokeWidthThin} solid ${colorTransparentStroke};z-index:2;margin:auto auto;max-width:100%;width:100vw;border-radius:${borderRadiusXLarge};box-shadow:${shadow64};max-height:100vh;height:fit-content;overflow:unset;position:fixed;inset:0;padding:0}dialog::backdrop{background:var(--dialog-backdrop,rgba(0,0,0,0.4))}.root{box-sizing:border-box;display:flex;flex-direction:column;overflow:unset;max-height:calc(100vh - 48px);padding:${spacingVerticalXXL} ${spacingHorizontalXXL}}.title{font-size:${fontSizeBase500};line-height:${lineHeightBase500};font-weight:${fontWeightSemibold};font-family:${fontFamilyBase};color:${colorNeutralForeground1};margin-bottom:${spacingVerticalS};display:flex;justify-content:space-between;align-items:flex-start;column-gap:8px}.content{vertical-align:top;min-height:32px;color:${colorNeutralForeground1};font-size:${fontSizeBase300};line-height:${lineHeightBase300};font-weight:${fontWeightRegular};font-family:${fontFamilyBase};overflow-y:auto;box-sizing:border-box}.actions{display:flex;grid-column-start:1;flex-direction:column;max-width:100vw;row-gap:${spacingVerticalS};padding-top:${spacingVerticalXXL};justify-self:stretch;width:100%}::slotted([slot='action']){width:100%}@media screen and (min-width:480px){::slotted([slot='action']){width:fit-content}dialog{max-width:600px;width:100%}.actions{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;column-gap:${spacingHorizontalS};padding-top:${spacingVerticalS};box-sizing:border-box}}`;

const definition$j = Dialog.compose({
  name: `${FluentDesignSystem.prefix}-dialog`,
  template: template$j,
  styles: styles$i
});

var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
class Divider extends FASTDivider {}
__decorateClass$c([attr({
  attribute: "align-content"
})], Divider.prototype, "alignContent", 2);
__decorateClass$c([attr], Divider.prototype, "appearance", 2);
__decorateClass$c([attr({
  mode: "boolean"
})], Divider.prototype, "inset", 2);

const DividerAlignContent = {
  center: "center",
  start: "start",
  end: "end"
};
const DividerAppearance = {
  strong: "strong",
  brand: "brand",
  subtle: "subtle",
  default: "default"
};

const template$i = dividerTemplate();

const styles$h = css`
  ${display("flex")}

  :host{contain:content}:host::after,:host::before{align-self:center;background:${colorNeutralStroke2};box-sizing:border-box;content:'';display:flex;flex-grow:1;height:${strokeWidthThin}}:host([inset]){padding:0 12px}:host ::slotted(*){color:${colorNeutralForeground2};font-family:${fontFamilyBase};font-size:${fontSizeBase200};font-weight:${fontWeightRegular};margin:0;padding:0 12px}:host([align-content='start'])::before,:host([align-content='end'])::after{flex-basis:12px;flex-grow:0;flex-shrink:0}:host([orientation='vertical']){height:100%;min-height:84px}:host([orientation='vertical']):empty{min-height:20px}:host([orientation='vertical']){flex-direction:column;align-items:center}:host([orientation='vertical'][inset])::before{margin-top:12px}:host([orientation='vertical'][inset])::after{margin-bottom:12px}:host([orientation='vertical']):empty::before,:host([orientation='vertical']):empty::after{height:10px;min-height:10px;flex-grow:0}:host([orientation='vertical'])::before,:host([orientation='vertical'])::after{width:${strokeWidthThin};min-height:20px;height:100%}:host([orientation='vertical']) ::slotted(*){display:flex;flex-direction:column;padding:12px 0;line-height:20px}:host([orientation='vertical'][align-content='start'])::before{min-height:8px}:host([orientation='vertical'][align-content='end'])::after{min-height:8px}:host([appearance='strong'])::before,:host([appearance='strong'])::after{background:${colorNeutralStroke1}}:host([appearance='strong']) ::slotted(*){color:${colorNeutralForeground1}}:host([appearance='brand'])::before,:host([appearance='brand'])::after{background:${colorBrandStroke1}}:host([appearance='brand']) ::slotted(*){color:${colorBrandForeground1}}:host([appearance='subtle'])::before,:host([appearance='subtle'])::after{background:${colorNeutralStroke3}}:host([appearance='subtle']) ::slotted(*){color:${colorNeutralForeground3}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    :host([appearance='strong'])::before,:host([appearance='strong'])::after,:host([appearance='brand'])::before,:host([appearance='brand'])::after,:host([appearance='subtle'])::before,:host([appearance='subtle'])::after,:host::after,:host::before{background:WindowText;color:WindowText}`));

const definition$i = Divider.compose({
  name: `${FluentDesignSystem.prefix}-divider`,
  template: template$i,
  styles: styles$h
});

var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
class Image extends FASTElement {}
__decorateClass$b([attr({
  mode: "boolean"
})], Image.prototype, "block", 2);
__decorateClass$b([attr({
  mode: "boolean"
})], Image.prototype, "bordered", 2);
__decorateClass$b([attr({
  mode: "boolean"
})], Image.prototype, "shadow", 2);
__decorateClass$b([attr], Image.prototype, "fit", 2);
__decorateClass$b([attr], Image.prototype, "shape", 2);

const ImageFit = {
  none: "none",
  center: "center",
  contain: "contain",
  cover: "cover",
  default: "default"
};
const ImageShape = {
  circular: "circular",
  rounded: "rounded",
  square: "square"
};

const template$h = html`<slot></slot>`;

const styles$g = css`
  :host{contain:content}:host ::slotted(img){box-sizing:border-box;min-height:8px;min-width:8px;display:inline-block}:host([block]) ::slotted(img){width:100%;height:auto}:host([bordered]) ::slotted(img){border:${strokeWidthThin} solid ${colorNeutralStroke2}}:host([fit='none']) ::slotted(img){object-fit:none;object-position:top left;height:100%;width:100%}:host([fit='center']) ::slotted(img){object-fit:none;object-position:center;height:100%;width:100%}:host([fit='contain']) ::slotted(img){object-fit:contain;object-position:center;height:100%;width:100%}:host([fit='cover']) ::slotted(img){object-fit:cover;object-position:center;height:100%;width:100%}:host([shadow]) ::slotted(img){box-shadow:${shadow4}}:host([shape='circular']) ::slotted(img){border-radius:${borderRadiusCircular}}:host([shape='rounded']) ::slotted(img){border-radius:${borderRadiusMedium}}`;

const definition$h = Image.compose({
  name: `${FluentDesignSystem.prefix}-image`,
  template: template$h,
  styles: styles$g
});

var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
class Label extends FASTElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.required = false;
  }
}
__decorateClass$a([attr], Label.prototype, "size", 2);
__decorateClass$a([attr], Label.prototype, "weight", 2);
__decorateClass$a([attr({
  mode: "boolean"
})], Label.prototype, "disabled", 2);
__decorateClass$a([attr({
  mode: "boolean"
})], Label.prototype, "required", 2);

const styles$f = css`
  ${display("flex")}

  :host{font-family:${fontFamilyBase};font-size:${fontSizeBase300};line-height:${lineHeightBase300};font-weight:${fontWeightRegular};color:${colorNeutralForeground1}}.asterisk{color:${colorPaletteRedForeground1};margin-left:${spacingHorizontalXS}}:host([size='small']){font-size:${fontSizeBase200};line-height:${lineHeightBase200}}:host([size='large']){font-size:${fontSizeBase400};line-height:${lineHeightBase400};font-weight:${fontWeightSemibold}}:host([weight='semibold']){font-weight:${fontWeightSemibold}}:host([disabled]),:host([disabled]) .asterisk{color:${colorNeutralForegroundDisabled}}`;

function labelTemplate() {
  return html`<slot></slot><span part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>`;
}
const template$g = labelTemplate();

const definition$g = Label.compose({
  name: `${FluentDesignSystem.prefix}-label`,
  template: template$g,
  styles: styles$f
});

var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
class Menu extends FASTElement {
  constructor() {
    super(...arguments);
    this.openOnHover = false;
    this.openOnContext = false;
    this.closeOnScroll = false;
    this.persistOnItemClick = false;
    this.open = false;
    this.slottedMenuList = [];
    this.slottedTriggers = [];
    this.toggleMenu = () => {
      if (this.open) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    };
    this.closeMenu = () => {
      this.open = false;
      if (this.closeOnScroll) {
        document.removeEventListener("scroll", this.closeMenu);
      }
    };
    this.openMenu = e => {
      this.open = true;
      if (e && this.openOnContext) {
        e.preventDefault();
      }
      if (this.closeOnScroll) {
        document.addEventListener("scroll", this.closeMenu);
      }
    };
    this.setPositioningTask = () => {
      this.setPositioning();
    };
    this.handleTriggerKeydown = e => {
      if (e.defaultPrevented) {
        return;
      }
      const key = e.key;
      switch (key) {
        case keySpace:
        case keyEnter:
          e.preventDefault();
          this.toggleMenu();
          if (this.open) {
            this.focusMenuList();
          }
          break;
        default:
          return true;
      }
    };
    this.handleDocumentClick = e => {
      if (e && !e.composedPath().includes(this._menuList) && !e.composedPath().includes(this._trigger)) {
        this.closeMenu();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    Updates.enqueue(() => this.setComponent());
  }
  disconnectedCallback() {
    var _a;
    super.disconnectedCallback();
    (_a = this.cleanup) == null ? void 0 : _a.call(this);
    this.removeListeners();
  }
  setComponent() {
    if (this.$fastController.isConnected && this.slottedMenuList.length && this.slottedTriggers.length) {
      this._trigger = this.slottedTriggers[0];
      this._menuList = this.slottedMenuList[0];
      this._trigger.setAttribute("aria-haspopup", "true");
      this._trigger.setAttribute("aria-expanded", `${this.open}`);
      this.addListeners();
    }
  }
  focusMenuList() {
    if (this.open && this._menuList) {
      Updates.enqueue(() => {
        this._menuList.focus();
      });
    }
  }
  focusTrigger() {
    if (!this.open && this._trigger) {
      Updates.enqueue(() => {
        this._trigger.focus();
      });
    }
  }
  openChanged(oldValue, newValue) {
    var _a;
    if (this.$fastController.isConnected && this._trigger instanceof HTMLElement) {
      this._trigger.setAttribute("aria-expanded", `${this.open}`);
      if (this._menuList && this.open) {
        Updates.enqueue(this.setPositioningTask);
      }
    }
    (_a = this.cleanup) == null ? void 0 : _a.call(this);
    this.$emit("onOpenChange", {
      open: newValue
    });
  }
  openOnHoverChanged(oldValue, newValue) {
    var _a, _b;
    if (newValue) {
      (_a = this._trigger) == null ? void 0 : _a.addEventListener("mouseover", this.openMenu);
    } else {
      (_b = this._trigger) == null ? void 0 : _b.removeEventListener("mouseover", this.openMenu);
    }
  }
  persistOnItemClickChanged(oldValue, newValue) {
    var _a, _b;
    if (!newValue) {
      (_a = this._menuList) == null ? void 0 : _a.addEventListener("click", this.closeMenu);
    } else {
      (_b = this._menuList) == null ? void 0 : _b.removeEventListener("click", this.closeMenu);
    }
  }
  openOnContextChanged(oldValue, newValue) {
    var _a, _b;
    if (newValue) {
      (_a = this._trigger) == null ? void 0 : _a.addEventListener("contextmenu", this.openMenu);
    } else {
      (_b = this._trigger) == null ? void 0 : _b.removeEventListener("contextmenu", this.openMenu);
    }
  }
  closeOnScrollChanged(oldValue, newValue) {
    if (newValue) {
      document.addEventListener("scroll", this.closeMenu);
    } else {
      document.removeEventListener("scroll", this.closeMenu);
    }
  }
  setPositioning() {
    if (this.$fastController.isConnected && this._menuList && this.open && this._trigger) {
      this.cleanup = autoUpdate(this, this.positioningContainer, async () => {
        var _a, _b;
        const {
          middlewareData,
          x,
          y
        } = await computePosition(this._trigger, this.positioningContainer, {
          placement: "bottom",
          strategy: "fixed",
          middleware: [flip(), size({
            apply: ({
              availableHeight,
              rects
            }) => {
              var _a2;
              ((_a2 = this.positioningContainer) == null ? void 0 : _a2.style) && Object.assign(this.positioningContainer.style, {
                maxHeight: `${availableHeight}px`,
                width: `${rects.reference.width}px`
              });
            }
          }), hide()]
        });
        if ((_a = middlewareData.hide) == null ? void 0 : _a.referenceHidden) {
          this.open = false;
          return;
        }
        ((_b = this.positioningContainer) == null ? void 0 : _b.style) && Object.assign(this.positioningContainer.style, {
          position: "fixed",
          top: "0",
          left: "0",
          transform: `translate(${x}px, ${y}px)`
        });
      });
    }
  }
  addListeners() {
    var _a, _b, _c, _d, _e;
    document.addEventListener("click", this.handleDocumentClick);
    (_a = this._trigger) == null ? void 0 : _a.addEventListener("keydown", this.handleTriggerKeydown);
    if (!this.persistOnItemClick) {
      (_b = this._menuList) == null ? void 0 : _b.addEventListener("click", this.closeMenu);
    }
    if (this.openOnHover) {
      (_c = this._trigger) == null ? void 0 : _c.addEventListener("mouseover", this.openMenu);
    } else if (this.openOnContext) {
      (_d = this._trigger) == null ? void 0 : _d.addEventListener("contextmenu", this.openMenu);
    } else {
      (_e = this._trigger) == null ? void 0 : _e.addEventListener("click", this.toggleMenu);
    }
  }
  removeListeners() {
    var _a, _b, _c, _d, _e;
    document.removeEventListener("click", this.handleDocumentClick);
    (_a = this._trigger) == null ? void 0 : _a.removeEventListener("keydown", this.handleTriggerKeydown);
    if (!this.persistOnItemClick) {
      (_b = this._menuList) == null ? void 0 : _b.removeEventListener("click", this.closeMenu);
    }
    if (this.openOnHover) {
      (_c = this._trigger) == null ? void 0 : _c.removeEventListener("mouseover", this.openMenu);
    }
    if (this.openOnContext) {
      (_d = this._trigger) == null ? void 0 : _d.removeEventListener("contextmenu", this.openMenu);
    } else {
      (_e = this._trigger) == null ? void 0 : _e.removeEventListener("click", this.toggleMenu);
    }
  }
  handleMenuKeydown(e) {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keyEscape:
        e.preventDefault();
        if (this.open) {
          this.closeMenu();
          this.focusTrigger();
        }
        break;
      case keyTab:
        if (this.open) {
          this.closeMenu();
        }
        if (e.shiftKey) {
          this.focusTrigger();
        }
      default:
        return true;
    }
  }
}
__decorateClass$9([observable, attr({
  attribute: "open-on-hover",
  mode: "boolean"
})], Menu.prototype, "openOnHover", 2);
__decorateClass$9([observable, attr({
  attribute: "open-on-context",
  mode: "boolean"
})], Menu.prototype, "openOnContext", 2);
__decorateClass$9([observable, attr({
  attribute: "close-on-scroll",
  mode: "boolean"
})], Menu.prototype, "closeOnScroll", 2);
__decorateClass$9([observable, attr({
  attribute: "persist-on-item-click",
  mode: "boolean"
})], Menu.prototype, "persistOnItemClick", 2);
__decorateClass$9([observable, attr({
  mode: "boolean"
})], Menu.prototype, "open", 2);
__decorateClass$9([observable], Menu.prototype, "slottedMenuList", 2);
__decorateClass$9([observable], Menu.prototype, "slottedTriggers", 2);

function menuTemplate() {
  return html`<template ?open-on-hover="${x => x.openOnHover}" ?open-on-context="${x => x.openOnContext}" ?close-on-scroll="${x => x.closeOnScroll}" ?persist-on-item-click="${x => x.persistOnItemClick}" @keydown="${(x, c) => x.handleMenuKeydown(c.event)}"><slot name="trigger" ${slotted({
    property: "slottedTriggers",
    filter: elements()
  })}></slot><span ${ref("positioningContainer")} part="positioning-container" class="positioning-container" ?hidden="${x => !x.open}"><slot ${slotted({
    property: "slottedMenuList",
    filter: elements()
  })}></slot></span></template>`;
}
const template$f = menuTemplate();

const styles$e = css`
  :host{position:relative;z-index:var(--z-index-menu,1)}.positioning-container{position:fixed;top:0;left:0;transform:translate(0,0)}`;

const definition$f = Menu.compose({
  name: `${FluentDesignSystem.prefix}-menu`,
  template: template$f,
  styles: styles$e
});

class MenuButton extends Button {}

const MenuButtonAppearance = ButtonAppearance;
const MenuButtonShape = ButtonShape;
const MenuButtonSize = ButtonSize;

const template$e = buttonTemplate$1({
  end: html.partial(`<svg slot="end" fill="currentColor" aria-hidden="true" width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z" fill="currentColor"></path></svg>`)
});

const definition$e = MenuButton.compose({
  name: `${FluentDesignSystem.prefix}-menu-button`,
  template: template$e,
  styles: styles$p,
  shadowOptions: {
    delegatesFocus: true
  }
});

class MenuItem extends FASTMenuItem {}

const Checkmark16Filled = html.partial(`<svg fill="currentColor" class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 014.9 12L2.22 9.28a.75.75 0 111.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 011.06.04z" fill="currentColor"></path></svg>`);
const chevronRight16Filled = html.partial(`<svg fill="currentColor" class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.74 3.2a.75.75 0 00-.04 1.06L9.23 8 5.7 11.74a.75.75 0 101.1 1.02l4-4.25a.75.75 0 000-1.02l-4-4.25a.75.75 0 00-1.06-.04z" fill="currentColor"></path></svg>`);
const template$d = menuItemTemplate({
  checkboxIndicator: Checkmark16Filled,
  expandCollapseGlyph: chevronRight16Filled,
  radioIndicator: Checkmark16Filled
});

const styles$d = css`
  ${display("grid")}

  :host{grid-template-columns:20px 20px auto 20px;align-items:center;grid-gap:4px;height:32px;background:${colorNeutralBackground1};font:${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};border-radius:${borderRadiusMedium};color:${colorNeutralForeground2};padding:0 10px;cursor:pointer;overflow:visible;contain:layout}:host(:hover){background:${colorNeutralBackground1Hover}}.content{white-space:nowrap;flex-grow:1;grid-column:auto / span 2;padding:0 2px}.checkbox,.radio{display:none}.input-container,.expand-collapse-glyph-container,::slotted([slot='start']),::slotted([slot='end']),:host([checked]) .checkbox,:host([checked]) .radio{display:inline-flex;justify-content:center;align-items:center;color:${colorNeutralForeground2}}.expand-collapse-glyph-container,::slotted([slot='start']),::slotted([slot='end']){height:32px;font-size:${fontSizeBase500};width:fit-content}.input-container{width:20px}::slotted([slot='end']){color:${colorNeutralForeground3};font:${fontWeightRegular} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};white-space:nowrap;grid-column:4 / span 1;justify-self:flex-end}.expand-collapse-glyph-container{grid-column:4 / span 1;justify-self:flex-end}:host(:hover) .input-container,:host(:hover) .expand-collapse-glyph-container,:host(:hover) .content{color:${colorNeutralForeground2Hover}}:host([icon]:hover) ::slotted([slot='start']){color:${colorCompoundBrandForeground1Hover}}:host(:active){background-color:${colorNeutralBackground1Selected}}:host(:active) .input-container,:host(:active) .expand-collapse-glyph-container,:host(:active) .content{color:${colorNeutralForeground2Pressed}}:host(:active) ::slotted([slot='start']){color:${colorCompoundBrandForeground1Pressed}}:host([disabled]){background-color:${colorNeutralBackgroundDisabled}}:host([disabled]) .content,:host([disabled]) .expand-collapse-glyph-container,:host([disabled]) ::slotted([slot='end']),:host([disabled]) ::slotted([slot='start']){color:${colorNeutralForegroundDisabled}}:host([data-indent]){display:grid}:host([data-indent='1']) .content{grid-column:2 / span 1}:host([data-indent='1'][role='menuitemcheckbox']){display:grid}:host([data-indent='2'][aria-haspopup='menu']) ::slotted([slot='end']){grid-column:4 / span 1}:host([data-indent='2'][aria-haspopup='menu']) .expand-collapse-glyph-container{grid-column:5 / span 1}:host([data-indent='1']) .content{grid-column:2 / span 1}:host([data-indent='1'][role='menuitemcheckbox']) .content,:host([data-indent='1'][role='menuitemradio']) .content{grid-column:auto / span 1}:host([icon]) ::slotted([slot='end']),:host([data-indent='1']) ::slotted([slot='end']){grid-column:4 / span 1;justify-self:flex-end}:host([data-indent='2']){display:grid;grid-template-columns:20px 20px auto auto}:host([data-indent='2']) .content{grid-column:3 / span 1}:host([data-indent='2']) .input-container{grid-column:1 / span 1}:host([data-indent='2']) ::slotted([slot='start']){grid-column:2 / span 1}:host([aria-haspopup='menu']){grid-template-columns:20px auto auto 20px}:host([data-indent='2'][aria-haspopup='menu']){grid-template-columns:20px 20px auto auto 20px}:host([aria-haspopup='menu']) ::slotted([slot='end']){grid-column:3 / span 1;justify-self:flex-end}:host([data-indent='2'][aria-haspopup='menu']) ::slotted([slot='end']){grid-column:4 / span 1;justify-self:flex-end}`;

const definition$d = MenuItem.compose({
  name: `${FluentDesignSystem.prefix}-menu-item`,
  template: template$d,
  styles: styles$d
});

class MenuList extends FASTMenu {
  setItems() {
    var _a;
    super.setItems();
    const filteredMenuListItems = (_a = this.menuItems) == null ? void 0 : _a.filter(this.isMenuItemElement);
    filteredMenuListItems == null ? void 0 : filteredMenuListItems.forEach((item, index) => {
      const indent = filteredMenuListItems == null ? void 0 : filteredMenuListItems.reduce((accum, current) => {
        const elementValue = MenuList.elementIndent(current);
        return Math.max(accum, elementValue);
      }, 0);
      if (item instanceof MenuItem) {
        item.setAttribute("data-indent", `${indent}`);
      }
    });
  }
  static elementIndent(el) {
    const role = el.getAttribute("role");
    const startSlot = el.querySelector("[slot=start]");
    if (role && role !== MenuItemRole.menuitem) {
      return startSlot ? 2 : 1;
    }
    return startSlot ? 1 : 0;
  }
}

const template$c = menuTemplate$1();

const styles$c = css`
  ${display("flex")}

  :host{flex-direction:column;height:fit-content;max-width:300px;min-width:160px;width:auto;background-color:${colorNeutralBackground1};border:1px solid ${colorTransparentStroke};border-radius:${borderRadiusMedium};box-shadow:${shadow16};padding:4px;row-gap:2px}`;

const definition$c = MenuList.compose({
  name: `${FluentDesignSystem.prefix}-menu-list`,
  template: template$c,
  styles: styles$c
});

var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
class ProgressBar extends FASTProgress {
  constructor() {
    super(...arguments);
    this.validationState = null;
  }
}
__decorateClass$8([attr], ProgressBar.prototype, "thickness", 2);
__decorateClass$8([attr], ProgressBar.prototype, "shape", 2);
__decorateClass$8([attr({
  attribute: "validation-state"
})], ProgressBar.prototype, "validationState", 2);

const ProgressBarThickness = {
  medium: "medium",
  large: "large"
};
const ProgressBarShape = {
  rounded: "rounded",
  square: "square"
};
const ProgressBarValidationState = {
  success: "success",
  warning: "warning",
  error: "error"
};

const styles$b = css`
  ${display("flex")}

  :host{align-items:center;height:2px;overflow-x:hidden;border-radius:${borderRadiusMedium};contain:content}:host([thickness='large']),:host([thickness='large']) .progress,:host([thickness='large']) .determinate{height:4px}:host([shape='square']),:host([shape='square']) .progress,:host([shape='square']) .determinate{border-radius:0}:host([validation-state='error']) .determinate{background-color:${colorPaletteRedBackground3}}:host([validation-state='error']) .indeterminate-indicator-1,:host([validation-state='error']) .indeterminate-indicator-2{background:linear-gradient(
      to right,${colorPaletteRedBackground2} 0%,${colorPaletteRedBackground3} 50%,${colorPaletteRedBackground2}
    )}:host([validation-state='warning']) .determinate{background-color:${colorPaletteDarkOrangeBackground3}}:host([validation-state='warning']) .indeterminate-indicator-1,:host([validation-state='warning']) .indeterminate-indicator-2{background:linear-gradient(
      to right,${colorPaletteDarkOrangeBackground2} 0%,${colorPaletteDarkOrangeBackground3} 50%,${colorPaletteDarkOrangeBackground2}
    )}:host([validation-state='success']) .determinate{background-color:${colorPaletteGreenBackground3}}:host([validation-state='success']) .indeterminate-indicator-1,:host([validation-state='success']) .indeterminate-indicator-2{background:linear-gradient(
      to right,${colorPaletteGreenBackground2} 0%,${colorPaletteGreenBackground3} 50%,${colorPaletteGreenBackground2}
    )}.progress{background-color:${colorNeutralBackground6};border-radius:${borderRadiusMedium};width:100%;height:2px;display:flex;align-items:center;position:relative}.determinate{background-color:${colorCompoundBrandBackground};border-radius:${borderRadiusMedium};height:2px;transition:all 0.2s ease-in-out;display:flex}.indeterminate-indicator-1{position:absolute;opacity:0;height:100%;background:linear-gradient(
      to right,${colorBrandBackground2} 0%,${colorCompoundBrandBackground} 50%,${colorBrandBackground2}
    );border-radius:${borderRadiusMedium};animation-timing-function:cubic-bezier(0.4,0,0.6,1);width:40%;animation:indeterminate-1 3s infinite}.indeterminate-indicator-2{position:absolute;opacity:0;height:100%;background:linear-gradient(
      to right,${colorBrandBackground2} 0%,${colorCompoundBrandBackground} 50%,${colorBrandBackground2}
    );border-radius:${borderRadiusMedium};animation-timing-function:cubic-bezier(0.4,0,0.6,1);width:60%;animation:indeterminate-2 3s infinite}@keyframes indeterminate-1{0%{opacity:1;transform:translateX(-100%)}70%{opacity:1;transform:translateX(300%)}70.01%{opacity:0}100%{opacity:0;transform:translateX(300%)}}@keyframes indeterminate-2{0%{opacity:0;transform:translateX(-150%)}29.99%{opacity:0}30%{opacity:1;transform:translateX(-150%)}100%{transform:translateX(166.66%);opacity:1}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    .progress{background-color:HighlightText}.determinate,:host([validation-state='success']) .determinate,:host([validation-state='warning']) .determinate,:host([validation-state='error']) .determinate,:host([validation-state='success']) ..indeterminate-indicator-1,:host([validation-state='success']) ..indeterminate-indicator-2,:host([validation-state='warning']) .indeterminate-indicator-1,:host([validation-state='warning']) .indeterminate-indicator-2,:host([validation-state='error']) .indeterminate-indicator-1,:host([validation-state='error']) .indeterminate-indicator-2{background-color:Highlight}`));

const template$b = progressTemplate({
  indeterminateIndicator1: `<span class="indeterminate-indicator-1" part="indeterminate-indicator-1></span>`,
  indeterminateIndicator2: `<span class="indeterminate-indicator-2" part="indeterminate-indicator-2"></span>`
});

const definition$b = ProgressBar.compose({
  name: `${FluentDesignSystem.prefix}-progress-bar`,
  template: template$b,
  styles: styles$b
});

class Radio extends FASTRadio {}

const styles$a = css`
  ${display("inline-grid")}

  :host{grid-auto-flow:column;grid-template-columns:max-content;gap:${spacingHorizontalXS};align-items:center;height:32px;cursor:pointer;outline:none;position:relative;user-select:none;color:blue;color:var(--state-color,${colorNeutralForeground3});padding-inline-end:${spacingHorizontalS};--control-border-color:${colorNeutralStrokeAccessible};--checked-indicator-background-color:${colorCompoundBrandForeground1};--state-color:${colorNeutralForeground3}}:host([disabled]){--control-border-color:${colorNeutralForegroundDisabled};--checked-indicator-background-color:${colorNeutralForegroundDisabled};--state-color:${colorNeutralForegroundDisabled}}.label{cursor:pointer;font-family:${fontFamilyBase};font-size:${fontSizeBase300};font-weight:${fontWeightRegular};line-height:${lineHeightBase300}}.label__hidden{display:none}.control{box-sizing:border-box;align-items:center;border:1px solid var(--control-border-color,${colorNeutralStrokeAccessible});border-radius:${borderRadiusCircular};display:flex;height:16px;justify-content:center;margin:${spacingVerticalS} ${spacingHorizontalS};position:relative;width:16px;justify-self:center}.checked-indicator{border-radius:${borderRadiusCircular};height:10px;opacity:0;width:10px}:host([aria-checked='false']:hover) .control{color:${colorNeutralForeground2}}:host(:focus-visible){border-radius:${borderRadiusSmall};box-shadow:0 0 0 3px ${colorStrokeFocus2};outline:1px solid ${colorStrokeFocus1}}:host(:hover) .control{border-color:${colorNeutralStrokeAccessibleHover}}:host(:active) .control{border-color:${colorNeutralStrokeAccessiblePressed}}:host([aria-checked='true']) .checked-indicator{opacity:1}:host([aria-checked='true']) .control{border-color:var(--control-border-color,${colorNeutralStrokeAccessible})}:host([aria-checked='true']) .checked-indicator{background-color:var(--checked-indicator-background-color,${colorCompoundBrandForeground1})}:host([aria-checked='true']:hover) .control{border-color:${colorCompoundBrandStrokeHover}}:host([aria-checked='true']:hover) .checked-indicator{background-color:${colorCompoundBrandStrokeHover}}:host([aria-checked='true']:active) .control{border-color:${colorCompoundBrandStrokePressed}}:host([aria-checked='true']:active) .checked-indicator{background:${colorCompoundBrandForeground1Pressed}}:host([disabled]){color:${colorNeutralForegroundDisabled};pointer-events:none}:host([disabled]) .control{pointer-events:none;border-color:${colorNeutralForegroundDisabled}}:host([disabled]) .checked-indicator{background:${colorNeutralForegroundDisabled}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    :host .control{border-color:InactiveBorder}:host([aria-checked='true']) .checked-indicator,:host([aria-checked='true']:active) .checked-indicator,:host([aria-checked='true']:hover) .checked-indicator{background-color:Highlight;border-color:ActiveBorder}`));

const template$a = radioTemplate({
  checkedIndicator: html`<div part="checked-indicator" class="checked-indicator"></div>`
});

const definition$a = Radio.compose({
  name: `${FluentDesignSystem.prefix}-radio`,
  template: template$a,
  styles: styles$a
});

var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
class RadioGroup extends FASTRadioGroup {
  constructor() {
    super(...arguments);
    this.stacked = false;
  }
}
__decorateClass$7([attr({
  mode: "boolean"
})], RadioGroup.prototype, "stacked", 2);

const styles$9 = css`
  ${display("flex")}

  :host{align-items:flex-start;flex-direction:column;row-gap:${spacingVerticalS}}:host([disabled]) ::slotted([role='radio']){--control-border-color:${colorNeutralForegroundDisabled};--checked-indicator-background-color:${colorNeutralForegroundDisabled};--state-color:${colorNeutralForegroundDisabled}}::slotted([slot='label']){color:${colorNeutralForeground1};padding:${spacingVerticalS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalXS};font:${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};cursor:default}.positioning-region{display:flex;flex-wrap:wrap}:host([orientation='vertical']) .positioning-region{flex-direction:column;justify-content:flex-start}:host([orientation='horizontal']) .positioning-region{flex-direction:row}:host([orientation='horizontal']) ::slotted([role='radio']){padding-inline-end:${spacingHorizontalS}}:host([orientation='horizontal'][stacked]) ::slotted([role='radio']){display:flex;flex-direction:column;padding-inline:${spacingHorizontalS};height:auto;align-items:center;justify-content:center}:host([disabled]) ::slotted([role='radio']){pointer-events:none}`;

const template$9 = radioGroupTemplate();

const definition$9 = RadioGroup.compose({
  name: `${FluentDesignSystem.prefix}-radio-group`,
  template: template$9,
  styles: styles$9
});

var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
class Slider extends FASTSlider {
  handleChange(source, propertyName) {
    switch (propertyName) {
      case "min":
      case "max":
      case "step":
        this.handleStepStyles();
        break;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    Observable.getNotifier(this).subscribe(this, "max");
    Observable.getNotifier(this).subscribe(this, "min");
    Observable.getNotifier(this).subscribe(this, "step");
    this.handleStepStyles();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    Observable.getNotifier(this).unsubscribe(this, "max");
    Observable.getNotifier(this).unsubscribe(this, "min");
    Observable.getNotifier(this).unsubscribe(this, "step");
  }
  handleStepStyles() {
    if (this.step) {
      const totalSteps = 100 / Math.floor((this.max - this.min) / this.step);
      if (this.stepStyles !== void 0) {
        this.$fastController.removeStyles(this.stepStyles);
      }
      this.stepStyles = css`
        :host{--step-rate:${totalSteps}%;color:blue}`;
      this.$fastController.addStyles(this.stepStyles);
    } else if (this.stepStyles !== void 0) {
      this.$fastController.removeStyles(this.stepStyles);
    }
  }
}
__decorateClass$6([attr], Slider.prototype, "size", 2);

const SliderSize = {
  small: "small",
  medium: "medium"
};

const styles$8 = css`
  ${display("inline-grid")} :host{--thumb-size:18px;--thumb-padding:3px;--thumb-translate:calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);--track-overhang:-2px;--track-width:4px;--fast-slider-height:calc(var(--thumb-size) * 10);--slider-direction:90deg;align-items:center;box-sizing:border-box;outline:none;cursor:pointer;user-select:none;border-radius:${borderRadiusSmall};touch-action:pan-y;min-width:calc(var(--thumb-size) * 1px);width:100%}:host([size='small']){--thumb-size:14px;--track-width:2px;--thumb-padding:3px}:host([orientation='vertical']){--slider-direction:0deg;height:160px;min-height:var(--thumb-size);touch-action:pan-x;padding:8px 0;width:auto;min-width:auto}:host([disabled]:hover){cursor:initial}:host(:focus-visible){box-shadow:0 0 0 2pt ${colorStrokeFocus2};outline:1px solid ${colorStrokeFocus1}}.thumb-cursor:focus{outline:0}.thumb-container{position:absolute;height:var(--thumb-size);width:var(--thumb-size);transition:all 0.2s ease}.thumb-container{transform:translateX(calc(var(--thumb-size) * 0.5)) translateY(calc(var(--thumb-translate) * -1.5))}:host([size='small']) .thumb-container{transform:translateX(calc(var(--thumb-size) * 0.5)) translateY(calc(var(--thumb-translate) * -1.35))}:host([orientation='vertical']) .thumb-container{transform:translateX(calc(var(--thumb-translate) * -1.5)) translateY(calc(var(--thumb-size) * -0.5))}:host([orientation='vertical'][size='small']) .thumb-container{transform:translateX(calc(var(--thumb-translate) * -1.35)) translateY(calc(var(--thumb-size) * -0.5))}.thumb-cursor{height:var(--thumb-size);width:var(--thumb-size);background-color:${colorBrandBackground};border-radius:${borderRadiusCircular};box-shadow:inset 0 0 0 var(--thumb-padding) ${colorNeutralBackground1},0 0 0 1px ${colorNeutralStroke1}}.thumb-cursor:hover{background-color:${colorCompoundBrandBackgroundHover}}.thumb-cursor:active{background-color:${colorCompoundBrandBackgroundPressed}}:host([disabled]) .thumb-cursor{background-color:${colorNeutralForegroundDisabled};box-shadow:inset 0 0 0 var(--thumb-padding) ${colorNeutralBackground1},0 0 0 1px ${colorNeutralStrokeDisabled}}.positioning-region{position:relative;display:grid}:host([orientation='horizontal']) .positioning-region{margin:0 8px;grid-template-rows:var(--thumb-size) var(--thumb-size)}:host([orientation='vertical']) .positioning-region{margin:8px 0;height:100%;grid-template-columns:var(--thumb-size) var(--thumb-size)}.track{align-self:start;position:absolute;background-color:${colorNeutralStrokeAccessible};border-radius:${borderRadiusMedium};overflow:hidden}:host([step]) .track::after{content:'';position:absolute;border-radius:${borderRadiusMedium};width:100%;inset:0 2px;background-image:repeating-linear-gradient(
      var(--slider-direction),#0000 0%,#0000 calc(var(--step-rate) - 1px),${colorNeutralBackground1} calc(var(--step-rate) - 1px),${colorNeutralBackground1} var(--step-rate)
    )}:host([orientation='vertical'][step]) .track::after{inset:-2px 0}:host([disabled]) .track{background-color:${colorNeutralBackgroundDisabled}}:host([orientation='horizontal']) .track{right:var(--track-overhang);left:var(--track-overhang);align-self:start;height:var(--track-width);grid-row:2 / auto}:host([orientation='vertical']) .track{top:var(--track-overhang);bottom:var(--track-overhang);width:var(--track-width);height:100%;grid-column:2 / auto}.track-start{background-color:${colorCompoundBrandBackground};position:absolute;height:100%;left:0;border-radius:${borderRadiusMedium}}:host([disabled]) .track-start{background-color:${colorNeutralForegroundDisabled}}:host(:hover) .track-start{background-color:${colorCompoundBrandBackgroundHover}}:host([disabled]:hover) .track-start{background-color:${colorNeutralForegroundDisabled}}.track-start:active{background-color:${colorCompoundBrandBackgroundPressed}}:host([orientation='vertical']) .track-start{height:auto;width:100%;bottom:0}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    .track:hover,.track:active,.track{background:WindowText}.thumb-cursor:hover,.thumb-cursor:active,.thumb-cursor{background:ButtonText}:host(:hover) .track-start,.track-start:active,.track-start{background:Highlight}`));

const template$8 = sliderTemplate({
  thumb: `<div class="thumb-cursor" tabindex="0"></div>`
});

const definition$8 = Slider.compose({
  name: `${FluentDesignSystem.prefix}-slider`,
  template: template$8,
  styles: styles$8
});

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
class Spinner extends FASTProgressRing {}
__decorateClass$5([attr], Spinner.prototype, "size", 2);
__decorateClass$5([attr], Spinner.prototype, "appearance", 2);

const SpinnerAppearance = {
  primary: "primary",
  inverted: "inverted"
};
const SpinnerSize = {
  tiny: "tiny",
  extraSmall: "extra-small",
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extra-large",
  huge: "huge"
};

const template$7 = progressRingTemplate({
  indeterminateIndicator: `
    <svg class="progress" part="progress" viewBox="0 0 16 16">
        <circle
            class="background"
            part="background"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
        <circle
            class="indeterminate-indicator-1"
            part="indeterminate-indicator-1"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
    </svg>
  `
});

const styles$7 = css`
  ${display("flex")}

  :host{display:flex;align-items:center;height:32px;width:32px;contain:content}:host([size='tiny']){height:20px;width:20px}:host([size='extra-small']){height:24px;width:24px}:host([size='small']){height:28px;width:28px}:host([size='large']){height:36px;width:36px}:host([size='extra-large']){height:40px;width:40px}:host([size='huge']){height:44px;width:44px}.progress{height:100%;width:100%}.background{fill:none;stroke:${colorBrandStroke2};stroke-width:1.5px}:host([appearance='inverted']) .background{stroke:rgba(255,255,255,0.2)}.determinate{stroke:${colorBrandStroke1};fill:none;stroke-width:1.5px;stroke-linecap:round;transform-origin:50% 50%;transform:rotate(-90deg);transition:all 0.2s ease-in-out}:host([appearance='inverted']) .determinite{stroke:${colorNeutralStrokeOnBrand2}}.indeterminate-indicator-1{stroke:${colorBrandStroke1};fill:none;stroke-width:1.5px;stroke-linecap:round;transform-origin:50% 50%;transform:rotate(-90deg);transition:all 0.2s ease-in-out;animation:spin-infinite 3s cubic-bezier(0.53,0.21,0.29,0.67) infinite}:host([appearance='inverted']) .indeterminate-indicator-1{stroke:${colorNeutralStrokeOnBrand2}}@keyframes spin-infinite{0%{stroke-dasharray:0.01px 43.97px;transform:rotate(0deg)}50%{stroke-dasharray:21.99px 21.99px;transform:rotate(450deg)}100%{stroke-dasharray:0.01px 43.97px;transform:rotate(1080deg)}}`;

const definition$7 = Spinner.compose({
  name: `${FluentDesignSystem.prefix}-spinner`,
  template: template$7,
  styles: styles$7
});

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
class Switch extends FASTSwitch {}
__decorateClass$4([attr({
  attribute: "label-position"
})], Switch.prototype, "labelPosition", 2);

const SwitchLabelPosition = {
  above: "above",
  after: "after",
  before: "before"
};

const template$6 = switchTemplate({
  switch: `<span class="checked-indicator" part="checked-indicator"></span>`
});

const styles$6 = css`
  ${display("inline-flex")}

  :host{align-items:center;flex-direction:row-reverse;outline:none;user-select:none;contain:content}:host([label-position='before']){flex-direction:row}:host([label-position='above']){flex-direction:column;align-items:flex-start}:host([disabled]) .label,:host([readonly]) .label,:host([readonly]) .switch,:host([disabled]) .switch{cursor:not-allowed}.label{position:relative;color:${colorNeutralForeground1};line-height:${lineHeightBase300};font-size:${fontSizeBase300};font-weight:${fontWeightRegular};font-family:${fontFamilyBase};padding:${spacingVerticalXS} ${spacingHorizontalXS};cursor:pointer}.label__hidden{display:none}.switch{display:flex;align-items:center;padding:0 ${spacingHorizontalXXS};box-sizing:border-box;width:40px;height:20px;background-color:${colorTransparentBackground};border:1px solid ${colorNeutralStrokeAccessible};border-radius:${borderRadiusCircular};outline:none;cursor:pointer;margin:${spacingVerticalS} ${spacingHorizontalS}}:host(:hover) .switch{background:none;border-color:${colorNeutralStrokeAccessibleHover}}:host(:active) .switch{border-color:${colorNeutralStrokeAccessiblePressed}}:host([disabled]) .switch,:host([readonly]) .switch{border:1px solid ${colorNeutralStrokeDisabled};background-color:none;pointer:default}:host([aria-checked='true']) .switch{background:${colorCompoundBrandBackground}}:host([aria-checked='true']:hover) .switch{background:${colorCompoundBrandBackgroundHover};border-color:${colorCompoundBrandBackgroundHover}}:host([aria-checked='true']:active) .switch{background:${colorCompoundBrandBackgroundPressed};border-color:${colorCompoundBrandBackgroundPressed}}:host([aria-checked='true'][disabled]) .switch{background:${colorNeutralBackgroundDisabled};border-color:${colorNeutralStrokeDisabled}}.checked-indicator{height:14px;width:14px;border-radius:50%;margin-inline-start:0;background-color:${colorNeutralForeground3};transition-duration:${durationNormal};transition-timing-function:${curveEasyEase};transition-property:margin-inline-start}:host([aria-checked='true']) .checked-indicator{background-color:${colorNeutralForegroundInverted};margin-inline-start:calc(100% - 14px)}:host([aria-checked='true']:hover) .checked-indicator{background:${colorNeutralForegroundInvertedHover}}:host([aria-checked='true']:active) .checked-indicator{background:${colorNeutralForegroundInvertedPressed}}:host(:hover) .checked-indicator{background-color:${colorNeutralForeground3Hover}}:host(:active) .checked-indicator{background-color:${colorNeutralForeground3Pressed}}:host([disabled]) .checked-indicator,:host([readonly]) .checked-indicator{background:${colorNeutralForegroundDisabled}}:host([aria-checked='true'][disabled]) .checked-indicator{background:${colorNeutralForegroundDisabled}}:host(:focus-visible){border-color:${colorTransparentStroke};outline:${strokeWidthThick} solid ${colorTransparentStroke};box-shadow:${shadow4},0 0 0 2px ${colorStrokeFocus2}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    .switch{border-color:InactiveBorder}:host([aria-checked='true']) .switch,:host([aria-checked='true']:active) .switch,:host([aria-checked='true']:hover) .switch{background:Highlight;border-color:Highlight}.checked-indicator,:host(:hover) .checked-indicator,:host(:active) .checked-indicator{background-color:ActiveCaption}:host([aria-checked='true']) .checked-indicator,:host([aria-checked='true']:hover) .checked-indicator,:host([aria-checked='true']:active) .checked-indicator{background-color:ButtonFace}`));

const definition$6 = Switch.compose({
  name: `${FluentDesignSystem.prefix}-switch`,
  template: template$6,
  styles: styles$6
});

const TabsAppearance = {
  subtle: "subtle",
  transparent: "transparent"
};
const TabsSize = {
  small: "small",
  medium: "medium",
  large: "large"
};

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
class Tabs extends FASTTabs {
  constructor() {
    super(...arguments);
    this.activeTabData = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    this.previousActiveTabData = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    this.activeTabOffset = 0;
    this.activeTabScale = 1;
    this.appearance = TabsAppearance.transparent;
  }
  calculateAnimationProperties(tab) {
    this.activeTabOffset = this.getTabPosition(tab);
    this.activeTabScale = this.getTabScale(tab);
  }
  getTabPosition(tab) {
    if (this.orientation === TabsOrientation.horizontal) {
      return this.previousActiveTabData.x - (tab.getBoundingClientRect().x - this.getBoundingClientRect().x);
    } else return this.previousActiveTabData.y - (tab.getBoundingClientRect().y - this.getBoundingClientRect().y);
  }
  getTabScale(tab) {
    if (this.orientation === TabsOrientation.horizontal) {
      return this.previousActiveTabData.width / tab.getBoundingClientRect().width;
    } else return this.previousActiveTabData.height / tab.getBoundingClientRect().height;
  }
  applyUpdatedCSSValues(tab) {
    this.calculateAnimationProperties(tab);
    this.setTabScaleCSSVar();
    this.setTabOffsetCSSVar();
  }
  animationLoop(tab) {
    tab.setAttribute("data-animate", "false");
    this.applyUpdatedCSSValues(tab);
    this.previousActiveTabData = this.activeTabData;
    this.applyUpdatedCSSValues(tab);
    tab.setAttribute("data-animate", "true");
  }
  setTabData() {
    var _a, _b, _c, _d;
    if (this.tabs && this.tabs.length > 0) {
      const tabs = this.tabs;
      const activeTab = this.activetab || tabs[0];
      const activeRect = activeTab == null ? void 0 : activeTab.getBoundingClientRect();
      const parentRect = this.getBoundingClientRect();
      this.activeTabData = {
        x: activeRect.x - parentRect.x,
        y: activeRect.y - parentRect.y,
        height: activeRect.height,
        width: activeRect.width
      };
      if (((_a = this.previousActiveTabData) == null ? void 0 : _a.x) !== ((_b = this.activeTabData) == null ? void 0 : _b.x) && ((_c = this.previousActiveTabData) == null ? void 0 : _c.y) !== ((_d = this.activeTabData) == null ? void 0 : _d.y)) {
        this.previousActiveTabData = this.activeTabData;
      }
    }
  }
  setTabOffsetCSSVar() {
    this.styles = css`
      :host{--tabIndicatorOffset:${this.activeTabOffset.toString()}px}`;
    this.$fastController.addStyles(this.styles);
  }
  setTabScaleCSSVar() {
    this.styles = css`
      :host{--tabIndicatorScale:${this.activeTabScale.toString()}}`;
    this.$fastController.addStyles(this.styles);
  }
  activeidChanged(oldValue, newValue) {
    super.activeidChanged(oldValue, newValue);
    this.setTabData();
    if (this.activetab) {
      this.animationLoop(this.activetab);
    }
  }
  tabsChanged() {
    super.tabsChanged();
    this.setTabData();
  }
}
__decorateClass$3([attr], Tabs.prototype, "appearance", 2);
__decorateClass$3([attr({
  mode: "boolean"
})], Tabs.prototype, "disabled", 2);
__decorateClass$3([attr], Tabs.prototype, "size", 2);

const template$5 = tabsTemplate({});

const styles$5 = css`
  ${display("grid")}

  :host{box-sizing:border-box;font-family:${fontFamilyBase};font-size:${fontSizeBase300};line-height:${lineHeightBase300};color:${colorNeutralForeground2};grid-template-columns:auto 1fr auto;grid-template-rows:auto 1fr}:host([disabled]){cursor:not-allowed;color:${colorNeutralForegroundDisabled}}:host([disabled]) ::slotted(fluent-tab){pointer-events:none;cursor:not-allowed;color:${colorNeutralForegroundDisabled}}:host([disabled]) ::slotted(fluent-tab:after){background-color:${colorNeutralForegroundDisabled}}:host([disabled]) ::slotted(fluent-tab[aria-selected='true'])::after{background-color:${colorNeutralForegroundDisabled}}:host([disabled]) ::slotted(fluent-tab:hover):before{content:unset}:host ::slotted(fluent-tab){border-radius:${borderRadiusMedium}}:host ::slotted(fluent-tab[aria-selected='true'])::before{background-color:${colorNeutralForegroundDisabled}}.tablist{display:grid;grid-template-rows:auto auto;grid-template-columns:auto;position:relative;width:max-content;align-self:end;box-sizing:border-box}::slotted([slot='start']),::slotted([slot='end']){display:flex;align-self:center}::slotted([slot='start']){margin-inline-end:11px}::slotted([slot='end']){margin-inline-start:11px}.tabpanel{grid-row:2;grid-column-start:1;grid-column-end:4;position:relative}:host([orientation='vertical']){grid-template-rows:auto 1fr auto;grid-template-columns:auto 1fr}:host([orientation='vertical']) .tablist{grid-row-start:2;grid-row-end:2;display:grid;grid-template-rows:auto;grid-template-columns:auto 1fr;position:relative;width:max-content;justify-self:end;align-self:flex-start;width:100%}:host([orientation='vertical']) .tabpanel{grid-column:2;grid-row-start:1;grid-row-end:4}:host([orientation='vertical']) ::slotted([slot='end']){grid-row:3}:host([appearance='subtle']) ::slotted(fluent-tab:hover){background-color:${colorSubtleBackgroundHover};color:${colorNeutralForeground1Hover};fill:${colorCompoundBrandForeground1Hover}}:host([appearance='subtle']) ::slotted(fluent-tab:active){background-color:${colorSubtleBackgroundPressed};fill:${colorSubtleBackgroundPressed};color:${colorNeutralForeground1}}:host([size='small']) ::slotted(fluent-tab){font-size:${fontSizeBase300};line-height:${lineHeightBase300};padding:${spacingVerticalSNudge} ${spacingHorizontalSNudge}}:host([size='large']) ::slotted(fluent-tab){font-size:${fontSizeBase400};line-height:${lineHeightBase400};padding:${spacingVerticalL} ${spacingHorizontalMNudge}}:host ::slotted(fluent-tab[data-animate='true'])::after{transition-property:transform;transition-duration:${durationSlow};transition-timing-function:${curveDecelerateMax}}:host ::slotted(fluent-tab)::after{height:${strokeWidthThicker};margin-top:auto;transform-origin:left;transform:translateX(var(--tabIndicatorOffset)) scaleX(var(--tabIndicatorScale))}:host([orientation='vertical']) ::slotted(fluent-tab)::after{width:${strokeWidthThicker};height:unset;margin-top:unset;transform-origin:top;transform:translateY(var(--tabIndicatorOffset)) scaleY(var(--tabIndicatorScale))}:host ::slotted(fluent-tab)::before{height:${strokeWidthThicker};border-radius:${borderRadiusCircular};content:'';inset:0;position:absolute;margin-top:auto}:host([orientation='vertical']) ::slotted(fluent-tab)::before{height:unset;width:${strokeWidthThicker};margin-inline-end:auto;transform-origin:top}:host ::slotted(fluent-tab[aria-selected='false']:hover)::after{height:${strokeWidthThicker};margin-top:auto;transform-origin:left}:host([orientation='vertical']) ::slotted(fluent-tab[aria-selected='false']:hover)::after{height:unset;margin-inline-end:auto;transform-origin:top;width:${strokeWidthThicker}}:host([orientation='vertical']) ::slotted(fluent-tab){align-items:flex-start;grid-column:2;padding-top:${spacingVerticalSNudge};padding-bottom:${spacingVerticalSNudge}}:host([orientation='vertical'][size='small']) ::slotted(fluent-tab){padding-top:${spacingVerticalXXS};padding-bottom:${spacingVerticalXXS}}:host([orientation='vertical'][size='large']) ::slotted(fluent-tab){padding-top:${spacingVerticalS};padding-bottom:${spacingVerticalS}}:host([size='small']) ::slotted(fluent-tab)::after,:host([size='small']) ::slotted(fluent-tab)::before,:host([size='small']) ::slotted(fluent-tab:hover)::after{right:${spacingHorizontalSNudge};left:${spacingHorizontalSNudge}}:host ::slotted(fluent-tab)::after,:host ::slotted(fluent-tab)::before,:host ::slotted(fluent-tab:hover)::after{right:${spacingHorizontalMNudge};left:${spacingHorizontalMNudge}}:host([size='large']) ::slotted(fluent-tab)::after,:host([size='large']) ::slotted(fluent-tab)::before,:host([size='large']) ::slotted(fluent-tab:hover)::after{right:${spacingHorizontalMNudge};left:${spacingHorizontalMNudge}}:host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::after,:host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::before,:host([orientation='vertical'][size='small']) ::slotted(fluent-tab:hover)::after{right:0;left:0;top:${spacingVerticalSNudge};bottom:${spacingVerticalSNudge}}:host([orientation='vertical']) ::slotted(fluent-tab)::after,:host([orientation='vertical']) ::slotted(fluent-tab)::before,:host([orientation='vertical']) ::slotted(fluent-tab:hover)::after{right:0;left:0;top:${spacingVerticalS};bottom:${spacingVerticalS}}:host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::after,:host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::before,:host([orientation='vertical'][size='large']) ::slotted(fluent-tab:hover)::after{right:0;left:0;top:${spacingVerticalMNudge};bottom:${spacingVerticalMNudge}}`;

const definition$5 = Tabs.compose({
  name: `${FluentDesignSystem.prefix}-tabs`,
  template: template$5,
  styles: styles$5
});

class Tab extends FASTTab {
  connectedCallback() {
    super.connectedCallback();
    if (this.styles !== void 0) {
      this.$fastController.removeStyles(this.styles);
    }
    this.styles = css`
      :host{--textContent:'${this.textContent}'}`;
    this.$fastController.addStyles(this.styles);
  }
}

function tabTemplate(options = {}) {
  return html`<template slot="tab" role="tab" aria-disabled="${x => x.disabled}">${startSlotTemplate(options)}<span class="tab-content"><slot></slot></span>${endSlotTemplate(options)}</template>`;
}
const template$4 = tabTemplate({});

const styles$4 = css`
  ${display("inline-flex")}

  :host{position:relative;flex-direction:column;cursor:pointer;box-sizing:border-box;justify-content:center;line-height:${lineHeightBase300};font-family:${fontFamilyBase};font-size:${fontSizeBase300};color:${colorNeutralForeground2};fill:currentcolor;grid-row:1;padding:${spacingHorizontalM} ${spacingHorizontalMNudge};border-radius:${borderRadiusMedium}}:host .tab-content{display:inline-flex;flex-direction:column;padding:0 2px}:host([aria-selected='true']){color:${colorNeutralForeground1};font-weight:${fontWeightSemibold}}:host .tab-content::after{content:var(--textContent);visibility:hidden;height:0;line-height:${lineHeightBase300};font-weight:${fontWeightSemibold}}:host([aria-selected='true'])::after{background-color:${colorCompoundBrandStroke};border-radius:${borderRadiusCircular};content:'';inset:0;position:absolute;z-index:2}:host([aria-selected='false']:hover)::after{background-color:${colorNeutralStroke1Hover};border-radius:${borderRadiusCircular};content:'';inset:0;position:absolute;z-index:1}:host([aria-selected='true'][disabled])::after{background-color:${colorNeutralForegroundDisabled}}::slotted([slot='start']),::slotted([slot='end']){display:flex}::slotted([slot='start']){margin-inline-end:11px}::slotted([slot='end']){margin-inline-start:11px}:host([disabled]){cursor:not-allowed;fill:${colorNeutralForegroundDisabled};color:${colorNeutralForegroundDisabled}}:host([disabled]:hover)::after{background-color:unset}:host(:focus){outline:none}:host(:focus-visible){border-radius:${borderRadiusSmall};box-shadow:0 0 0 3px ${colorStrokeFocus2};outline:1px solid ${colorStrokeFocus1}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    :host([aria-selected='true'])::after{background-color:Highlight}`));

const definition$4 = Tab.compose({
  name: `${FluentDesignSystem.prefix}-tab`,
  template: template$4,
  styles: styles$4
});

class TabPanel extends FASTTabPanel {}

const template$3 = tabPanelTemplate();

const styles$3 = css`
  ${display("block")}

  :host{box-sizing:border-box;padding:${spacingHorizontalM} ${spacingHorizontalMNudge}}`;

const definition$3 = TabPanel.compose({
  name: `${FluentDesignSystem.prefix}-tab-panel`,
  template: template$3,
  styles: styles$3
});

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
class Text extends FASTElement {
  constructor() {
    super(...arguments);
    this.nowrap = false;
    this.truncate = false;
    this.italic = false;
    this.underline = false;
    this.strikethrough = false;
    this.block = false;
  }
}
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "nowrap", 2);
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "truncate", 2);
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "italic", 2);
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "underline", 2);
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "strikethrough", 2);
__decorateClass$2([attr({
  mode: "boolean"
})], Text.prototype, "block", 2);
__decorateClass$2([attr], Text.prototype, "size", 2);
__decorateClass$2([attr], Text.prototype, "font", 2);
__decorateClass$2([attr], Text.prototype, "weight", 2);
__decorateClass$2([attr], Text.prototype, "align", 2);

const TextSize = {
  _100: "100",
  _200: "200",
  _300: "300",
  _400: "400",
  _500: "500",
  _600: "600",
  _700: "700",
  _800: "800",
  _900: "900",
  _1000: "1000"
};
const TextFont = {
  base: "base",
  numeric: "numeric",
  monospace: "monospace"
};
const TextWeight = {
  medium: "medium",
  regular: "regular",
  semibold: "semibold",
  bold: "bold"
};
const TextAlign = {
  start: "start",
  end: "end",
  center: "center",
  justify: "justify"
};

const template$2 = html`<slot></slot>`;

const styles$2 = css`
  ${display("inline")}

  :host{contain:content}::slotted(*){font-family:${fontFamilyBase};font-size:${fontSizeBase300};line-height:${lineHeightBase300};font-weight:${fontWeightRegular};text-align:start;white-space:normal;overflow:visible;text-overflow:clip;margin:0;display:inline}:host([nowrap]) ::slotted(*){white-space:nowrap;overflow:hidden}:host([truncate]) ::slotted(*){text-overflow:ellipsis}:host([block]),:host([block]) ::slotted(*){display:block}:host([italic]) ::slotted(*){font-style:italic}:host([underline]) ::slotted(*){text-decoration-line:underline}:host([strikethrough]) ::slotted(*){text-decoration-line:line-through}:host([underline][strikethrough]) ::slotted(*){text-decoration-line:line-through underline}:host([size='100']) ::slotted(*){font-size:${fontSizeBase100};line-height:${lineHeightBase100}}:host([size='200']) ::slotted(*){font-size:${fontSizeBase200};line-height:${lineHeightBase200}}:host([size='400']) ::slotted(*){font-size:${fontSizeBase400};line-height:${lineHeightBase400}}:host([size='500']) ::slotted(*){font-size:${fontSizeBase500};line-height:${lineHeightBase500}}:host([size='600']) ::slotted(*){font-size:${fontSizeBase600};line-height:${lineHeightBase600}}:host([size='700']) ::slotted(*){font-size:${fontSizeHero700};line-height:${lineHeightHero700}}:host([size='800']) ::slotted(*){font-size:${fontSizeHero800};line-height:${lineHeightHero800}}:host([size='900']) ::slotted(*){font-size:${fontSizeHero900};line-height:${lineHeightHero900}}:host([size='1000']) ::slotted(*){font-size:${fontSizeHero1000};line-height:${lineHeightHero1000}}:host([font='monospace']) ::slotted(*){font-family:${fontFamilyMonospace}}:host([font='numeric']) ::slotted(*){font-family:${fontFamilyNumeric}}:host([weight='medium']) ::slotted(*){font-weight:${fontWeightMedium}}:host([weight='semibold']) ::slotted(*){font-weight:${fontWeightSemibold}}:host([weight='bold']) ::slotted(*){font-weight:${fontWeightBold}}:host([align='center']) ::slotted(*){text-align:center}:host([align='end']) ::slotted(*){text-align:end}:host([align='justify']) ::slotted(*){text-align:justify}`;

const definition$2 = Text.compose({
  name: `${FluentDesignSystem.prefix}-text`,
  template: template$2,
  styles: styles$2
});

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
class TextInput extends FASTTextField {}
__decorateClass$1([attr({
  attribute: "control-size"
})], TextInput.prototype, "controlSize", 2);
__decorateClass$1([attr], TextInput.prototype, "appearance", 2);

const TextInputControlSize = {
  small: "small",
  medium: "medium",
  large: "large"
};
const TextInputAppearance = {
  outline: "outline",
  underline: "underline",
  filledLighter: "filled-lighter",
  filledDarker: "filled-darker"
};

const template$1 = textFieldTemplate();

const styles$1 = css`
  ${display("block")}

  :host{font-family:${fontFamilyBase};font-size:${fontSizeBase300};font-weight:${fontWeightRegular};line-height:${lineHeightBase300};max-width:400px}.label{display:flex;color:${colorNeutralForeground1};padding-bottom:${spacingVerticalXS};flex-shrink:0;padding-inline-end:${spacingHorizontalXS}}.label__hidden{display:none}.root{position:relative;box-sizing:border-box;height:32px;display:inline-flex;align-items:center;flex-direction:row;width:100%;padding:0 ${spacingHorizontalMNudge};border:${strokeWidthThin} solid ${colorNeutralStroke1};border-bottom-color:${colorNeutralStrokeAccessible};border-radius:${borderRadiusMedium};gap:${spacingHorizontalXXS}}.root::after{box-sizing:border-box;content:'';position:absolute;left:-1px;bottom:0px;right:-1px;height:max(2px,${borderRadiusMedium});border-radius:0 0 ${borderRadiusMedium} ${borderRadiusMedium};border-bottom:2px solid ${colorCompoundBrandStroke};clip-path:inset(calc(100% - 2px) 1px 0px);transform:scaleX(0);transition-property:transform;transition-duration:${durationUltraFast};transition-delay:${curveAccelerateMid}}.control{width:100%;height:100%;box-sizing:border-box;color:${colorNeutralForeground1};border-radius:${borderRadiusMedium};background:${colorTransparentBackground};font-family:${fontFamilyBase};font-weight:${fontWeightRegular};font-size:${fontSizeBase300};border:none;background:transparent;vertical-align:center}.control:focus-visible{outline:0;border:0}.control::placeholder{color:${colorNeutralForeground4}}:host ::slotted([slot='start']),:host ::slotted([slot='end']){display:flex;align-items:center;justify-content:center;color:${colorNeutralForeground3};font-size:${fontSizeBase500}}:host ::slotted([slot='start']){padding-right:${spacingHorizontalXXS}}:host ::slotted([slot='end']){padding-left:${spacingHorizontalXXS};gap:${spacingHorizontalXS}}:host(:hover) .root{border-color:${colorNeutralStroke1Hover};border-bottom-color:${colorNeutralStrokeAccessibleHover}}:host(:active) .root{border-color:${colorNeutralStroke1Pressed}}:host(:focus-within) .root{outline:transparent solid 2px;border-bottom:0}:host(:focus-within) .root::after{transform:scaleX(1);transition-property:transform;transition-duration:${durationNormal};transition-delay:${curveDecelerateMid}}:host(:focus-within:active) .root:after{border-bottom-color:${colorCompoundBrandStrokePressed}}:host([appearance='outline']:focus-within) .root{border:${strokeWidthThin} solid ${colorNeutralStroke1}}:host(:focus-within) .control{color:${colorNeutralForeground1}}:host([disabled]) .root{background:${colorTransparentBackground};border:${strokeWidthThin} solid ${colorNeutralStrokeDisabled}}:host([disabled]) .control::placeholder,:host([disabled]) ::slotted([slot='start']),:host([disabled]) ::slotted([slot='end']){color:${colorNeutralForegroundDisabled}}::selection{color:${colorNeutralForegroundInverted};background-color:${colorNeutralBackgroundInverted}}:host([control-size='small']) .control{font-size:${fontSizeBase200};font-weight:${fontWeightRegular};line-height:${lineHeightBase200}}:host([control-size='small']) .root{height:24px;gap:${spacingHorizontalXXS};padding:0 ${spacingHorizontalSNudge}}:host([control-size='small']) ::slotted([slot='start']),:host([control-size='small']) ::slotted([slot='end']){font-size:${fontSizeBase400}}:host([control-size='large']) .control{font-size:${fontSizeBase400};font-weight:${fontWeightRegular};line-height:${lineHeightBase400}}:host([control-size='large']) .root{height:40px;gap:${spacingHorizontalS};padding:0 ${spacingHorizontalM}}:host([control-size='large']) ::slotted([slot='start']),:host([control-size='large']) ::slotted([slot='end']){font-size:${fontSizeBase600}}:host([appearance='underline']) .root{background:${colorTransparentBackground};border:0;border-radius:0;border-bottom:${strokeWidthThin} solid ${colorNeutralStrokeAccessible}}:host([appearance='underline']:hover) .root{border-bottom-color:${colorNeutralStrokeAccessibleHover}}:host([appearance='underline']:active) .root{border-bottom-color:${colorNeutralStrokeAccessiblePressed}}:host([appearance='underline']:focus-within) .root{border:0;border-bottom-color:${colorNeutralStrokeAccessiblePressed}}:host([appearance='underline'][disabled]) .root{border-bottom-color:${colorNeutralStrokeDisabled}}:host([appearance='filled-lighter']) .root,:host([appearance='filled-darker']) .root{border:${strokeWidthThin} solid ${colorTransparentStroke};box-shadow:${shadow2}}:host([appearance='filled-lighter']) .root{background:${colorNeutralBackground1}}:host([appearance='filled-darker']) .root{background:${colorNeutralBackground3}}:host([appearance='filled-lighter']:hover) .root,:host([appearance='filled-darker']:hover) .root{border-color:${colorTransparentStrokeInteractive}}:host([appearance='filled-lighter']:active) .root,:host([appearance='filled-darker']:active) .root{border-color:${colorTransparentStrokeInteractive};background:${colorNeutralBackground3}}`;

const definition$1 = TextInput.compose({
  name: `${FluentDesignSystem.prefix}-text-input`,
  template: template$1,
  styles: styles$1
});

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
class ToggleButton extends Button {
  constructor() {
    super();
    this.dirtyChecked = false;
    this.checkedAttribute = false;
    this.defaultChecked = false;
    this.checked = false;
    this.currentChecked = false;
    this.handleToggleButtonClick = e => {
      if (!this.disabled && !this.disabledFocusable) {
        this.checked = !this.checked;
      }
    };
    this.dirtyChecked = false;
  }
  checkedAttributeChanged() {
    this.defaultChecked = this.checkedAttribute;
  }
  defaultCheckedChanged() {
    if (!this.dirtyChecked) {
      this.checked = this.defaultChecked;
      this.dirtyChecked = false;
    }
  }
  checkedChanged(prev, next) {
    if (!this.$fastController.isConnected) {
      return;
    }
    if (!this.dirtyChecked) {
      this.dirtyChecked = true;
    }
    this.currentChecked = this.checked;
    this.setAttribute("aria-pressed", `${this.currentChecked}`);
    if (prev !== void 0) {
      this.$emit("change");
    }
  }
  currentCheckedChanged(prev, next) {
    this.checked = this.currentChecked;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleToggleButtonClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleToggleButtonClick);
  }
}
__decorateClass([attr({
  attribute: "checked",
  mode: "boolean"
})], ToggleButton.prototype, "checkedAttribute", 2);
__decorateClass([observable], ToggleButton.prototype, "defaultChecked", 2);
__decorateClass([observable], ToggleButton.prototype, "checked", 2);
__decorateClass([attr({
  attribute: "current-checked",
  mode: "boolean"
})], ToggleButton.prototype, "currentChecked", 2);

const ToggleButtonAppearance = ButtonAppearance;
const ToggleButtonShape = ButtonShape;
const ToggleButtonSize = ButtonSize;

const template = buttonTemplate$1();

const styles = css`
  ${styles$p}

  :host([aria-pressed="true"]) .control{border-color:${colorNeutralStroke1};background-color:${colorNeutralBackground1Selected};color:${colorNeutralForeground1};border-width:${strokeWidthThin}}:host([aria-pressed='true']:hover) .control{border-color:${colorNeutralStroke1Hover};background-color:${colorNeutralBackground1Hover}}:host([aria-pressed='true']:active) .control{border-color:${colorNeutralStroke1Pressed};background-color:${colorNeutralBackground1Pressed}}:host([aria-pressed='true'][appearance='primary']) .control{border-color:transparent;background-color:${colorBrandBackgroundSelected};color:${colorNeutralForegroundOnBrand}}:host([aria-pressed='true'][appearance='primary']:hover) .control{background-color:${colorBrandBackgroundHover}}:host([aria-pressed='true'][appearance='primary']:active) .control{background-color:${colorBrandBackgroundPressed}}:host([aria-pressed='true'][appearance='subtle']) .control{border-color:transparent;background-color:${colorSubtleBackgroundSelected};color:${colorNeutralForeground2Selected}}:host([aria-pressed='true'][appearance='subtle']:hover) .control{background-color:${colorSubtleBackgroundHover};color:${colorNeutralForeground2Hover}}:host([aria-pressed='true'][appearance='subtle']:active) .control{background-color:${colorSubtleBackgroundPressed};color:${colorNeutralForeground2Pressed}}:host([aria-pressed='true'][appearance='outline']) .control,:host([aria-pressed='true'][appearance='transparent']) .control{background-color:${colorTransparentBackgroundSelected}}:host([aria-pressed='true'][appearance='outline']:hover) .control,:host([aria-pressed='true'][appearance='transparent']:hover) .control{background-color:${colorTransparentBackgroundHover}}:host([aria-pressed='true'][appearance='outline']:active) .control,:host([aria-pressed='true'][appearance='transparent']:active) .control{background-color:${colorTransparentBackgroundPressed}}:host([aria-pressed='true'][appearance='transparent']) .control{border-color:transparent;color:${colorNeutralForeground2BrandSelected}}:host([aria-pressed='true'][appearance='transparent']:hover) .control{color:${colorNeutralForeground2BrandHover}}:host([aria-pressed='true'][appearance='transparent']:active) .control{color:${colorNeutralForeground2BrandPressed}}`.withBehaviors(forcedColorsStylesheetBehavior(css`
    :host([aria-pressed='true']) .control,:host([aria-pressed='true'][appearance='primary']) .control,:host([aria-pressed='true'][appearance='subtle']) .control,:host([aria-pressed='true'][appearance='outline']) .control,:host([aria-pressed='true'][appearance='transparent']) .control,:host([aria-pressed='true'][appearance='transparent']) .control{background:SelectedItem;color:SelectedItemText}`));

const definition = ToggleButton.compose({
  name: `${FluentDesignSystem.prefix}-toggle-button`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true
  }
});

const tokenNames = Object.keys(tokens);
const setTheme = theme => {
  for (const t of tokenNames) {
    tokens[t].withDefault(theme[t]);
  }
};
const setThemeFor = (element, theme) => {
  for (const t of tokenNames) {
    tokens[t].setValueFor(element, theme[t]);
  }
};

export { Accordion, AccordionItem, AccordionItemExpandIconPosition, AccordionItemSize, AnchorButton, AnchorButtonAppearance, definition$q as AnchorButtonDefinition, AnchorButtonShape, AnchorButtonSize, template$q as AnchorButtonTemplate, Avatar, AvatarActive, AvatarAppearance, AvatarColor, definition$p as AvatarDefinition, AvatarNamedColor, AvatarShape, AvatarSize, styles$n as AvatarStyles, template$p as AvatarTemplate, Badge, BadgeAppearance, BadgeColor, definition$o as BadgeDefinition, BadgeShape, BadgeSize, styles$m as BadgeStyles, template$o as BadgeTemplate, Button, ButtonAppearance, definition$n as ButtonDefinition, ButtonShape, ButtonSize, styles$p as ButtonStyles, template$n as ButtonTemplate, Checkbox, definition$m as CheckboxDefinition, CheckboxLabelPosition, CheckboxShape, CheckboxSize, styles$l as CheckboxStyles, template$m as CheckboxTemplate, CompoundButton, CompoundButtonAppearance, definition$l as CompoundButtonDefinition, CompoundButtonShape, CompoundButtonSize, styles$k as CompoundButtonStyles, template$l as CompoundButtonTemplate, CounterBadge, CounterBadgeAppearance, CounterBadgeColor, definition$k as CounterBadgeDefinition, CounterBadgeShape, CounterBadgeSize, styles$j as CounterBadgeStyles, template$k as CounterBadgeTemplate, Dialog, definition$j as DialogDefinition, styles$i as DialogStyles, template$j as DialogTemplate, Divider, DividerAlignContent, DividerAppearance, definition$i as DividerDefinition, DividerOrientation, DividerRole, styles$h as DividerStyles, template$i as DividerTemplate, FluentDesignSystem, Image, definition$h as ImageDefinition, ImageFit, ImageShape, styles$g as ImageStyles, template$h as ImageTemplate, Label, definition$g as LabelDefinition, styles$f as LabelStyles, template$g as LabelTemplate, Menu, MenuButton, MenuButtonAppearance, definition$e as MenuButtonDefinition, MenuButtonShape, MenuButtonSize, styles$p as MenuButtonStyles, template$e as MenuButtonTemplate, definition$f as MenuDefinition, MenuItem, definition$d as MenuItemDefinition, MenuItemRole, styles$d as MenuItemStyles, template$d as MenuItemTemplate, MenuList, definition$c as MenuListDefinition, styles$c as MenuListStyles, template$c as MenuListTemplate, styles$e as MenuStyles, template$f as MenuTemplate, ProgressBar, definition$b as ProgressBarDefinition, ProgressBarShape, styles$b as ProgressBarStyles, template$b as ProgressBarTemplate, ProgressBarThickness, ProgressBarValidationState, Radio, definition$a as RadioDefinition, RadioGroup, definition$9 as RadioGroupDefinition, RadioGroupOrientation, styles$9 as RadioGroupStyles, template$9 as RadioGroupTemplate, styles$a as RadioStyles, template$a as RadioTemplate, Slider, definition$8 as SliderDefinition, SliderOrientation, SliderSize, styles$8 as SliderStyles, template$8 as SliderTemplate, Spinner, SpinnerAppearance, definition$7 as SpinnerDefinition, SpinnerSize, styles$7 as SpinnerStyles, template$7 as SpinnerTemplate, Switch, definition$6 as SwitchDefinition, SwitchLabelPosition, styles$6 as SwitchStyles, template$6 as SwitchTemplate, Tab, definition$4 as TabDefinition, TabPanel, definition$3 as TabPanelDefinition, styles$3 as TabPanelStyles, template$3 as TabPanelTemplate, styles$4 as TabStyles, template$4 as TabTemplate, Tabs, TabsAppearance, definition$5 as TabsDefinition, TabsOrientation, TabsSize, styles$5 as TabsStyles, template$5 as TabsTemplate, Text, TextAlign, definition$2 as TextDefinition, TextFont, TextInput, TextInputAppearance, TextInputControlSize, definition$1 as TextInputDefinition, styles$1 as TextInputStyles, template$1 as TextInputTemplate, TextFieldType as TextInputType, TextSize, styles$2 as TextStyles, template$2 as TextTemplate, TextWeight, ToggleButton, ToggleButtonAppearance, definition as ToggleButtonDefinition, ToggleButtonShape, ToggleButtonSize, styles as ToggleButtonStyles, template as ToggleButtonTemplate, definition$s as accordionDefinition, definition$r as accordionItemDefinition, styles$q as accordionItemStyles, template$r as accordionItemTemplate, styles$r as accordionStyles, template$s as accordionTemplate, borderRadiusCircular, borderRadiusLarge, borderRadiusMedium, borderRadiusNone, borderRadiusSmall, borderRadiusXLarge, colorBackgroundOverlay, colorBrandBackground, colorBrandBackground2, colorBrandBackgroundHover, colorBrandBackgroundInverted, colorBrandBackgroundInvertedHover, colorBrandBackgroundInvertedPressed, colorBrandBackgroundInvertedSelected, colorBrandBackgroundPressed, colorBrandBackgroundSelected, colorBrandBackgroundStatic, colorBrandForeground1, colorBrandForeground2, colorBrandForegroundInverted, colorBrandForegroundInvertedHover, colorBrandForegroundInvertedPressed, colorBrandForegroundLink, colorBrandForegroundLinkHover, colorBrandForegroundLinkPressed, colorBrandForegroundLinkSelected, colorBrandForegroundOnLight, colorBrandForegroundOnLightHover, colorBrandForegroundOnLightPressed, colorBrandForegroundOnLightSelected, colorBrandShadowAmbient, colorBrandShadowKey, colorBrandStroke1, colorBrandStroke2, colorCompoundBrandBackground, colorCompoundBrandBackgroundHover, colorCompoundBrandBackgroundPressed, colorCompoundBrandForeground1, colorCompoundBrandForeground1Hover, colorCompoundBrandForeground1Pressed, colorCompoundBrandStroke, colorCompoundBrandStrokeHover, colorCompoundBrandStrokePressed, colorNeutralBackground1, colorNeutralBackground1Hover, colorNeutralBackground1Pressed, colorNeutralBackground1Selected, colorNeutralBackground2, colorNeutralBackground2Hover, colorNeutralBackground2Pressed, colorNeutralBackground2Selected, colorNeutralBackground3, colorNeutralBackground3Hover, colorNeutralBackground3Pressed, colorNeutralBackground3Selected, colorNeutralBackground4, colorNeutralBackground4Hover, colorNeutralBackground4Pressed, colorNeutralBackground4Selected, colorNeutralBackground5, colorNeutralBackground5Hover, colorNeutralBackground5Pressed, colorNeutralBackground5Selected, colorNeutralBackground6, colorNeutralBackgroundDisabled, colorNeutralBackgroundInverted, colorNeutralBackgroundInvertedDisabled, colorNeutralBackgroundStatic, colorNeutralForeground1, colorNeutralForeground1Hover, colorNeutralForeground1Pressed, colorNeutralForeground1Selected, colorNeutralForeground1Static, colorNeutralForeground2, colorNeutralForeground2BrandHover, colorNeutralForeground2BrandPressed, colorNeutralForeground2BrandSelected, colorNeutralForeground2Hover, colorNeutralForeground2Link, colorNeutralForeground2LinkHover, colorNeutralForeground2LinkPressed, colorNeutralForeground2LinkSelected, colorNeutralForeground2Pressed, colorNeutralForeground2Selected, colorNeutralForeground3, colorNeutralForeground3BrandHover, colorNeutralForeground3BrandPressed, colorNeutralForeground3BrandSelected, colorNeutralForeground3Hover, colorNeutralForeground3Pressed, colorNeutralForeground3Selected, colorNeutralForeground4, colorNeutralForegroundDisabled, colorNeutralForegroundInverted, colorNeutralForegroundInverted2, colorNeutralForegroundInvertedDisabled, colorNeutralForegroundInvertedHover, colorNeutralForegroundInvertedLink, colorNeutralForegroundInvertedLinkHover, colorNeutralForegroundInvertedLinkPressed, colorNeutralForegroundInvertedLinkSelected, colorNeutralForegroundInvertedPressed, colorNeutralForegroundInvertedSelected, colorNeutralForegroundOnBrand, colorNeutralForegroundStaticInverted, colorNeutralShadowAmbient, colorNeutralShadowAmbientDarker, colorNeutralShadowAmbientLighter, colorNeutralShadowKey, colorNeutralShadowKeyDarker, colorNeutralShadowKeyLighter, colorNeutralStencil1, colorNeutralStencil1Alpha, colorNeutralStencil2, colorNeutralStencil2Alpha, colorNeutralStroke1, colorNeutralStroke1Hover, colorNeutralStroke1Pressed, colorNeutralStroke1Selected, colorNeutralStroke2, colorNeutralStroke3, colorNeutralStrokeAccessible, colorNeutralStrokeAccessibleHover, colorNeutralStrokeAccessiblePressed, colorNeutralStrokeAccessibleSelected, colorNeutralStrokeDisabled, colorNeutralStrokeInvertedDisabled, colorNeutralStrokeOnBrand, colorNeutralStrokeOnBrand2, colorNeutralStrokeOnBrand2Hover, colorNeutralStrokeOnBrand2Pressed, colorNeutralStrokeOnBrand2Selected, colorPaletteAnchorBackground2, colorPaletteAnchorBorderActive, colorPaletteAnchorForeground2, colorPaletteBeigeBackground2, colorPaletteBeigeBorderActive, colorPaletteBeigeForeground2, colorPaletteBerryBackground1, colorPaletteBerryBackground2, colorPaletteBerryBackground3, colorPaletteBerryBorder1, colorPaletteBerryBorder2, colorPaletteBerryBorderActive, colorPaletteBerryForeground1, colorPaletteBerryForeground2, colorPaletteBerryForeground3, colorPaletteBlueBackground2, colorPaletteBlueBorderActive, colorPaletteBlueForeground2, colorPaletteBrassBackground2, colorPaletteBrassBorderActive, colorPaletteBrassForeground2, colorPaletteBrownBackground2, colorPaletteBrownBorderActive, colorPaletteBrownForeground2, colorPaletteCornflowerBackground2, colorPaletteCornflowerBorderActive, colorPaletteCornflowerForeground2, colorPaletteCranberryBackground2, colorPaletteCranberryBorderActive, colorPaletteCranberryForeground2, colorPaletteDarkGreenBackground2, colorPaletteDarkGreenBorderActive, colorPaletteDarkGreenForeground2, colorPaletteDarkOrangeBackground1, colorPaletteDarkOrangeBackground2, colorPaletteDarkOrangeBackground3, colorPaletteDarkOrangeBorder1, colorPaletteDarkOrangeBorder2, colorPaletteDarkOrangeBorderActive, colorPaletteDarkOrangeForeground1, colorPaletteDarkOrangeForeground2, colorPaletteDarkOrangeForeground3, colorPaletteDarkRedBackground2, colorPaletteDarkRedBorderActive, colorPaletteDarkRedForeground2, colorPaletteForestBackground2, colorPaletteForestBorderActive, colorPaletteForestForeground2, colorPaletteGoldBackground2, colorPaletteGoldBorderActive, colorPaletteGoldForeground2, colorPaletteGrapeBackground2, colorPaletteGrapeBorderActive, colorPaletteGrapeForeground2, colorPaletteGreenBackground1, colorPaletteGreenBackground2, colorPaletteGreenBackground3, colorPaletteGreenBorder1, colorPaletteGreenBorder2, colorPaletteGreenBorderActive, colorPaletteGreenForeground1, colorPaletteGreenForeground2, colorPaletteGreenForeground3, colorPaletteGreenForegroundInverted, colorPaletteLavenderBackground2, colorPaletteLavenderBorderActive, colorPaletteLavenderForeground2, colorPaletteLightGreenBackground1, colorPaletteLightGreenBackground2, colorPaletteLightGreenBackground3, colorPaletteLightGreenBorder1, colorPaletteLightGreenBorder2, colorPaletteLightGreenBorderActive, colorPaletteLightGreenForeground1, colorPaletteLightGreenForeground2, colorPaletteLightGreenForeground3, colorPaletteLightTealBackground2, colorPaletteLightTealBorderActive, colorPaletteLightTealForeground2, colorPaletteLilacBackground2, colorPaletteLilacBorderActive, colorPaletteLilacForeground2, colorPaletteMagentaBackground2, colorPaletteMagentaBorderActive, colorPaletteMagentaForeground2, colorPaletteMarigoldBackground1, colorPaletteMarigoldBackground2, colorPaletteMarigoldBackground3, colorPaletteMarigoldBorder1, colorPaletteMarigoldBorder2, colorPaletteMarigoldBorderActive, colorPaletteMarigoldForeground1, colorPaletteMarigoldForeground2, colorPaletteMarigoldForeground3, colorPaletteMinkBackground2, colorPaletteMinkBorderActive, colorPaletteMinkForeground2, colorPaletteNavyBackground2, colorPaletteNavyBorderActive, colorPaletteNavyForeground2, colorPalettePeachBackground2, colorPalettePeachBorderActive, colorPalettePeachForeground2, colorPalettePinkBackground2, colorPalettePinkBorderActive, colorPalettePinkForeground2, colorPalettePlatinumBackground2, colorPalettePlatinumBorderActive, colorPalettePlatinumForeground2, colorPalettePlumBackground2, colorPalettePlumBorderActive, colorPalettePlumForeground2, colorPalettePumpkinBackground2, colorPalettePumpkinBorderActive, colorPalettePumpkinForeground2, colorPalettePurpleBackground2, colorPalettePurpleBorderActive, colorPalettePurpleForeground2, colorPaletteRedBackground1, colorPaletteRedBackground2, colorPaletteRedBackground3, colorPaletteRedBorder1, colorPaletteRedBorder2, colorPaletteRedBorderActive, colorPaletteRedForeground1, colorPaletteRedForeground2, colorPaletteRedForeground3, colorPaletteRedForegroundInverted, colorPaletteRoyalBlueBackground2, colorPaletteRoyalBlueBorderActive, colorPaletteRoyalBlueForeground2, colorPaletteSeafoamBackground2, colorPaletteSeafoamBorderActive, colorPaletteSeafoamForeground2, colorPaletteSteelBackground2, colorPaletteSteelBorderActive, colorPaletteSteelForeground2, colorPaletteTealBackground2, colorPaletteTealBorderActive, colorPaletteTealForeground2, colorPaletteYellowBackground1, colorPaletteYellowBackground2, colorPaletteYellowBackground3, colorPaletteYellowBorder1, colorPaletteYellowBorder2, colorPaletteYellowBorderActive, colorPaletteYellowForeground1, colorPaletteYellowForeground2, colorPaletteYellowForeground3, colorPaletteYellowForegroundInverted, colorScrollbarOverlay, colorStrokeFocus1, colorStrokeFocus2, colorSubtleBackground, colorSubtleBackgroundHover, colorSubtleBackgroundInverted, colorSubtleBackgroundInvertedHover, colorSubtleBackgroundInvertedPressed, colorSubtleBackgroundInvertedSelected, colorSubtleBackgroundLightAlphaHover, colorSubtleBackgroundLightAlphaPressed, colorSubtleBackgroundLightAlphaSelected, colorSubtleBackgroundPressed, colorSubtleBackgroundSelected, colorTransparentBackground, colorTransparentBackgroundHover, colorTransparentBackgroundPressed, colorTransparentBackgroundSelected, colorTransparentStroke, colorTransparentStrokeDisabled, colorTransparentStrokeInteractive, curveAccelerateMax, curveAccelerateMid, curveAccelerateMin, curveDecelerateMax, curveDecelerateMid, curveDecelerateMin, curveEasyEase, curveEasyEaseMax, curveLinear, durationFast, durationFaster, durationNormal, durationSlow, durationSlower, durationUltraFast, durationUltraSlow, fontFamilyBase, fontFamilyMonospace, fontFamilyNumeric, fontSizeBase100, fontSizeBase200, fontSizeBase300, fontSizeBase400, fontSizeBase500, fontSizeBase600, fontSizeHero1000, fontSizeHero700, fontSizeHero800, fontSizeHero900, fontWeightBold, fontWeightMedium, fontWeightRegular, fontWeightSemibold, lineHeightBase100, lineHeightBase200, lineHeightBase300, lineHeightBase400, lineHeightBase500, lineHeightBase600, lineHeightHero1000, lineHeightHero700, lineHeightHero800, lineHeightHero900, setTheme, setThemeFor, shadow16, shadow16Brand, shadow2, shadow28, shadow28Brand, shadow2Brand, shadow4, shadow4Brand, shadow64, shadow64Brand, shadow8, shadow8Brand, spacingHorizontalL, spacingHorizontalM, spacingHorizontalMNudge, spacingHorizontalNone, spacingHorizontalS, spacingHorizontalSNudge, spacingHorizontalXL, spacingHorizontalXS, spacingHorizontalXXL, spacingHorizontalXXS, spacingHorizontalXXXL, spacingVerticalL, spacingVerticalM, spacingVerticalMNudge, spacingVerticalNone, spacingVerticalS, spacingVerticalSNudge, spacingVerticalXL, spacingVerticalXS, spacingVerticalXXL, spacingVerticalXXS, spacingVerticalXXXL, strokeWidthThick, strokeWidthThicker, strokeWidthThickest, strokeWidthThin };
