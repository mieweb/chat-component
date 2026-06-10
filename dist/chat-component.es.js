function Od(b) {
  return b && b.__esModule && Object.prototype.hasOwnProperty.call(b, "default") ? b.default : b;
}
var nf = { exports: {} }, J = {}, vd;
function Fm() {
  if (vd) return J;
  vd = 1;
  var b = {};
  var x = /* @__PURE__ */ Symbol.for("react.transitional.element"), A = /* @__PURE__ */ Symbol.for("react.portal"), N = /* @__PURE__ */ Symbol.for("react.fragment"), d = /* @__PURE__ */ Symbol.for("react.strict_mode"), L = /* @__PURE__ */ Symbol.for("react.profiler"), G = /* @__PURE__ */ Symbol.for("react.consumer"), U = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), h = /* @__PURE__ */ Symbol.for("react.suspense"), Q = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), H = /* @__PURE__ */ Symbol.for("react.activity"), dt = Symbol.iterator;
  function Z(s) {
    return s === null || typeof s != "object" ? null : (s = dt && s[dt] || s["@@iterator"], typeof s == "function" ? s : null);
  }
  var ut = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, pt = Object.assign, $t = {};
  function st(s, p, D) {
    this.props = s, this.context = p, this.refs = $t, this.updater = D || ut;
  }
  st.prototype.isReactComponent = {}, st.prototype.setState = function(s, p) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, p, "setState");
  }, st.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function zt() {
  }
  zt.prototype = st.prototype;
  function ht(s, p, D) {
    this.props = s, this.context = p, this.refs = $t, this.updater = D || ut;
  }
  var wt = ht.prototype = new zt();
  wt.constructor = ht, pt(wt, st.prototype), wt.isPureReactComponent = !0;
  var Qt = Array.isArray;
  function Yt() {
  }
  var W = { H: null, A: null, T: null, S: null }, _t = Object.prototype.hasOwnProperty;
  function Ft(s, p, D) {
    var q = D.ref;
    return {
      $$typeof: x,
      type: s,
      key: p,
      ref: q !== void 0 ? q : null,
      props: D
    };
  }
  function Pt(s, p) {
    return Ft(s.type, p, s.props);
  }
  function Xt(s) {
    return typeof s == "object" && s !== null && s.$$typeof === x;
  }
  function Zt(s) {
    var p = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(D) {
      return p[D];
    });
  }
  var il = /\/+/g;
  function qt(s, p) {
    return typeof s == "object" && s !== null && s.key != null ? Zt("" + s.key) : p.toString(36);
  }
  function C(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(Yt, Yt) : (s.status = "pending", s.then(
          function(p) {
            s.status === "pending" && (s.status = "fulfilled", s.value = p);
          },
          function(p) {
            s.status === "pending" && (s.status = "rejected", s.reason = p);
          }
        )), s.status) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function T(s, p, D, q, F) {
    var B = typeof s;
    (B === "undefined" || B === "boolean") && (s = null);
    var I = !1;
    if (s === null) I = !0;
    else
      switch (B) {
        case "bigint":
        case "string":
        case "number":
          I = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case x:
            case A:
              I = !0;
              break;
            case j:
              return I = s._init, T(
                I(s._payload),
                p,
                D,
                q,
                F
              );
          }
      }
    if (I)
      return F = F(s), I = q === "" ? "." + qt(s, 0) : q, Qt(F) ? (D = "", I != null && (D = I.replace(il, "$&/") + "/"), T(F, p, D, "", function(Ma) {
        return Ma;
      })) : F != null && (Xt(F) && (F = Pt(
        F,
        D + (F.key == null || s && s.key === F.key ? "" : ("" + F.key).replace(
          il,
          "$&/"
        ) + "/") + I
      )), p.push(F)), 1;
    I = 0;
    var Ct = q === "" ? "." : q + ":";
    if (Qt(s))
      for (var Ot = 0; Ot < s.length; Ot++)
        q = s[Ot], B = Ct + qt(q, Ot), I += T(
          q,
          p,
          D,
          B,
          F
        );
    else if (Ot = Z(s), typeof Ot == "function")
      for (s = Ot.call(s), Ot = 0; !(q = s.next()).done; )
        q = q.value, B = Ct + qt(q, Ot++), I += T(
          q,
          p,
          D,
          B,
          F
        );
    else if (B === "object") {
      if (typeof s.then == "function")
        return T(
          C(s),
          p,
          D,
          q,
          F
        );
      throw p = String(s), Error(
        "Objects are not valid as a React child (found: " + (p === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : p) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return I;
  }
  function M(s, p, D) {
    if (s == null) return s;
    var q = [], F = 0;
    return T(s, q, "", "", function(B) {
      return p.call(D, B, F++);
    }), q;
  }
  function _(s) {
    if (s._status === -1) {
      var p = s._result;
      p = p(), p.then(
        function(D) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = D);
        },
        function(D) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = D);
        }
      ), s._status === -1 && (s._status = 0, s._result = p);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var K = typeof reportError == "function" ? reportError : function(s) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var p = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof s == "object" && s !== null && typeof s.message == "string" ? String(s.message) : String(s),
        error: s
      });
      if (!window.dispatchEvent(p)) return;
    } else if (typeof b == "object" && typeof b.emit == "function") {
      b.emit("uncaughtException", s);
      return;
    }
    console.error(s);
  }, nt = {
    map: M,
    forEach: function(s, p, D) {
      M(
        s,
        function() {
          p.apply(this, arguments);
        },
        D
      );
    },
    count: function(s) {
      var p = 0;
      return M(s, function() {
        p++;
      }), p;
    },
    toArray: function(s) {
      return M(s, function(p) {
        return p;
      }) || [];
    },
    only: function(s) {
      if (!Xt(s))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return s;
    }
  };
  return J.Activity = H, J.Children = nt, J.Component = st, J.Fragment = N, J.Profiler = L, J.PureComponent = ht, J.StrictMode = d, J.Suspense = h, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(s) {
      return W.H.useMemoCache(s);
    }
  }, J.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(s, p, D) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var q = pt({}, s.props), F = s.key;
    if (p != null)
      for (B in p.key !== void 0 && (F = "" + p.key), p)
        !_t.call(p, B) || B === "key" || B === "__self" || B === "__source" || B === "ref" && p.ref === void 0 || (q[B] = p[B]);
    var B = arguments.length - 2;
    if (B === 1) q.children = D;
    else if (1 < B) {
      for (var I = Array(B), Ct = 0; Ct < B; Ct++)
        I[Ct] = arguments[Ct + 2];
      q.children = I;
    }
    return Ft(s.type, F, q);
  }, J.createContext = function(s) {
    return s = {
      $$typeof: U,
      _currentValue: s,
      _currentValue2: s,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, s.Provider = s, s.Consumer = {
      $$typeof: G,
      _context: s
    }, s;
  }, J.createElement = function(s, p, D) {
    var q, F = {}, B = null;
    if (p != null)
      for (q in p.key !== void 0 && (B = "" + p.key), p)
        _t.call(p, q) && q !== "key" && q !== "__self" && q !== "__source" && (F[q] = p[q]);
    var I = arguments.length - 2;
    if (I === 1) F.children = D;
    else if (1 < I) {
      for (var Ct = Array(I), Ot = 0; Ot < I; Ot++)
        Ct[Ot] = arguments[Ot + 2];
      F.children = Ct;
    }
    if (s && s.defaultProps)
      for (q in I = s.defaultProps, I)
        F[q] === void 0 && (F[q] = I[q]);
    return Ft(s, B, F);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(s) {
    return { $$typeof: O, render: s };
  }, J.isValidElement = Xt, J.lazy = function(s) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: s },
      _init: _
    };
  }, J.memo = function(s, p) {
    return {
      $$typeof: Q,
      type: s,
      compare: p === void 0 ? null : p
    };
  }, J.startTransition = function(s) {
    var p = W.T, D = {};
    W.T = D;
    try {
      var q = s(), F = W.S;
      F !== null && F(D, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Yt, K);
    } catch (B) {
      K(B);
    } finally {
      p !== null && D.types !== null && (p.types = D.types), W.T = p;
    }
  }, J.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, J.use = function(s) {
    return W.H.use(s);
  }, J.useActionState = function(s, p, D) {
    return W.H.useActionState(s, p, D);
  }, J.useCallback = function(s, p) {
    return W.H.useCallback(s, p);
  }, J.useContext = function(s) {
    return W.H.useContext(s);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(s, p) {
    return W.H.useDeferredValue(s, p);
  }, J.useEffect = function(s, p) {
    return W.H.useEffect(s, p);
  }, J.useEffectEvent = function(s) {
    return W.H.useEffectEvent(s);
  }, J.useId = function() {
    return W.H.useId();
  }, J.useImperativeHandle = function(s, p, D) {
    return W.H.useImperativeHandle(s, p, D);
  }, J.useInsertionEffect = function(s, p) {
    return W.H.useInsertionEffect(s, p);
  }, J.useLayoutEffect = function(s, p) {
    return W.H.useLayoutEffect(s, p);
  }, J.useMemo = function(s, p) {
    return W.H.useMemo(s, p);
  }, J.useOptimistic = function(s, p) {
    return W.H.useOptimistic(s, p);
  }, J.useReducer = function(s, p, D) {
    return W.H.useReducer(s, p, D);
  }, J.useRef = function(s) {
    return W.H.useRef(s);
  }, J.useState = function(s) {
    return W.H.useState(s);
  }, J.useSyncExternalStore = function(s, p, D) {
    return W.H.useSyncExternalStore(
      s,
      p,
      D
    );
  }, J.useTransition = function() {
    return W.H.useTransition();
  }, J.version = "19.2.7", J;
}
var yd;
function rf() {
  return yd || (yd = 1, nf.exports = Fm()), nf.exports;
}
var Ml = rf();
const S = /* @__PURE__ */ Od(Ml);
var cf = { exports: {} }, pu = {}, ff = { exports: {} }, sf = {};
var hd;
function Im() {
  return hd || (hd = 1, (function(b) {
    function x(C, T) {
      var M = C.length;
      C.push(T);
      t: for (; 0 < M; ) {
        var _ = M - 1 >>> 1, K = C[_];
        if (0 < d(K, T))
          C[_] = T, C[M] = K, M = _;
        else break t;
      }
    }
    function A(C) {
      return C.length === 0 ? null : C[0];
    }
    function N(C) {
      if (C.length === 0) return null;
      var T = C[0], M = C.pop();
      if (M !== T) {
        C[0] = M;
        t: for (var _ = 0, K = C.length, nt = K >>> 1; _ < nt; ) {
          var s = 2 * (_ + 1) - 1, p = C[s], D = s + 1, q = C[D];
          if (0 > d(p, M))
            D < K && 0 > d(q, p) ? (C[_] = q, C[D] = M, _ = D) : (C[_] = p, C[s] = M, _ = s);
          else if (D < K && 0 > d(q, M))
            C[_] = q, C[D] = M, _ = D;
          else break t;
        }
      }
      return T;
    }
    function d(C, T) {
      var M = C.sortIndex - T.sortIndex;
      return M !== 0 ? M : C.id - T.id;
    }
    if (b.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var L = performance;
      b.unstable_now = function() {
        return L.now();
      };
    } else {
      var G = Date, U = G.now();
      b.unstable_now = function() {
        return G.now() - U;
      };
    }
    var O = [], h = [], Q = 1, j = null, H = 3, dt = !1, Z = !1, ut = !1, pt = !1, $t = typeof setTimeout == "function" ? setTimeout : null, st = typeof clearTimeout == "function" ? clearTimeout : null, zt = typeof setImmediate < "u" ? setImmediate : null;
    function ht(C) {
      for (var T = A(h); T !== null; ) {
        if (T.callback === null) N(h);
        else if (T.startTime <= C)
          N(h), T.sortIndex = T.expirationTime, x(O, T);
        else break;
        T = A(h);
      }
    }
    function wt(C) {
      if (ut = !1, ht(C), !Z)
        if (A(O) !== null)
          Z = !0, Qt || (Qt = !0, Xt());
        else {
          var T = A(h);
          T !== null && qt(wt, T.startTime - C);
        }
    }
    var Qt = !1, Yt = -1, W = 5, _t = -1;
    function Ft() {
      return pt ? !0 : !(b.unstable_now() - _t < W);
    }
    function Pt() {
      if (pt = !1, Qt) {
        var C = b.unstable_now();
        _t = C;
        var T = !0;
        try {
          t: {
            Z = !1, ut && (ut = !1, st(Yt), Yt = -1), dt = !0;
            var M = H;
            try {
              l: {
                for (ht(C), j = A(O); j !== null && !(j.expirationTime > C && Ft()); ) {
                  var _ = j.callback;
                  if (typeof _ == "function") {
                    j.callback = null, H = j.priorityLevel;
                    var K = _(
                      j.expirationTime <= C
                    );
                    if (C = b.unstable_now(), typeof K == "function") {
                      j.callback = K, ht(C), T = !0;
                      break l;
                    }
                    j === A(O) && N(O), ht(C);
                  } else N(O);
                  j = A(O);
                }
                if (j !== null) T = !0;
                else {
                  var nt = A(h);
                  nt !== null && qt(
                    wt,
                    nt.startTime - C
                  ), T = !1;
                }
              }
              break t;
            } finally {
              j = null, H = M, dt = !1;
            }
            T = void 0;
          }
        } finally {
          T ? Xt() : Qt = !1;
        }
      }
    }
    var Xt;
    if (typeof zt == "function")
      Xt = function() {
        zt(Pt);
      };
    else if (typeof MessageChannel < "u") {
      var Zt = new MessageChannel(), il = Zt.port2;
      Zt.port1.onmessage = Pt, Xt = function() {
        il.postMessage(null);
      };
    } else
      Xt = function() {
        $t(Pt, 0);
      };
    function qt(C, T) {
      Yt = $t(function() {
        C(b.unstable_now());
      }, T);
    }
    b.unstable_IdlePriority = 5, b.unstable_ImmediatePriority = 1, b.unstable_LowPriority = 4, b.unstable_NormalPriority = 3, b.unstable_Profiling = null, b.unstable_UserBlockingPriority = 2, b.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, b.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < C ? Math.floor(1e3 / C) : 5;
    }, b.unstable_getCurrentPriorityLevel = function() {
      return H;
    }, b.unstable_next = function(C) {
      switch (H) {
        case 1:
        case 2:
        case 3:
          var T = 3;
          break;
        default:
          T = H;
      }
      var M = H;
      H = T;
      try {
        return C();
      } finally {
        H = M;
      }
    }, b.unstable_requestPaint = function() {
      pt = !0;
    }, b.unstable_runWithPriority = function(C, T) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var M = H;
      H = C;
      try {
        return T();
      } finally {
        H = M;
      }
    }, b.unstable_scheduleCallback = function(C, T, M) {
      var _ = b.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? _ + M : _) : M = _, C) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return K = M + K, C = {
        id: Q++,
        callback: T,
        priorityLevel: C,
        startTime: M,
        expirationTime: K,
        sortIndex: -1
      }, M > _ ? (C.sortIndex = M, x(h, C), A(O) === null && C === A(h) && (ut ? (st(Yt), Yt = -1) : ut = !0, qt(wt, M - _))) : (C.sortIndex = K, x(O, C), Z || dt || (Z = !0, Qt || (Qt = !0, Xt()))), C;
    }, b.unstable_shouldYield = Ft, b.unstable_wrapCallback = function(C) {
      var T = H;
      return function() {
        var M = H;
        H = T;
        try {
          return C.apply(this, arguments);
        } finally {
          H = M;
        }
      };
    };
  })(sf)), sf;
}
var gd;
function Pm() {
  return gd || (gd = 1, ff.exports = Im()), ff.exports;
}
var of = { exports: {} }, kt = {};
var bd;
function tv() {
  if (bd) return kt;
  bd = 1;
  var b = rf();
  function x(O) {
    var h = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Q = 2; Q < arguments.length; Q++)
        h += "&args[]=" + encodeURIComponent(arguments[Q]);
    }
    return "Minified React error #" + O + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function A() {
  }
  var N = {
    d: {
      f: A,
      r: function() {
        throw Error(x(522));
      },
      D: A,
      C: A,
      L: A,
      m: A,
      X: A,
      S: A,
      M: A
    },
    p: 0,
    findDOMNode: null
  }, d = /* @__PURE__ */ Symbol.for("react.portal");
  function L(O, h, Q) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: j == null ? null : "" + j,
      children: O,
      containerInfo: h,
      implementation: Q
    };
  }
  var G = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function U(O, h) {
    if (O === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = N, kt.createPortal = function(O, h) {
    var Q = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(x(299));
    return L(O, h, null, Q);
  }, kt.flushSync = function(O) {
    var h = G.T, Q = N.p;
    try {
      if (G.T = null, N.p = 2, O) return O();
    } finally {
      G.T = h, N.p = Q, N.d.f();
    }
  }, kt.preconnect = function(O, h) {
    typeof O == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, N.d.C(O, h));
  }, kt.prefetchDNS = function(O) {
    typeof O == "string" && N.d.D(O);
  }, kt.preinit = function(O, h) {
    if (typeof O == "string" && h && typeof h.as == "string") {
      var Q = h.as, j = U(Q, h.crossOrigin), H = typeof h.integrity == "string" ? h.integrity : void 0, dt = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      Q === "style" ? N.d.S(
        O,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: j,
          integrity: H,
          fetchPriority: dt
        }
      ) : Q === "script" && N.d.X(O, {
        crossOrigin: j,
        integrity: H,
        fetchPriority: dt,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, kt.preinitModule = function(O, h) {
    if (typeof O == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var Q = U(
            h.as,
            h.crossOrigin
          );
          N.d.M(O, {
            crossOrigin: Q,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && N.d.M(O);
  }, kt.preload = function(O, h) {
    if (typeof O == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var Q = h.as, j = U(Q, h.crossOrigin);
      N.d.L(O, Q, {
        crossOrigin: j,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, kt.preloadModule = function(O, h) {
    if (typeof O == "string")
      if (h) {
        var Q = U(h.as, h.crossOrigin);
        N.d.m(O, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: Q,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else N.d.m(O);
  }, kt.requestFormReset = function(O) {
    N.d.r(O);
  }, kt.unstable_batchedUpdates = function(O, h) {
    return O(h);
  }, kt.useFormState = function(O, h, Q) {
    return G.H.useFormState(O, h, Q);
  }, kt.useFormStatus = function() {
    return G.H.useHostTransitionStatus();
  }, kt.version = "19.2.7", kt;
}
var Sd;
function lv() {
  if (Sd) return of.exports;
  Sd = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (x) {
        console.error(x);
      }
  }
  return b(), of.exports = tv(), of.exports;
}
var Ed;
function ev() {
  if (Ed) return pu;
  Ed = 1;
  var b = {};
  var x = Pm(), A = rf(), N = lv();
  function d(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function L(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function G(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function U(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function O(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (G(t) !== t)
      throw Error(d(188));
  }
  function Q(t) {
    var l = t.alternate;
    if (!l) {
      if (l = G(t), l === null) throw Error(d(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return h(u), t;
          if (n === a) return h(u), l;
          n = n.sibling;
        }
        throw Error(d(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === e) {
            c = !0, e = u, a = n;
            break;
          }
          if (i === a) {
            c = !0, a = u, e = n;
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === e) {
              c = !0, e = n, a = u;
              break;
            }
            if (i === a) {
              c = !0, a = n, e = u;
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(d(189));
        }
      }
      if (e.alternate !== a) throw Error(d(190));
    }
    if (e.tag !== 3) throw Error(d(188));
    return e.stateNode.current === e ? t : l;
  }
  function j(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = j(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var H = Object.assign, dt = /* @__PURE__ */ Symbol.for("react.element"), Z = /* @__PURE__ */ Symbol.for("react.transitional.element"), ut = /* @__PURE__ */ Symbol.for("react.portal"), pt = /* @__PURE__ */ Symbol.for("react.fragment"), $t = /* @__PURE__ */ Symbol.for("react.strict_mode"), st = /* @__PURE__ */ Symbol.for("react.profiler"), zt = /* @__PURE__ */ Symbol.for("react.consumer"), ht = /* @__PURE__ */ Symbol.for("react.context"), wt = /* @__PURE__ */ Symbol.for("react.forward_ref"), Qt = /* @__PURE__ */ Symbol.for("react.suspense"), Yt = /* @__PURE__ */ Symbol.for("react.suspense_list"), W = /* @__PURE__ */ Symbol.for("react.memo"), _t = /* @__PURE__ */ Symbol.for("react.lazy"), Ft = /* @__PURE__ */ Symbol.for("react.activity"), Pt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Xt = Symbol.iterator;
  function Zt(t) {
    return t === null || typeof t != "object" ? null : (t = Xt && t[Xt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var il = /* @__PURE__ */ Symbol.for("react.client.reference");
  function qt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === il ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case pt:
        return "Fragment";
      case st:
        return "Profiler";
      case $t:
        return "StrictMode";
      case Qt:
        return "Suspense";
      case Yt:
        return "SuspenseList";
      case Ft:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ut:
          return "Portal";
        case ht:
          return t.displayName || "Context";
        case zt:
          return (t._context.displayName || "Context") + ".Consumer";
        case wt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case W:
          return l = t.displayName || null, l !== null ? l : qt(t.type) || "Memo";
        case _t:
          l = t._payload, t = t._init;
          try {
            return qt(t(l));
          } catch {
          }
      }
    return null;
  }
  var C = Array.isArray, T = A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = N.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, K = [], nt = -1;
  function s(t) {
    return { current: t };
  }
  function p(t) {
    0 > nt || (t.current = K[nt], K[nt] = null, nt--);
  }
  function D(t, l) {
    nt++, K[nt] = t.current, t.current = l;
  }
  var q = s(null), F = s(null), B = s(null), I = s(null);
  function Ct(t, l) {
    switch (D(B, l), D(F, t), D(q, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Br(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Br(l), t = Yr(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    p(q), D(q, t);
  }
  function Ot() {
    p(q), p(F), p(B);
  }
  function Ma(t) {
    t.memoizedState !== null && D(I, t);
    var l = q.current, e = Yr(l, t.type);
    l !== e && (D(F, t), D(q, e));
  }
  function zu(t) {
    F.current === t && (p(q), p(F)), I.current === t && (p(I), gu._currentValue = _);
  }
  var Qn, df;
  function Ae(t) {
    if (Qn === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Qn = l && l[1] || "", df = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qn + t + df;
  }
  var Xn = !1;
  function Zn(t, l) {
    if (!t || Xn) return "";
    Xn = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (g) {
                  var y = g;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (g) {
                  y = g;
                }
                t.call(w.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                y = g;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (g) {
            if (g && y && typeof g.stack == "string")
              return [g.stack, y.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), c = n[0], i = n[1];
      if (c && i) {
        var f = c.split(`
`), v = i.split(`
`);
        for (u = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < v.length && !v[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === f.length || u === v.length)
          for (a = f.length - 1, u = v.length - 1; 1 <= a && 0 <= u && f[a] !== v[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (f[a] !== v[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || f[a] !== v[u]) {
                  var E = `
` + f[a].replace(" at new ", " at ");
                  return t.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", t.displayName)), E;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      Xn = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Ae(e) : "";
  }
  function Md(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(t.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ae("Suspense Fallback") : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Zn(t.type, !1);
      case 11:
        return Zn(t.type.render, !1);
      case 1:
        return Zn(t.type, !0);
      case 31:
        return Ae("Activity");
      default:
        return "";
    }
  }
  function mf(t) {
    try {
      var l = "", e = null;
      do
        l += Md(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ln = Object.prototype.hasOwnProperty, Vn = x.unstable_scheduleCallback, Kn = x.unstable_cancelCallback, Dd = x.unstable_shouldYield, Cd = x.unstable_requestPaint, fl = x.unstable_now, Nd = x.unstable_getCurrentPriorityLevel, vf = x.unstable_ImmediatePriority, yf = x.unstable_UserBlockingPriority, wu = x.unstable_NormalPriority, xd = x.unstable_LowPriority, hf = x.unstable_IdlePriority, Ud = x.log, Hd = x.unstable_setDisableYieldValue, Da = null, sl = null;
  function te(t) {
    if (typeof Ud == "function" && Hd(t), sl && typeof sl.setStrictMode == "function")
      try {
        sl.setStrictMode(Da, t);
      } catch {
      }
  }
  var ol = Math.clz32 ? Math.clz32 : Bd, Rd = Math.log, qd = Math.LN2;
  function Bd(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Rd(t) / qd | 0) | 0;
  }
  var Tu = 256, Au = 262144, _u = 4194304;
  function _e(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ou(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~n, a !== 0 ? u = _e(a) : (c &= i, c !== 0 ? u = _e(c) : e || (e = i & ~t, e !== 0 && (u = _e(e))))) : (i = a & ~n, i !== 0 ? u = _e(i) : c !== 0 ? u = _e(c) : e || (e = a & ~t, e !== 0 && (u = _e(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function Ca(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Yd(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function gf() {
    var t = _u;
    return _u <<= 1, (_u & 62914560) === 0 && (_u = 4194304), t;
  }
  function Jn(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Na(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function jd(t, l, e, a, u, n) {
    var c = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var i = t.entanglements, f = t.expirationTimes, v = t.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var E = 31 - ol(e), w = 1 << E;
      i[E] = 0, f[E] = -1;
      var y = v[E];
      if (y !== null)
        for (v[E] = null, E = 0; E < y.length; E++) {
          var g = y[E];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~w;
    }
    a !== 0 && bf(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(c & ~l));
  }
  function bf(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - ol(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Sf(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - ol(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function Ef(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Wn(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Wn(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function $n(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pf() {
    var t = M.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : id(t.type));
  }
  function zf(t, l) {
    var e = M.p;
    try {
      return M.p = t, l();
    } finally {
      M.p = e;
    }
  }
  var le = Math.random().toString(36).slice(2), Lt = "__reactFiber$" + le, tl = "__reactProps$" + le, Le = "__reactContainer$" + le, kn = "__reactEvents$" + le, Gd = "__reactListeners$" + le, Qd = "__reactHandles$" + le, wf = "__reactResources$" + le, xa = "__reactMarker$" + le;
  function Fn(t) {
    delete t[Lt], delete t[tl], delete t[kn], delete t[Gd], delete t[Qd];
  }
  function Ve(t) {
    var l = t[Lt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Le] || e[Lt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Vr(t); t !== null; ) {
            if (e = t[Lt]) return e;
            t = Vr(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ke(t) {
    if (t = t[Lt] || t[Le]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Ua(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(d(33));
  }
  function Je(t) {
    var l = t[wf];
    return l || (l = t[wf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function jt(t) {
    t[xa] = !0;
  }
  var Tf = /* @__PURE__ */ new Set(), Af = {};
  function Oe(t, l) {
    We(t, l), We(t + "Capture", l);
  }
  function We(t, l) {
    for (Af[t] = l, t = 0; t < l.length; t++)
      Tf.add(l[t]);
  }
  var Xd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _f = {}, Of = {};
  function Zd(t) {
    return Ln.call(Of, t) ? !0 : Ln.call(_f, t) ? !1 : Xd.test(t) ? Of[t] = !0 : (_f[t] = !0, !1);
  }
  function Mu(t, l, e) {
    if (Zd(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function Du(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function ql(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function bl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Mf(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Ld(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(c) {
          e = "" + c, n.call(this, c);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(c) {
          e = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function In(t) {
    if (!t._valueTracker) {
      var l = Mf(t) ? "checked" : "value";
      t._valueTracker = Ld(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Df(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Mf(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Cu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Vd = /[\n"\\]/g;
  function Sl(t) {
    return t.replace(
      Vd,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pn(t, l, e, a, u, n, c, i) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), l != null ? c === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + bl(l)) : t.value !== "" + bl(l) && (t.value = "" + bl(l)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), l != null ? tc(t, c, bl(l)) : e != null ? tc(t, c, bl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.name = "" + bl(i) : t.removeAttribute("name");
  }
  function Cf(t, l, e, a, u, n, c, i) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        In(t);
        return;
      }
      e = e != null ? "" + bl(e) : "", l = l != null ? "" + bl(l) : e, i || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = i ? t.checked : !!a, t.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), In(t);
  }
  function tc(t, l, e) {
    l === "number" && Cu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function $e(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + bl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Nf(t, l, e) {
    if (l != null && (l = "" + bl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + bl(e) : "";
  }
  function xf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(d(92));
        if (C(a)) {
          if (1 < a.length) throw Error(d(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = bl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), In(t);
  }
  function ke(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Kd = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Uf(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Kd.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Hf(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(d(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && Uf(t, u, a);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && Uf(t, n, l[n]);
  }
  function lc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jd = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Wd = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nu(t) {
    return Wd.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Bl() {
  }
  var ec = null;
  function ac(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Fe = null, Ie = null;
  function Rf(t) {
    var l = Ke(t);
    if (l && (t = l.stateNode)) {
      var e = t[tl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Pn(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Sl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[tl] || null;
                if (!u) throw Error(d(90));
                Pn(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && Df(a);
          }
          break t;
        case "textarea":
          Nf(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && $e(t, !!e.multiple, l, !1);
      }
    }
  }
  var uc = !1;
  function qf(t, l, e) {
    if (uc) return t(l, e);
    uc = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (uc = !1, (Fe !== null || Ie !== null) && (Sn(), Fe && (l = Fe, t = Ie, Ie = Fe = null, Rf(l), t)))
        for (l = 0; l < t.length; l++) Rf(t[l]);
    }
  }
  function Ha(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[tl] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        d(231, l, typeof e)
      );
    return e;
  }
  var Yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nc = !1;
  if (Yl)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          nc = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      nc = !1;
    }
  var ee = null, cc = null, xu = null;
  function Bf() {
    if (xu) return xu;
    var t, l = cc, e = l.length, a, u = "value" in ee ? ee.value : ee.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var c = e - t;
    for (a = 1; a <= c && l[e - a] === u[n - a]; a++) ;
    return xu = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Uu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Hu() {
    return !0;
  }
  function Yf() {
    return !1;
  }
  function ll(t) {
    function l(e, a, u, n, c) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var i in t)
        t.hasOwnProperty(i) && (e = t[i], this[i] = e ? e(n) : n[i]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Hu : Yf, this.isPropagationStopped = Yf, this;
    }
    return H(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Hu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Hu);
      },
      persist: function() {
      },
      isPersistent: Hu
    }), l;
  }
  var Me = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ru = ll(Me), qa = H({}, Me, { view: 0, detail: 0 }), $d = ll(qa), ic, fc, Ba, qu = H({}, qa, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: oc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ba && (Ba && t.type === "mousemove" ? (ic = t.screenX - Ba.screenX, fc = t.screenY - Ba.screenY) : fc = ic = 0, Ba = t), ic);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : fc;
    }
  }), jf = ll(qu), kd = H({}, qu, { dataTransfer: 0 }), Fd = ll(kd), Id = H({}, qa, { relatedTarget: 0 }), sc = ll(Id), Pd = H({}, Me, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), t0 = ll(Pd), l0 = H({}, Me, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), e0 = ll(l0), a0 = H({}, Me, { data: 0 }), Gf = ll(a0), u0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, n0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, c0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function i0(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = c0[t]) ? !!l[t] : !1;
  }
  function oc() {
    return i0;
  }
  var f0 = H({}, qa, {
    key: function(t) {
      if (t.key) {
        var l = u0[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Uu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? n0[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: oc,
    charCode: function(t) {
      return t.type === "keypress" ? Uu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Uu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), s0 = ll(f0), o0 = H({}, qu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Qf = ll(o0), r0 = H({}, qa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: oc
  }), d0 = ll(r0), m0 = H({}, Me, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), v0 = ll(m0), y0 = H({}, qu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), h0 = ll(y0), g0 = H({}, Me, {
    newState: 0,
    oldState: 0
  }), b0 = ll(g0), S0 = [9, 13, 27, 32], rc = Yl && "CompositionEvent" in window, Ya = null;
  Yl && "documentMode" in document && (Ya = document.documentMode);
  var E0 = Yl && "TextEvent" in window && !Ya, Xf = Yl && (!rc || Ya && 8 < Ya && 11 >= Ya), Zf = " ", Lf = !1;
  function Vf(t, l) {
    switch (t) {
      case "keyup":
        return S0.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Kf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Pe = !1;
  function p0(t, l) {
    switch (t) {
      case "compositionend":
        return Kf(l);
      case "keypress":
        return l.which !== 32 ? null : (Lf = !0, Zf);
      case "textInput":
        return t = l.data, t === Zf && Lf ? null : t;
      default:
        return null;
    }
  }
  function z0(t, l) {
    if (Pe)
      return t === "compositionend" || !rc && Vf(t, l) ? (t = Bf(), xu = cc = ee = null, Pe = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Xf && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var w0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Jf(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!w0[t.type] : l === "textarea";
  }
  function Wf(t, l, e, a) {
    Fe ? Ie ? Ie.push(a) : Ie = [a] : Fe = a, l = _n(l, "onChange"), 0 < l.length && (e = new Ru(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var ja = null, Ga = null;
  function T0(t) {
    Nr(t, 0);
  }
  function Bu(t) {
    var l = Ua(t);
    if (Df(l)) return t;
  }
  function $f(t, l) {
    if (t === "change") return l;
  }
  var kf = !1;
  if (Yl) {
    var dc;
    if (Yl) {
      var mc = "oninput" in document;
      if (!mc) {
        var Ff = document.createElement("div");
        Ff.setAttribute("oninput", "return;"), mc = typeof Ff.oninput == "function";
      }
      dc = mc;
    } else dc = !1;
    kf = dc && (!document.documentMode || 9 < document.documentMode);
  }
  function If() {
    ja && (ja.detachEvent("onpropertychange", Pf), Ga = ja = null);
  }
  function Pf(t) {
    if (t.propertyName === "value" && Bu(Ga)) {
      var l = [];
      Wf(
        l,
        Ga,
        t,
        ac(t)
      ), qf(T0, l);
    }
  }
  function A0(t, l, e) {
    t === "focusin" ? (If(), ja = l, Ga = e, ja.attachEvent("onpropertychange", Pf)) : t === "focusout" && If();
  }
  function _0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Bu(Ga);
  }
  function O0(t, l) {
    if (t === "click") return Bu(l);
  }
  function M0(t, l) {
    if (t === "input" || t === "change")
      return Bu(l);
  }
  function D0(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var rl = typeof Object.is == "function" ? Object.is : D0;
  function Qa(t, l) {
    if (rl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Ln.call(l, u) || !rl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function ts(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ls(t, l) {
    var e = ts(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = ts(e);
    }
  }
  function es(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? es(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function as(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Cu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Cu(t.document);
    }
    return l;
  }
  function vc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var C0 = Yl && "documentMode" in document && 11 >= document.documentMode, ta = null, yc = null, Xa = null, hc = !1;
  function us(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    hc || ta == null || ta !== Cu(a) || (a = ta, "selectionStart" in a && vc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Xa && Qa(Xa, a) || (Xa = a, a = _n(yc, "onSelect"), 0 < a.length && (l = new Ru(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ta)));
  }
  function De(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var la = {
    animationend: De("Animation", "AnimationEnd"),
    animationiteration: De("Animation", "AnimationIteration"),
    animationstart: De("Animation", "AnimationStart"),
    transitionrun: De("Transition", "TransitionRun"),
    transitionstart: De("Transition", "TransitionStart"),
    transitioncancel: De("Transition", "TransitionCancel"),
    transitionend: De("Transition", "TransitionEnd")
  }, gc = {}, ns = {};
  Yl && (ns = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function Ce(t) {
    if (gc[t]) return gc[t];
    if (!la[t]) return t;
    var l = la[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in ns)
        return gc[t] = l[e];
    return t;
  }
  var cs = Ce("animationend"), is = Ce("animationiteration"), fs = Ce("animationstart"), N0 = Ce("transitionrun"), x0 = Ce("transitionstart"), U0 = Ce("transitioncancel"), ss = Ce("transitionend"), os = /* @__PURE__ */ new Map(), bc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bc.push("scrollEnd");
  function Dl(t, l) {
    os.set(t, l), Oe(l, [t]);
  }
  var Yu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof b == "object" && typeof b.emit == "function") {
      b.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, El = [], ea = 0, Sc = 0;
  function ju() {
    for (var t = ea, l = Sc = ea = 0; l < t; ) {
      var e = El[l];
      El[l++] = null;
      var a = El[l];
      El[l++] = null;
      var u = El[l];
      El[l++] = null;
      var n = El[l];
      if (El[l++] = null, a !== null && u !== null) {
        var c = a.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
      }
      n !== 0 && rs(e, u, n);
    }
  }
  function Gu(t, l, e, a) {
    El[ea++] = t, El[ea++] = l, El[ea++] = e, El[ea++] = a, Sc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Ec(t, l, e, a) {
    return Gu(t, l, e, a), Qu(t);
  }
  function Ne(t, l) {
    return Gu(t, null, null, l), Qu(t);
  }
  function rs(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - ol(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Qu(t) {
    if (50 < ou)
      throw ou = 0, Di = null, Error(d(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var aa = {};
  function H0(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function dl(t, l, e, a) {
    return new H0(t, l, e, a);
  }
  function pc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function jl(t, l) {
    var e = t.alternate;
    return e === null ? (e = dl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function ds(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Xu(t, l, e, a, u, n) {
    var c = 0;
    if (a = t, typeof t == "function") pc(t) && (c = 1);
    else if (typeof t == "string")
      c = jm(
        t,
        e,
        q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Ft:
          return t = dl(31, e, l, u), t.elementType = Ft, t.lanes = n, t;
        case pt:
          return xe(e.children, u, n, l);
        case $t:
          c = 8, u |= 24;
          break;
        case st:
          return t = dl(12, e, l, u | 2), t.elementType = st, t.lanes = n, t;
        case Qt:
          return t = dl(13, e, l, u), t.elementType = Qt, t.lanes = n, t;
        case Yt:
          return t = dl(19, e, l, u), t.elementType = Yt, t.lanes = n, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case ht:
                c = 10;
                break t;
              case zt:
                c = 9;
                break t;
              case wt:
                c = 11;
                break t;
              case W:
                c = 14;
                break t;
              case _t:
                c = 16, a = null;
                break t;
            }
          c = 29, e = Error(
            d(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = dl(c, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function xe(t, l, e, a) {
    return t = dl(7, t, a, l), t.lanes = e, t;
  }
  function zc(t, l, e) {
    return t = dl(6, t, null, l), t.lanes = e, t;
  }
  function ms(t) {
    var l = dl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function wc(t, l, e) {
    return l = dl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var vs = /* @__PURE__ */ new WeakMap();
  function pl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = vs.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: mf(l)
      }, vs.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: mf(l)
    };
  }
  var ua = [], na = 0, Zu = null, Za = 0, zl = [], wl = 0, ae = null, xl = 1, Ul = "";
  function Gl(t, l) {
    ua[na++] = Za, ua[na++] = Zu, Zu = t, Za = l;
  }
  function ys(t, l, e) {
    zl[wl++] = xl, zl[wl++] = Ul, zl[wl++] = ae, ae = t;
    var a = xl;
    t = Ul;
    var u = 32 - ol(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - ol(l) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, u -= c, xl = 1 << 32 - ol(l) + u | e << u | a, Ul = n + t;
    } else
      xl = 1 << n | e << u | a, Ul = t;
  }
  function Tc(t) {
    t.return !== null && (Gl(t, 1), ys(t, 1, 0));
  }
  function Ac(t) {
    for (; t === Zu; )
      Zu = ua[--na], ua[na] = null, Za = ua[--na], ua[na] = null;
    for (; t === ae; )
      ae = zl[--wl], zl[wl] = null, Ul = zl[--wl], zl[wl] = null, xl = zl[--wl], zl[wl] = null;
  }
  function hs(t, l) {
    zl[wl++] = xl, zl[wl++] = Ul, zl[wl++] = ae, xl = l.id, Ul = l.overflow, ae = t;
  }
  var Vt = null, bt = null, at = !1, ue = null, Tl = !1, _c = Error(d(519));
  function ne(t) {
    var l = Error(
      d(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw La(pl(l, t)), _c;
  }
  function gs(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Lt] = t, l[tl] = a, e) {
      case "dialog":
        tt("cancel", l), tt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        tt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < du.length; e++)
          tt(du[e], l);
        break;
      case "source":
        tt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        tt("error", l), tt("load", l);
        break;
      case "details":
        tt("toggle", l);
        break;
      case "input":
        tt("invalid", l), Cf(
          l,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        tt("invalid", l);
        break;
      case "textarea":
        tt("invalid", l), xf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Rr(l.textContent, e) ? (a.popover != null && (tt("beforetoggle", l), tt("toggle", l)), a.onScroll != null && tt("scroll", l), a.onScrollEnd != null && tt("scrollend", l), a.onClick != null && (l.onclick = Bl), l = !0) : l = !1, l || ne(t, !0);
  }
  function bs(t) {
    for (Vt = t.return; Vt; )
      switch (Vt.tag) {
        case 5:
        case 31:
        case 13:
          Tl = !1;
          return;
        case 27:
        case 3:
          Tl = !0;
          return;
        default:
          Vt = Vt.return;
      }
  }
  function ca(t) {
    if (t !== Vt) return !1;
    if (!at) return bs(t), at = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Li(t.type, t.memoizedProps)), e = !e), e && bt && ne(t), bs(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(317));
      bt = Lr(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(317));
      bt = Lr(t);
    } else
      l === 27 ? (l = bt, Se(t.type) ? (t = $i, $i = null, bt = t) : bt = l) : bt = Vt ? _l(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ue() {
    bt = Vt = null, at = !1;
  }
  function Oc() {
    var t = ue;
    return t !== null && (nl === null ? nl = t : nl.push.apply(
      nl,
      t
    ), ue = null), t;
  }
  function La(t) {
    ue === null ? ue = [t] : ue.push(t);
  }
  var Mc = s(null), He = null, Ql = null;
  function ce(t, l, e) {
    D(Mc, l._currentValue), l._currentValue = e;
  }
  function Xl(t) {
    t._currentValue = Mc.current, p(Mc);
  }
  function Dc(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Cc(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < l.length; f++)
            if (i.context === l[f]) {
              n.lanes |= e, i = n.alternate, i !== null && (i.lanes |= e), Dc(
                n.return,
                e,
                t
              ), a || (c = null);
              break t;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(d(341));
        c.lanes |= e, n = c.alternate, n !== null && (n.lanes |= e), Dc(c, e, t), c = null;
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (u = c.sibling, u !== null) {
            u.return = c.return, c = u;
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function ia(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(d(387));
        if (c = c.memoizedProps, c !== null) {
          var i = u.type;
          rl(u.pendingProps.value, c.value) || (t !== null ? t.push(i) : t = [i]);
        }
      } else if (u === I.current) {
        if (c = u.alternate, c === null) throw Error(d(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(gu) : t = [gu]);
      }
      u = u.return;
    }
    t !== null && Cc(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Lu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!rl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Re(t) {
    He = t, Ql = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Kt(t) {
    return Ss(He, t);
  }
  function Vu(t, l) {
    return He === null && Re(t), Ss(t, l);
  }
  function Ss(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Ql === null) {
      if (t === null) throw Error(d(308));
      Ql = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Ql = Ql.next = l;
    return e;
  }
  var R0 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, q0 = x.unstable_scheduleCallback, B0 = x.unstable_NormalPriority, Nt = {
    $$typeof: ht,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Nc() {
    return {
      controller: new R0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(t) {
    t.refCount--, t.refCount === 0 && q0(B0, function() {
      t.controller.abort();
    });
  }
  var Ka = null, xc = 0, fa = 0, sa = null;
  function Y0(t, l) {
    if (Ka === null) {
      var e = Ka = [];
      xc = 0, fa = Ri(), sa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return xc++, l.then(Es, Es), l;
  }
  function Es() {
    if (--xc === 0 && Ka !== null) {
      sa !== null && (sa.status = "fulfilled");
      var t = Ka;
      Ka = null, fa = 0, sa = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function j0(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var u = 0; u < e.length; u++) (0, e[u])(l);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var ps = T.S;
  T.S = function(t, l) {
    nr = fl(), typeof l == "object" && l !== null && typeof l.then == "function" && Y0(t, l), ps !== null && ps(t, l);
  };
  var qe = s(null);
  function Uc() {
    var t = qe.current;
    return t !== null ? t : gt.pooledCache;
  }
  function Ku(t, l) {
    l === null ? D(qe, qe.current) : D(qe, l.pool);
  }
  function zs() {
    var t = Uc();
    return t === null ? null : { parent: Nt._currentValue, pool: t };
  }
  var oa = Error(d(460)), Hc = Error(d(474)), Ju = Error(d(542)), Wu = { then: function() {
  } };
  function ws(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ts(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Bl, Bl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, _s(t), t;
      default:
        if (typeof l.status == "string") l.then(Bl, Bl);
        else {
          if (t = gt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(d(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, _s(t), t;
        }
        throw Ye = l, oa;
    }
  }
  function Be(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ye = e, oa) : e;
    }
  }
  var Ye = null;
  function As() {
    if (Ye === null) throw Error(d(459));
    var t = Ye;
    return Ye = null, t;
  }
  function _s(t) {
    if (t === oa || t === Ju)
      throw Error(d(483));
  }
  var ra = null, Ja = 0;
  function $u(t) {
    var l = Ja;
    return Ja += 1, ra === null && (ra = []), Ts(ra, t, l);
  }
  function Wa(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function ku(t, l) {
    throw l.$$typeof === dt ? Error(d(525)) : (t = Object.prototype.toString.call(l), Error(
      d(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Os(t) {
    function l(r, o) {
      if (t) {
        var m = r.deletions;
        m === null ? (r.deletions = [o], r.flags |= 16) : m.push(o);
      }
    }
    function e(r, o) {
      if (!t) return null;
      for (; o !== null; )
        l(r, o), o = o.sibling;
      return null;
    }
    function a(r) {
      for (var o = /* @__PURE__ */ new Map(); r !== null; )
        r.key !== null ? o.set(r.key, r) : o.set(r.index, r), r = r.sibling;
      return o;
    }
    function u(r, o) {
      return r = jl(r, o), r.index = 0, r.sibling = null, r;
    }
    function n(r, o, m) {
      return r.index = m, t ? (m = r.alternate, m !== null ? (m = m.index, m < o ? (r.flags |= 67108866, o) : m) : (r.flags |= 67108866, o)) : (r.flags |= 1048576, o);
    }
    function c(r) {
      return t && r.alternate === null && (r.flags |= 67108866), r;
    }
    function i(r, o, m, z) {
      return o === null || o.tag !== 6 ? (o = zc(m, r.mode, z), o.return = r, o) : (o = u(o, m), o.return = r, o);
    }
    function f(r, o, m, z) {
      var X = m.type;
      return X === pt ? E(
        r,
        o,
        m.props.children,
        z,
        m.key
      ) : o !== null && (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === _t && Be(X) === o.type) ? (o = u(o, m.props), Wa(o, m), o.return = r, o) : (o = Xu(
        m.type,
        m.key,
        m.props,
        null,
        r.mode,
        z
      ), Wa(o, m), o.return = r, o);
    }
    function v(r, o, m, z) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== m.containerInfo || o.stateNode.implementation !== m.implementation ? (o = wc(m, r.mode, z), o.return = r, o) : (o = u(o, m.children || []), o.return = r, o);
    }
    function E(r, o, m, z, X) {
      return o === null || o.tag !== 7 ? (o = xe(
        m,
        r.mode,
        z,
        X
      ), o.return = r, o) : (o = u(o, m), o.return = r, o);
    }
    function w(r, o, m) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = zc(
          "" + o,
          r.mode,
          m
        ), o.return = r, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Z:
            return m = Xu(
              o.type,
              o.key,
              o.props,
              null,
              r.mode,
              m
            ), Wa(m, o), m.return = r, m;
          case ut:
            return o = wc(
              o,
              r.mode,
              m
            ), o.return = r, o;
          case _t:
            return o = Be(o), w(r, o, m);
        }
        if (C(o) || Zt(o))
          return o = xe(
            o,
            r.mode,
            m,
            null
          ), o.return = r, o;
        if (typeof o.then == "function")
          return w(r, $u(o), m);
        if (o.$$typeof === ht)
          return w(
            r,
            Vu(r, o),
            m
          );
        ku(r, o);
      }
      return null;
    }
    function y(r, o, m, z) {
      var X = o !== null ? o.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return X !== null ? null : i(r, o, "" + m, z);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Z:
            return m.key === X ? f(r, o, m, z) : null;
          case ut:
            return m.key === X ? v(r, o, m, z) : null;
          case _t:
            return m = Be(m), y(r, o, m, z);
        }
        if (C(m) || Zt(m))
          return X !== null ? null : E(r, o, m, z, null);
        if (typeof m.then == "function")
          return y(
            r,
            o,
            $u(m),
            z
          );
        if (m.$$typeof === ht)
          return y(
            r,
            o,
            Vu(r, m),
            z
          );
        ku(r, m);
      }
      return null;
    }
    function g(r, o, m, z, X) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return r = r.get(m) || null, i(o, r, "" + z, X);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case Z:
            return r = r.get(
              z.key === null ? m : z.key
            ) || null, f(o, r, z, X);
          case ut:
            return r = r.get(
              z.key === null ? m : z.key
            ) || null, v(o, r, z, X);
          case _t:
            return z = Be(z), g(
              r,
              o,
              m,
              z,
              X
            );
        }
        if (C(z) || Zt(z))
          return r = r.get(m) || null, E(o, r, z, X, null);
        if (typeof z.then == "function")
          return g(
            r,
            o,
            m,
            $u(z),
            X
          );
        if (z.$$typeof === ht)
          return g(
            r,
            o,
            m,
            Vu(o, z),
            X
          );
        ku(o, z);
      }
      return null;
    }
    function R(r, o, m, z) {
      for (var X = null, ct = null, Y = o, k = o = 0, et = null; Y !== null && k < m.length; k++) {
        Y.index > k ? (et = Y, Y = null) : et = Y.sibling;
        var it = y(
          r,
          Y,
          m[k],
          z
        );
        if (it === null) {
          Y === null && (Y = et);
          break;
        }
        t && Y && it.alternate === null && l(r, Y), o = n(it, o, k), ct === null ? X = it : ct.sibling = it, ct = it, Y = et;
      }
      if (k === m.length)
        return e(r, Y), at && Gl(r, k), X;
      if (Y === null) {
        for (; k < m.length; k++)
          Y = w(r, m[k], z), Y !== null && (o = n(
            Y,
            o,
            k
          ), ct === null ? X = Y : ct.sibling = Y, ct = Y);
        return at && Gl(r, k), X;
      }
      for (Y = a(Y); k < m.length; k++)
        et = g(
          Y,
          r,
          k,
          m[k],
          z
        ), et !== null && (t && et.alternate !== null && Y.delete(
          et.key === null ? k : et.key
        ), o = n(
          et,
          o,
          k
        ), ct === null ? X = et : ct.sibling = et, ct = et);
      return t && Y.forEach(function(Te) {
        return l(r, Te);
      }), at && Gl(r, k), X;
    }
    function V(r, o, m, z) {
      if (m == null) throw Error(d(151));
      for (var X = null, ct = null, Y = o, k = o = 0, et = null, it = m.next(); Y !== null && !it.done; k++, it = m.next()) {
        Y.index > k ? (et = Y, Y = null) : et = Y.sibling;
        var Te = y(r, Y, it.value, z);
        if (Te === null) {
          Y === null && (Y = et);
          break;
        }
        t && Y && Te.alternate === null && l(r, Y), o = n(Te, o, k), ct === null ? X = Te : ct.sibling = Te, ct = Te, Y = et;
      }
      if (it.done)
        return e(r, Y), at && Gl(r, k), X;
      if (Y === null) {
        for (; !it.done; k++, it = m.next())
          it = w(r, it.value, z), it !== null && (o = n(it, o, k), ct === null ? X = it : ct.sibling = it, ct = it);
        return at && Gl(r, k), X;
      }
      for (Y = a(Y); !it.done; k++, it = m.next())
        it = g(Y, r, k, it.value, z), it !== null && (t && it.alternate !== null && Y.delete(it.key === null ? k : it.key), o = n(it, o, k), ct === null ? X = it : ct.sibling = it, ct = it);
      return t && Y.forEach(function(km) {
        return l(r, km);
      }), at && Gl(r, k), X;
    }
    function yt(r, o, m, z) {
      if (typeof m == "object" && m !== null && m.type === pt && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Z:
            t: {
              for (var X = m.key; o !== null; ) {
                if (o.key === X) {
                  if (X = m.type, X === pt) {
                    if (o.tag === 7) {
                      e(
                        r,
                        o.sibling
                      ), z = u(
                        o,
                        m.props.children
                      ), z.return = r, r = z;
                      break t;
                    }
                  } else if (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === _t && Be(X) === o.type) {
                    e(
                      r,
                      o.sibling
                    ), z = u(o, m.props), Wa(z, m), z.return = r, r = z;
                    break t;
                  }
                  e(r, o);
                  break;
                } else l(r, o);
                o = o.sibling;
              }
              m.type === pt ? (z = xe(
                m.props.children,
                r.mode,
                z,
                m.key
              ), z.return = r, r = z) : (z = Xu(
                m.type,
                m.key,
                m.props,
                null,
                r.mode,
                z
              ), Wa(z, m), z.return = r, r = z);
            }
            return c(r);
          case ut:
            t: {
              for (X = m.key; o !== null; ) {
                if (o.key === X)
                  if (o.tag === 4 && o.stateNode.containerInfo === m.containerInfo && o.stateNode.implementation === m.implementation) {
                    e(
                      r,
                      o.sibling
                    ), z = u(o, m.children || []), z.return = r, r = z;
                    break t;
                  } else {
                    e(r, o);
                    break;
                  }
                else l(r, o);
                o = o.sibling;
              }
              z = wc(m, r.mode, z), z.return = r, r = z;
            }
            return c(r);
          case _t:
            return m = Be(m), yt(
              r,
              o,
              m,
              z
            );
        }
        if (C(m))
          return R(
            r,
            o,
            m,
            z
          );
        if (Zt(m)) {
          if (X = Zt(m), typeof X != "function") throw Error(d(150));
          return m = X.call(m), V(
            r,
            o,
            m,
            z
          );
        }
        if (typeof m.then == "function")
          return yt(
            r,
            o,
            $u(m),
            z
          );
        if (m.$$typeof === ht)
          return yt(
            r,
            o,
            Vu(r, m),
            z
          );
        ku(r, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, o !== null && o.tag === 6 ? (e(r, o.sibling), z = u(o, m), z.return = r, r = z) : (e(r, o), z = zc(m, r.mode, z), z.return = r, r = z), c(r)) : e(r, o);
    }
    return function(r, o, m, z) {
      try {
        Ja = 0;
        var X = yt(
          r,
          o,
          m,
          z
        );
        return ra = null, X;
      } catch (Y) {
        if (Y === oa || Y === Ju) throw Y;
        var ct = dl(29, Y, null, r.mode);
        return ct.lanes = z, ct.return = r, ct;
      }
    };
  }
  var je = Os(!0), Ms = Os(!1), ie = !1;
  function Rc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function fe(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function se(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ft & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Qu(t), rs(t, null, e), l;
    }
    return Gu(t, a, l, e), Qu(t);
  }
  function $a(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Sf(t, e);
    }
  }
  function Bc(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = c : n = n.next = c, e = e.next;
        } while (e !== null);
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Yc = !1;
  function ka() {
    if (Yc) {
      var t = sa;
      if (t !== null) throw t;
    }
  }
  function Fa(t, l, e, a) {
    Yc = !1;
    var u = t.updateQueue;
    ie = !1;
    var n = u.firstBaseUpdate, c = u.lastBaseUpdate, i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var f = i, v = f.next;
      f.next = null, c === null ? n = v : c.next = v, c = f;
      var E = t.alternate;
      E !== null && (E = E.updateQueue, i = E.lastBaseUpdate, i !== c && (i === null ? E.firstBaseUpdate = v : i.next = v, E.lastBaseUpdate = f));
    }
    if (n !== null) {
      var w = u.baseState;
      c = 0, E = v = f = null, i = n;
      do {
        var y = i.lane & -536870913, g = y !== i.lane;
        if (g ? (lt & y) === y : (a & y) === y) {
          y !== 0 && y === fa && (Yc = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          t: {
            var R = t, V = i;
            y = l;
            var yt = e;
            switch (V.tag) {
              case 1:
                if (R = V.payload, typeof R == "function") {
                  w = R.call(yt, w, y);
                  break t;
                }
                w = R;
                break t;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = V.payload, y = typeof R == "function" ? R.call(yt, w, y) : R, y == null) break t;
                w = H({}, w, y);
                break t;
              case 2:
                ie = !0;
            }
          }
          y = i.callback, y !== null && (t.flags |= 64, g && (t.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [y] : g.push(y));
        } else
          g = {
            lane: y,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, E === null ? (v = E = g, f = w) : E = E.next = g, c |= y;
        if (i = i.next, i === null) {
          if (i = u.shared.pending, i === null)
            break;
          g = i, i = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      E === null && (f = w), u.baseState = f, u.firstBaseUpdate = v, u.lastBaseUpdate = E, n === null && (u.shared.lanes = 0), ve |= c, t.lanes = c, t.memoizedState = w;
    }
  }
  function Ds(t, l) {
    if (typeof t != "function")
      throw Error(d(191, t));
    t.call(l);
  }
  function Cs(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Ds(e[t], l);
  }
  var da = s(null), Fu = s(0);
  function Ns(t, l) {
    t = Fl, D(Fu, t), D(da, l), Fl = t | l.baseLanes;
  }
  function jc() {
    D(Fu, Fl), D(da, da.current);
  }
  function Gc() {
    Fl = Fu.current, p(da), p(Fu);
  }
  var ml = s(null), Al = null;
  function oe(t) {
    var l = t.alternate;
    D(Mt, Mt.current & 1), D(ml, t), Al === null && (l === null || da.current !== null || l.memoizedState !== null) && (Al = t);
  }
  function Qc(t) {
    D(Mt, Mt.current), D(ml, t), Al === null && (Al = t);
  }
  function xs(t) {
    t.tag === 22 ? (D(Mt, Mt.current), D(ml, t), Al === null && (Al = t)) : re();
  }
  function re() {
    D(Mt, Mt.current), D(ml, ml.current);
  }
  function vl(t) {
    p(ml), Al === t && (Al = null), p(Mt);
  }
  var Mt = s(0);
  function Iu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Ji(e) || Wi(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Zl = 0, $ = null, mt = null, xt = null, Pu = !1, ma = !1, Ge = !1, tn = 0, Ia = 0, va = null, G0 = 0;
  function Tt() {
    throw Error(d(321));
  }
  function Xc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!rl(t[e], l[e])) return !1;
    return !0;
  }
  function Zc(t, l, e, a, u, n) {
    return Zl = n, $ = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, T.H = t === null || t.memoizedState === null ? ho : ui, Ge = !1, n = e(a, u), Ge = !1, ma && (n = Hs(
      l,
      e,
      a,
      u
    )), Us(t), n;
  }
  function Us(t) {
    T.H = lu;
    var l = mt !== null && mt.next !== null;
    if (Zl = 0, xt = mt = $ = null, Pu = !1, Ia = 0, va = null, l) throw Error(d(300));
    t === null || Ut || (t = t.dependencies, t !== null && Lu(t) && (Ut = !0));
  }
  function Hs(t, l, e, a) {
    $ = t;
    var u = 0;
    do {
      if (ma && (va = null), Ia = 0, ma = !1, 25 <= u) throw Error(d(301));
      if (u += 1, xt = mt = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      T.H = go, n = l(e, a);
    } while (ma);
    return n;
  }
  function Q0() {
    var t = T.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Pa(l) : l, t = t.useState()[0], (mt !== null ? mt.memoizedState : null) !== t && ($.flags |= 1024), l;
  }
  function Lc() {
    var t = tn !== 0;
    return tn = 0, t;
  }
  function Vc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Kc(t) {
    if (Pu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Pu = !1;
    }
    Zl = 0, xt = mt = $ = null, ma = !1, Ia = tn = 0, va = null;
  }
  function It() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xt === null ? $.memoizedState = xt = t : xt = xt.next = t, xt;
  }
  function Dt() {
    if (mt === null) {
      var t = $.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = mt.next;
    var l = xt === null ? $.memoizedState : xt.next;
    if (l !== null)
      xt = l, mt = t;
    else {
      if (t === null)
        throw $.alternate === null ? Error(d(467)) : Error(d(310));
      mt = t, t = {
        memoizedState: mt.memoizedState,
        baseState: mt.baseState,
        baseQueue: mt.baseQueue,
        queue: mt.queue,
        next: null
      }, xt === null ? $.memoizedState = xt = t : xt = xt.next = t;
    }
    return xt;
  }
  function ln() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pa(t) {
    var l = Ia;
    return Ia += 1, va === null && (va = []), t = Ts(va, t, l), l = $, (xt === null ? l.memoizedState : xt.next) === null && (l = l.alternate, T.H = l === null || l.memoizedState === null ? ho : ui), t;
  }
  function en(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Pa(t);
      if (t.$$typeof === ht) return Kt(t);
    }
    throw Error(d(438, String(t)));
  }
  function Jc(t) {
    var l = null, e = $.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = $.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = ln(), $.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = Pt;
    return l.index++, e;
  }
  function Ll(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function an(t) {
    var l = Dt();
    return Wc(l, mt, t);
  }
  function Wc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(d(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        u.next = n.next, n.next = c;
      }
      l.baseQueue = u = n, a.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var i = c = null, f = null, v = l, E = !1;
      do {
        var w = v.lane & -536870913;
        if (w !== v.lane ? (lt & w) === w : (Zl & w) === w) {
          var y = v.revertLane;
          if (y === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }), w === fa && (E = !0);
          else if ((Zl & y) === y) {
            v = v.next, y === fa && (E = !0);
            continue;
          } else
            w = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, f === null ? (i = f = w, c = n) : f = f.next = w, $.lanes |= y, ve |= y;
          w = v.action, Ge && e(n, w), n = v.hasEagerState ? v.eagerState : e(n, w);
        } else
          y = {
            lane: w,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, f === null ? (i = f = y, c = n) : f = f.next = y, $.lanes |= w, ve |= w;
        v = v.next;
      } while (v !== null && v !== l);
      if (f === null ? c = n : f.next = i, !rl(n, t.memoizedState) && (Ut = !0, E && (e = sa, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = c, t.baseQueue = f, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function $c(t) {
    var l = Dt(), e = l.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = u = u.next;
      do
        n = t(n, c.action), c = c.next;
      while (c !== u);
      rl(n, l.memoizedState) || (Ut = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Rs(t, l, e) {
    var a = $, u = Dt(), n = at;
    if (n) {
      if (e === void 0) throw Error(d(407));
      e = e();
    } else e = l();
    var c = !rl(
      (mt || u).memoizedState,
      e
    );
    if (c && (u.memoizedState = e, Ut = !0), u = u.queue, Ic(Ys.bind(null, a, u, t), [
      t
    ]), u.getSnapshot !== l || c || xt !== null && xt.memoizedState.tag & 1) {
      if (a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Bs.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), gt === null) throw Error(d(349));
      n || (Zl & 127) !== 0 || qs(a, l, e);
    }
    return e;
  }
  function qs(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = $.updateQueue, l === null ? (l = ln(), $.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Bs(t, l, e, a) {
    l.value = e, l.getSnapshot = a, js(l) && Gs(t);
  }
  function Ys(t, l, e) {
    return e(function() {
      js(l) && Gs(t);
    });
  }
  function js(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !rl(t, e);
    } catch {
      return !0;
    }
  }
  function Gs(t) {
    var l = Ne(t, 2);
    l !== null && cl(l, t, 2);
  }
  function kc(t) {
    var l = It();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ge) {
        te(!0);
        try {
          e();
        } finally {
          te(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ll,
      lastRenderedState: t
    }, l;
  }
  function Qs(t, l, e, a) {
    return t.baseState = e, Wc(
      t,
      mt,
      typeof a == "function" ? a : Ll
    );
  }
  function X0(t, l, e, a, u) {
    if (cn(t)) throw Error(d(485));
    if (t = l.action, t !== null) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          n.listeners.push(c);
        }
      };
      T.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, Xs(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function Xs(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = T.T, c = {};
      T.T = c;
      try {
        var i = e(u, a), f = T.S;
        f !== null && f(c, i), Zs(t, l, i);
      } catch (v) {
        Fc(t, l, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), T.T = n;
      }
    } else
      try {
        n = e(u, a), Zs(t, l, n);
      } catch (v) {
        Fc(t, l, v);
      }
  }
  function Zs(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Ls(t, l, a);
      },
      function(a) {
        return Fc(t, l, a);
      }
    ) : Ls(t, l, e);
  }
  function Ls(t, l, e) {
    l.status = "fulfilled", l.value = e, Vs(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Xs(t, e)));
  }
  function Fc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Vs(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Vs(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Ks(t, l) {
    return l;
  }
  function Js(t, l) {
    if (at) {
      var e = gt.formState;
      if (e !== null) {
        t: {
          var a = $;
          if (at) {
            if (bt) {
              l: {
                for (var u = bt, n = Tl; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = _l(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                bt = _l(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            ne(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = It(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ks,
      lastRenderedState: l
    }, e.queue = a, e = mo.bind(
      null,
      $,
      a
    ), a.dispatch = e, a = kc(!1), n = ai.bind(
      null,
      $,
      !1,
      a.queue
    ), a = It(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = X0.bind(
      null,
      $,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Ws(t) {
    var l = Dt();
    return $s(l, mt, t);
  }
  function $s(t, l, e) {
    if (l = Wc(
      t,
      l,
      Ks
    )[0], t = an(Ll)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Pa(l);
      } catch (c) {
        throw c === oa ? Ju : c;
      }
    else a = l;
    l = Dt();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && ($.flags |= 2048, ya(
      9,
      { destroy: void 0 },
      Z0.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function Z0(t, l) {
    t.action = l;
  }
  function ks(t) {
    var l = Dt(), e = mt;
    if (e !== null)
      return $s(l, e, t);
    Dt(), l = l.memoizedState, e = Dt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function ya(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = $.updateQueue, l === null && (l = ln(), $.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Fs() {
    return Dt().memoizedState;
  }
  function un(t, l, e, a) {
    var u = It();
    $.flags |= t, u.memoizedState = ya(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function nn(t, l, e, a) {
    var u = Dt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    mt !== null && a !== null && Xc(a, mt.memoizedState.deps) ? u.memoizedState = ya(l, n, e, a) : ($.flags |= t, u.memoizedState = ya(
      1 | l,
      n,
      e,
      a
    ));
  }
  function Is(t, l) {
    un(8390656, 8, t, l);
  }
  function Ic(t, l) {
    nn(2048, 8, t, l);
  }
  function L0(t) {
    $.flags |= 4;
    var l = $.updateQueue;
    if (l === null)
      l = ln(), $.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Ps(t) {
    var l = Dt().memoizedState;
    return L0({ ref: l, nextImpl: t }), function() {
      if ((ft & 2) !== 0) throw Error(d(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function to(t, l) {
    return nn(4, 2, t, l);
  }
  function lo(t, l) {
    return nn(4, 4, t, l);
  }
  function eo(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function ao(t, l, e) {
    e = e != null ? e.concat([t]) : null, nn(4, 4, eo.bind(null, l, t), e);
  }
  function Pc() {
  }
  function uo(t, l) {
    var e = Dt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && Xc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function no(t, l) {
    var e = Dt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && Xc(l, a[1]))
      return a[0];
    if (a = t(), Ge) {
      te(!0);
      try {
        t();
      } finally {
        te(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function ti(t, l, e) {
    return e === void 0 || (Zl & 1073741824) !== 0 && (lt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = ir(), $.lanes |= t, ve |= t, e);
  }
  function co(t, l, e, a) {
    return rl(e, l) ? e : da.current !== null ? (t = ti(t, e, a), rl(t, l) || (Ut = !0), t) : (Zl & 42) === 0 || (Zl & 1073741824) !== 0 && (lt & 261930) === 0 ? (Ut = !0, t.memoizedState = e) : (t = ir(), $.lanes |= t, ve |= t, l);
  }
  function io(t, l, e, a, u) {
    var n = M.p;
    M.p = n !== 0 && 8 > n ? n : 8;
    var c = T.T, i = {};
    T.T = i, ai(t, !1, l, e);
    try {
      var f = u(), v = T.S;
      if (v !== null && v(i, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var E = j0(
          f,
          a
        );
        tu(
          t,
          l,
          E,
          gl(t)
        );
      } else
        tu(
          t,
          l,
          a,
          gl(t)
        );
    } catch (w) {
      tu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: w },
        gl()
      );
    } finally {
      M.p = n, c !== null && i.types !== null && (c.types = i.types), T.T = c;
    }
  }
  function V0() {
  }
  function li(t, l, e, a) {
    if (t.tag !== 5) throw Error(d(476));
    var u = fo(t).queue;
    io(
      t,
      u,
      l,
      _,
      e === null ? V0 : function() {
        return so(t), e(a);
      }
    );
  }
  function fo(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: _,
      baseState: _,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: _
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function so(t) {
    var l = fo(t);
    l.next === null && (l = t.alternate.memoizedState), tu(
      t,
      l.next.queue,
      {},
      gl()
    );
  }
  function ei() {
    return Kt(gu);
  }
  function oo() {
    return Dt().memoizedState;
  }
  function ro() {
    return Dt().memoizedState;
  }
  function K0(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = gl();
          t = fe(e);
          var a = se(l, t, e);
          a !== null && (cl(a, l, e), $a(a, l, e)), l = { cache: Nc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function J0(t, l, e) {
    var a = gl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(t) ? vo(l, e) : (e = Ec(t, l, e, a), e !== null && (cl(e, t, a), yo(e, l, a)));
  }
  function mo(t, l, e) {
    var a = gl();
    tu(t, l, e, a);
  }
  function tu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cn(t)) vo(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var c = l.lastRenderedState, i = n(c, e);
          if (u.hasEagerState = !0, u.eagerState = i, rl(i, c))
            return Gu(t, l, u, 0), gt === null && ju(), !1;
        } catch {
        }
      if (e = Ec(t, l, u, a), e !== null)
        return cl(e, t, a), yo(e, l, a), !0;
    }
    return !1;
  }
  function ai(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Ri(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(t)) {
      if (l) throw Error(d(479));
    } else
      l = Ec(
        t,
        e,
        a,
        2
      ), l !== null && cl(l, t, 2);
  }
  function cn(t) {
    var l = t.alternate;
    return t === $ || l !== null && l === $;
  }
  function vo(t, l) {
    ma = Pu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function yo(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Sf(t, e);
    }
  }
  var lu = {
    readContext: Kt,
    use: en,
    useCallback: Tt,
    useContext: Tt,
    useEffect: Tt,
    useImperativeHandle: Tt,
    useLayoutEffect: Tt,
    useInsertionEffect: Tt,
    useMemo: Tt,
    useReducer: Tt,
    useRef: Tt,
    useState: Tt,
    useDebugValue: Tt,
    useDeferredValue: Tt,
    useTransition: Tt,
    useSyncExternalStore: Tt,
    useId: Tt,
    useHostTransitionStatus: Tt,
    useFormState: Tt,
    useActionState: Tt,
    useOptimistic: Tt,
    useMemoCache: Tt,
    useCacheRefresh: Tt
  };
  lu.useEffectEvent = Tt;
  var ho = {
    readContext: Kt,
    use: en,
    useCallback: function(t, l) {
      return It().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Kt,
    useEffect: Is,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, un(
        4194308,
        4,
        eo.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return un(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      un(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = It();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ge) {
        te(!0);
        try {
          t();
        } finally {
          te(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = It();
      if (e !== void 0) {
        var u = e(l);
        if (Ge) {
          te(!0);
          try {
            e(l);
          } finally {
            te(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = J0.bind(
        null,
        $,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = It();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = kc(t);
      var l = t.queue, e = mo.bind(null, $, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Pc,
    useDeferredValue: function(t, l) {
      var e = It();
      return ti(e, t, l);
    },
    useTransition: function() {
      var t = kc(!1);
      return t = io.bind(
        null,
        $,
        t.queue,
        !0,
        !1
      ), It().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = $, u = It();
      if (at) {
        if (e === void 0)
          throw Error(d(407));
        e = e();
      } else {
        if (e = l(), gt === null)
          throw Error(d(349));
        (lt & 127) !== 0 || qs(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, Is(Ys.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Bs.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = It(), l = gt.identifierPrefix;
      if (at) {
        var e = Ul, a = xl;
        e = (a & ~(1 << 32 - ol(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = tn++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = G0++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: ei,
    useFormState: Js,
    useActionState: Js,
    useOptimistic: function(t) {
      var l = It();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = ai.bind(
        null,
        $,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Jc,
    useCacheRefresh: function() {
      return It().memoizedState = K0.bind(
        null,
        $
      );
    },
    useEffectEvent: function(t) {
      var l = It(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((ft & 2) !== 0)
          throw Error(d(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, ui = {
    readContext: Kt,
    use: en,
    useCallback: uo,
    useContext: Kt,
    useEffect: Ic,
    useImperativeHandle: ao,
    useInsertionEffect: to,
    useLayoutEffect: lo,
    useMemo: no,
    useReducer: an,
    useRef: Fs,
    useState: function() {
      return an(Ll);
    },
    useDebugValue: Pc,
    useDeferredValue: function(t, l) {
      var e = Dt();
      return co(
        e,
        mt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = an(Ll)[0], l = Dt().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Rs,
    useId: oo,
    useHostTransitionStatus: ei,
    useFormState: Ws,
    useActionState: Ws,
    useOptimistic: function(t, l) {
      var e = Dt();
      return Qs(e, mt, t, l);
    },
    useMemoCache: Jc,
    useCacheRefresh: ro
  };
  ui.useEffectEvent = Ps;
  var go = {
    readContext: Kt,
    use: en,
    useCallback: uo,
    useContext: Kt,
    useEffect: Ic,
    useImperativeHandle: ao,
    useInsertionEffect: to,
    useLayoutEffect: lo,
    useMemo: no,
    useReducer: $c,
    useRef: Fs,
    useState: function() {
      return $c(Ll);
    },
    useDebugValue: Pc,
    useDeferredValue: function(t, l) {
      var e = Dt();
      return mt === null ? ti(e, t, l) : co(
        e,
        mt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = $c(Ll)[0], l = Dt().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Rs,
    useId: oo,
    useHostTransitionStatus: ei,
    useFormState: ks,
    useActionState: ks,
    useOptimistic: function(t, l) {
      var e = Dt();
      return mt !== null ? Qs(e, mt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Jc,
    useCacheRefresh: ro
  };
  go.useEffectEvent = Ps;
  function ni(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : H({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var ci = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = gl(), u = fe(a);
      u.payload = l, e != null && (u.callback = e), l = se(t, u, a), l !== null && (cl(l, t, a), $a(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = gl(), u = fe(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = se(t, u, a), l !== null && (cl(l, t, a), $a(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = gl(), a = fe(e);
      a.tag = 2, l != null && (a.callback = l), l = se(t, a, e), l !== null && (cl(l, t, e), $a(l, t, e));
    }
  };
  function bo(t, l, e, a, u, n, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, c) : l.prototype && l.prototype.isPureReactComponent ? !Qa(e, a) || !Qa(u, n) : !0;
  }
  function So(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && ci.enqueueReplaceState(l, l.state, null);
  }
  function Qe(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = H({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function Eo(t) {
    Yu(t);
  }
  function po(t) {
    console.error(t);
  }
  function zo(t) {
    Yu(t);
  }
  function fn(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function wo(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function ii(t, l, e) {
    return e = fe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      fn(t, l);
    }, e;
  }
  function To(t) {
    return t = fe(t), t.tag = 3, t;
  }
  function Ao(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        wo(l, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      wo(l, e, a), typeof u != "function" && (ye === null ? ye = /* @__PURE__ */ new Set([this]) : ye.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function W0(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ia(
        l,
        e,
        u,
        !0
      ), e = ml.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Al === null ? En() : e.alternate === null && At === 0 && (At = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Wu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), xi(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Wu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), xi(t, a, u)), !1;
        }
        throw Error(d(435, e.tag));
      }
      return xi(t, a, u), En(), !1;
    }
    if (at)
      return l = ml.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== _c && (t = Error(d(422), { cause: a }), La(pl(t, e)))) : (a !== _c && (l = Error(d(423), {
        cause: a
      }), La(
        pl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = pl(a, e), u = ii(
        t.stateNode,
        a,
        u
      ), Bc(t, u), At !== 4 && (At = 2)), !1;
    var n = Error(d(520), { cause: a });
    if (n = pl(n, e), su === null ? su = [n] : su.push(n), At !== 4 && (At = 2), l === null) return !0;
    a = pl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = ii(e.stateNode, a, t), Bc(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ye === null || !ye.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = To(u), Ao(
              u,
              t,
              e,
              a
            ), Bc(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var fi = Error(d(461)), Ut = !1;
  function Jt(t, l, e, a) {
    l.child = t === null ? Ms(l, null, e, a) : je(
      l,
      t.child,
      e,
      a
    );
  }
  function _o(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a)
        i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return Re(l), a = Zc(
      t,
      l,
      e,
      c,
      n,
      u
    ), i = Lc(), t !== null && !Ut ? (Vc(t, l, u), Vl(t, l, u)) : (at && i && Tc(l), l.flags |= 1, Jt(t, l, a, u), l.child);
  }
  function Oo(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !pc(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, Mo(
        t,
        l,
        n,
        a,
        u
      )) : (t = Xu(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !hi(t, u)) {
      var c = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Qa, e(c, a) && t.ref === l.ref)
        return Vl(t, l, u);
    }
    return l.flags |= 1, t = jl(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Mo(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Qa(n, a) && t.ref === l.ref)
        if (Ut = !1, l.pendingProps = a = n, hi(t, u))
          (t.flags & 131072) !== 0 && (Ut = !0);
        else
          return l.lanes = t.lanes, Vl(t, l, u);
    }
    return si(
      t,
      l,
      e,
      a,
      u
    );
  }
  function Do(t, l, e, a) {
    var u = a.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, l.child = null;
        return Co(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ku(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? Ns(l, n) : jc(), xs(l);
      else
        return a = l.lanes = 536870912, Co(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Ku(l, n.cachePool), Ns(l, n), re(), l.memoizedState = null) : (t !== null && Ku(l, null), jc(), re());
    return Jt(t, l, u, e), l.child;
  }
  function eu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Co(t, l, e, a, u) {
    var n = Uc();
    return n = n === null ? null : { parent: Nt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && Ku(l, null), jc(), xs(l), t !== null && ia(t, l, a, !0), l.childLanes = u, null;
  }
  function sn(t, l) {
    return l = rn(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function No(t, l, e) {
    return je(l, t.child, null, e), t = sn(l, l.pendingProps), t.flags |= 2, vl(l), l.memoizedState = null, t;
  }
  function $0(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (at) {
        if (a.mode === "hidden")
          return t = sn(l, a), l.lanes = 536870912, eu(null, t);
        if (Qc(l), (t = bt) ? (t = Zr(
          t,
          Tl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: xl, overflow: Ul } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ms(t), e.return = l, l.child = e, Vt = l, bt = null)) : t = null, t === null) throw ne(l);
        return l.lanes = 536870912, null;
      }
      return sn(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (Qc(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = No(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(d(558));
      else if (Ut || ia(t, l, e, !1), u = (e & t.childLanes) !== 0, Ut || u) {
        if (a = gt, a !== null && (c = Ef(a, e), c !== 0 && c !== n.retryLane))
          throw n.retryLane = c, Ne(t, c), cl(a, t, c), fi;
        En(), l = No(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, bt = _l(c.nextSibling), Vt = l, at = !0, ue = null, Tl = !1, t !== null && hs(l, t), l = sn(l, a), l.flags |= 4096;
      return l;
    }
    return t = jl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function on(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(d(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function si(t, l, e, a, u) {
    return Re(l), e = Zc(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = Lc(), t !== null && !Ut ? (Vc(t, l, u), Vl(t, l, u)) : (at && a && Tc(l), l.flags |= 1, Jt(t, l, e, u), l.child);
  }
  function xo(t, l, e, a, u, n) {
    return Re(l), l.updateQueue = null, e = Hs(
      l,
      a,
      e,
      u
    ), Us(t), a = Lc(), t !== null && !Ut ? (Vc(t, l, n), Vl(t, l, n)) : (at && a && Tc(l), l.flags |= 1, Jt(t, l, e, n), l.child);
  }
  function Uo(t, l, e, a, u) {
    if (Re(l), l.stateNode === null) {
      var n = aa, c = e.contextType;
      typeof c == "object" && c !== null && (n = Kt(c)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ci, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, Rc(l), c = e.contextType, n.context = typeof c == "object" && c !== null ? Kt(c) : aa, n.state = l.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (ni(
        l,
        e,
        c,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && ci.enqueueReplaceState(n, n.state, null), Fa(l, a, n, u), ka(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var i = l.memoizedProps, f = Qe(e, i);
      n.props = f;
      var v = n.context, E = e.contextType;
      c = aa, typeof E == "object" && E !== null && (c = Kt(E));
      var w = e.getDerivedStateFromProps;
      E = typeof w == "function" || typeof n.getSnapshotBeforeUpdate == "function", i = l.pendingProps !== i, E || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i || v !== c) && So(
        l,
        n,
        a,
        c
      ), ie = !1;
      var y = l.memoizedState;
      n.state = y, Fa(l, a, n, u), ka(), v = l.memoizedState, i || y !== v || ie ? (typeof w == "function" && (ni(
        l,
        e,
        w,
        a
      ), v = l.memoizedState), (f = ie || bo(
        l,
        e,
        f,
        a,
        y,
        v,
        c
      )) ? (E || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = v), n.props = a, n.state = v, n.context = c, a = f) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, qc(t, l), c = l.memoizedProps, E = Qe(e, c), n.props = E, w = l.pendingProps, y = n.context, v = e.contextType, f = aa, typeof v == "object" && v !== null && (f = Kt(v)), i = e.getDerivedStateFromProps, (v = typeof i == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== w || y !== f) && So(
        l,
        n,
        a,
        f
      ), ie = !1, y = l.memoizedState, n.state = y, Fa(l, a, n, u), ka();
      var g = l.memoizedState;
      c !== w || y !== g || ie || t !== null && t.dependencies !== null && Lu(t.dependencies) ? (typeof i == "function" && (ni(
        l,
        e,
        i,
        a
      ), g = l.memoizedState), (E = ie || bo(
        l,
        e,
        E,
        a,
        y,
        g,
        f
      ) || t !== null && t.dependencies !== null && Lu(t.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        f
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = g), n.props = a, n.state = g, n.context = f, a = E) : (typeof n.componentDidUpdate != "function" || c === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, on(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = je(
      l,
      t.child,
      null,
      u
    ), l.child = je(
      l,
      null,
      e,
      u
    )) : Jt(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = Vl(
      t,
      l,
      u
    ), t;
  }
  function Ho(t, l, e, a) {
    return Ue(), l.flags |= 256, Jt(t, l, e, a), l.child;
  }
  var oi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ri(t) {
    return { baseLanes: t, cachePool: zs() };
  }
  function di(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= hl), t;
  }
  function Ro(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, c;
    if ((c = n) || (c = t !== null && t.memoizedState === null ? !1 : (Mt.current & 2) !== 0), c && (u = !0, l.flags &= -129), c = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (at) {
        if (u ? oe(l) : re(), (t = bt) ? (t = Zr(
          t,
          Tl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: xl, overflow: Ul } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ms(t), e.return = l, l.child = e, Vt = l, bt = null)) : t = null, t === null) throw ne(l);
        return Wi(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, u ? (re(), u = l.mode, i = rn(
        { mode: "hidden", children: i },
        u
      ), a = xe(
        a,
        u,
        e,
        null
      ), i.return = l, a.return = l, i.sibling = a, l.child = i, a = l.child, a.memoizedState = ri(e), a.childLanes = di(
        t,
        c,
        e
      ), l.memoizedState = oi, eu(null, a)) : (oe(l), mi(l, i));
    }
    var f = t.memoizedState;
    if (f !== null && (i = f.dehydrated, i !== null)) {
      if (n)
        l.flags & 256 ? (oe(l), l.flags &= -257, l = vi(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (re(), l.child = t.child, l.flags |= 128, l = null) : (re(), i = a.fallback, u = l.mode, a = rn(
          { mode: "visible", children: a.children },
          u
        ), i = xe(
          i,
          u,
          e,
          null
        ), i.flags |= 2, a.return = l, i.return = l, a.sibling = i, l.child = a, je(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = ri(e), a.childLanes = di(
          t,
          c,
          e
        ), l.memoizedState = oi, l = eu(null, a));
      else if (oe(l), Wi(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var v = c.dgst;
        c = v, a = Error(d(419)), a.stack = "", a.digest = c, La({ value: a, source: null, stack: null }), l = vi(
          t,
          l,
          e
        );
      } else if (Ut || ia(t, l, e, !1), c = (e & t.childLanes) !== 0, Ut || c) {
        if (c = gt, c !== null && (a = Ef(c, e), a !== 0 && a !== f.retryLane))
          throw f.retryLane = a, Ne(t, a), cl(c, t, a), fi;
        Ji(i) || En(), l = vi(
          t,
          l,
          e
        );
      } else
        Ji(i) ? (l.flags |= 192, l.child = t.child, l = null) : (t = f.treeContext, bt = _l(
          i.nextSibling
        ), Vt = l, at = !0, ue = null, Tl = !1, t !== null && hs(l, t), l = mi(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return u ? (re(), i = a.fallback, u = l.mode, f = t.child, v = f.sibling, a = jl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 65011712, v !== null ? i = jl(
      v,
      i
    ) : (i = xe(
      i,
      u,
      e,
      null
    ), i.flags |= 2), i.return = l, a.return = l, a.sibling = i, l.child = a, eu(null, a), a = l.child, i = t.child.memoizedState, i === null ? i = ri(e) : (u = i.cachePool, u !== null ? (f = Nt._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = zs(), i = {
      baseLanes: i.baseLanes | e,
      cachePool: u
    }), a.memoizedState = i, a.childLanes = di(
      t,
      c,
      e
    ), l.memoizedState = oi, eu(t.child, a)) : (oe(l), e = t.child, t = e.sibling, e = jl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (c = l.deletions, c === null ? (l.deletions = [t], l.flags |= 16) : c.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function mi(t, l) {
    return l = rn(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function rn(t, l) {
    return t = dl(22, t, null, l), t.lanes = 0, t;
  }
  function vi(t, l, e) {
    return je(l, t.child, null, e), t = mi(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function qo(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Dc(t.return, l, e);
  }
  function yi(t, l, e, a, u, n) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (c.isBackwards = l, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = u, c.treeForkCount = n);
  }
  function Bo(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var c = Mt.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, l.flags |= 128) : c &= 1, D(Mt, c), Jt(t, l, a, e), a = at ? Za : 0, !i && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && qo(t, e, l);
        else if (t.tag === 19)
          qo(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "forwards":
        for (e = l.child, u = null; e !== null; )
          t = e.alternate, t !== null && Iu(t) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), yi(
          l,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Iu(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        yi(
          l,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        yi(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Vl(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), ve |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (ia(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(d(153));
    if (l.child !== null) {
      for (t = l.child, e = jl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = jl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function hi(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Lu(t)));
  }
  function k0(t, l, e) {
    switch (l.tag) {
      case 3:
        Ct(l, l.stateNode.containerInfo), ce(l, Nt, t.memoizedState.cache), Ue();
        break;
      case 27:
      case 5:
        Ma(l);
        break;
      case 4:
        Ct(l, l.stateNode.containerInfo);
        break;
      case 10:
        ce(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Qc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (oe(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Ro(t, l, e) : (oe(l), t = Vl(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        oe(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (ia(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Bo(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), D(Mt, Mt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Do(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        ce(l, Nt, t.memoizedState.cache);
    }
    return Vl(t, l, e);
  }
  function Yo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Ut = !0;
      else {
        if (!hi(t, e) && (l.flags & 128) === 0)
          return Ut = !1, k0(
            t,
            l,
            e
          );
        Ut = (t.flags & 131072) !== 0;
      }
    else
      Ut = !1, at && (l.flags & 1048576) !== 0 && ys(l, Za, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Be(l.elementType), l.type = t, typeof t == "function")
            pc(t) ? (a = Qe(t, a), l.tag = 1, l = Uo(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = si(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === wt) {
                l.tag = 11, l = _o(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === W) {
                l.tag = 14, l = Oo(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = qt(t) || t, Error(d(306, l, ""));
          }
        }
        return l;
      case 0:
        return si(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = Qe(
          a,
          l.pendingProps
        ), Uo(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (Ct(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(d(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, qc(t, l), Fa(l, a, null, e);
          var c = l.memoizedState;
          if (a = c.cache, ce(l, Nt, a), a !== n.cache && Cc(
            l,
            [Nt],
            e,
            !0
          ), ka(), a = c.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = Ho(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = pl(
                Error(d(424)),
                l
              ), La(u), l = Ho(
                t,
                l,
                a,
                e
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, bt = _l(t.firstChild), Vt = l, at = !0, ue = null, Tl = !0, e = Ms(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
          else {
            if (Ue(), a === u) {
              l = Vl(
                t,
                l,
                e
              );
              break t;
            }
            Jt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return on(t, l), t === null ? (e = $r(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : at || (e = l.type, t = l.pendingProps, a = On(
          B.current
        ).createElement(e), a[Lt] = l, a[tl] = t, Wt(a, e, t), jt(a), l.stateNode = a) : l.memoizedState = $r(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ma(l), t === null && at && (a = l.stateNode = Kr(
          l.type,
          l.pendingProps,
          B.current
        ), Vt = l, Tl = !0, u = bt, Se(l.type) ? ($i = u, bt = _l(a.firstChild)) : bt = u), Jt(
          t,
          l,
          l.pendingProps.children,
          e
        ), on(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && at && ((u = a = bt) && (a = _m(
          a,
          l.type,
          l.pendingProps,
          Tl
        ), a !== null ? (l.stateNode = a, Vt = l, bt = _l(a.firstChild), Tl = !1, u = !0) : u = !1), u || ne(l)), Ma(l), u = l.type, n = l.pendingProps, c = t !== null ? t.memoizedProps : null, a = n.children, Li(u, n) ? a = null : c !== null && Li(u, c) && (l.flags |= 32), l.memoizedState !== null && (u = Zc(
          t,
          l,
          Q0,
          null,
          null,
          e
        ), gu._currentValue = u), on(t, l), Jt(t, l, a, e), l.child;
      case 6:
        return t === null && at && ((t = e = bt) && (e = Om(
          e,
          l.pendingProps,
          Tl
        ), e !== null ? (l.stateNode = e, Vt = l, bt = null, t = !0) : t = !1), t || ne(l)), null;
      case 13:
        return Ro(t, l, e);
      case 4:
        return Ct(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = je(
          l,
          null,
          a,
          e
        ) : Jt(t, l, a, e), l.child;
      case 11:
        return _o(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return Jt(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return Jt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Jt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, ce(l, l.type, a.value), Jt(t, l, a.children, e), l.child;
      case 9:
        return u = l.type._context, a = l.pendingProps.children, Re(l), u = Kt(u), a = a(u), l.flags |= 1, Jt(t, l, a, e), l.child;
      case 14:
        return Oo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Mo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Bo(t, l, e);
      case 31:
        return $0(t, l, e);
      case 22:
        return Do(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Re(l), a = Kt(Nt), t === null ? (u = Uc(), u === null && (u = gt, n = Nc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, Rc(l), ce(l, Nt, u)) : ((t.lanes & e) !== 0 && (qc(t, l), Fa(l, null, null, e), ka()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), ce(l, Nt, a)) : (a = n.cache, ce(l, Nt, a), a !== u.cache && Cc(
          l,
          [Nt],
          e,
          !0
        ))), Jt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(d(156, l.tag));
  }
  function Kl(t) {
    t.flags |= 4;
  }
  function gi(t, l, e, a, u) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (rr()) t.flags |= 8192;
        else
          throw Ye = Wu, Hc;
    } else t.flags &= -16777217;
  }
  function jo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !td(l))
      if (rr()) t.flags |= 8192;
      else
        throw Ye = Wu, Hc;
  }
  function dn(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? gf() : 536870912, t.lanes |= l, Sa |= l);
  }
  function au(t, l) {
    if (!at)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function St(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function F0(t, l, e) {
    var a = l.pendingProps;
    switch (Ac(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return St(l), null;
      case 1:
        return St(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Xl(Nt), Ot(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ca(l) ? Kl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Oc())), St(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (Kl(l), n !== null ? (St(l), jo(l, n)) : (St(l), gi(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (Kl(l), St(l), jo(l, n)) : (St(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Kl(l), St(l), gi(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (zu(l), e = B.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(d(166));
            return St(l), null;
          }
          t = q.current, ca(l) ? gs(l) : (t = Kr(u, a, e), l.stateNode = t, Kl(l));
        }
        return St(l), null;
      case 5:
        if (zu(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(d(166));
            return St(l), null;
          }
          if (n = q.current, ca(l))
            gs(l);
          else {
            var c = On(
              B.current
            );
            switch (n) {
              case 1:
                n = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = c.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? c.createElement(u, { is: a.is }) : c.createElement(u);
                }
            }
            n[Lt] = l, n[tl] = a;
            t: for (c = l.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === l) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === l)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            l.stateNode = n;
            t: switch (Wt(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Kl(l);
          }
        }
        return St(l), gi(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(d(166));
          if (t = B.current, ca(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = Vt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[Lt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Rr(t.nodeValue, e)), t || ne(l, !0);
          } else
            t = On(t).createTextNode(
              a
            ), t[Lt] = l, l.stateNode = t;
        }
        return St(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ca(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(d(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(557));
              t[Lt] = l;
            } else
              Ue(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            St(l), t = !1;
          } else
            e = Oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (vl(l), l) : (vl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(d(558));
        }
        return St(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = ca(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(d(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(d(317));
              u[Lt] = l;
            } else
              Ue(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            St(l), u = !1;
          } else
            u = Oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (vl(l), l) : (vl(l), null);
        }
        return vl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), dn(l, l.updateQueue), St(l), null);
      case 4:
        return Ot(), t === null && ji(l.stateNode.containerInfo), St(l), null;
      case 10:
        return Xl(l.type), St(l), null;
      case 19:
        if (p(Mt), a = l.memoizedState, a === null) return St(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) au(a, !1);
          else {
            if (At !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = Iu(t), n !== null) {
                  for (l.flags |= 128, au(a, !1), t = n.updateQueue, l.updateQueue = t, dn(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    ds(e, t), e = e.sibling;
                  return D(
                    Mt,
                    Mt.current & 1 | 2
                  ), at && Gl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && fl() > gn && (l.flags |= 128, u = !0, au(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Iu(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, dn(l, t), au(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !at)
                return St(l), null;
            } else
              2 * fl() - a.renderingStartTime > gn && e !== 536870912 && (l.flags |= 128, u = !0, au(a, !1), l.lanes = 4194304);
          a.isBackwards ? (n.sibling = l.child, l.child = n) : (t = a.last, t !== null ? t.sibling = n : l.child = n, a.last = n);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = fl(), t.sibling = null, e = Mt.current, D(
          Mt,
          u ? e & 1 | 2 : e & 1
        ), at && Gl(l, a.treeForkCount), t) : (St(l), null);
      case 22:
      case 23:
        return vl(l), Gc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (St(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : St(l), e = l.updateQueue, e !== null && dn(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && p(qe), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Xl(Nt), St(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, l.tag));
  }
  function I0(t, l) {
    switch (Ac(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Xl(Nt), Ot(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return zu(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (vl(l), l.alternate === null)
            throw Error(d(340));
          Ue();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (vl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(d(340));
          Ue();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return p(Mt), null;
      case 4:
        return Ot(), null;
      case 10:
        return Xl(l.type), null;
      case 22:
      case 23:
        return vl(l), Gc(), t !== null && p(qe), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Xl(Nt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Go(t, l) {
    switch (Ac(l), l.tag) {
      case 3:
        Xl(Nt), Ot();
        break;
      case 26:
      case 27:
      case 5:
        zu(l);
        break;
      case 4:
        Ot();
        break;
      case 31:
        l.memoizedState !== null && vl(l);
        break;
      case 13:
        vl(l);
        break;
      case 19:
        p(Mt);
        break;
      case 10:
        Xl(l.type);
        break;
      case 22:
      case 23:
        vl(l), Gc(), t !== null && p(qe);
        break;
      case 24:
        Xl(Nt);
    }
  }
  function uu(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create, c = e.inst;
            a = n(), c.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (i) {
      rt(l, l.return, i);
    }
  }
  function de(t, l, e) {
    try {
      var a = l.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var c = a.inst, i = c.destroy;
            if (i !== void 0) {
              c.destroy = void 0, u = l;
              var f = e, v = i;
              try {
                v();
              } catch (E) {
                rt(
                  u,
                  f,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      rt(l, l.return, E);
    }
  }
  function Qo(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Cs(l, e);
      } catch (a) {
        rt(t, t.return, a);
      }
    }
  }
  function Xo(t, l, e) {
    e.props = Qe(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      rt(t, l, a);
    }
  }
  function nu(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      rt(t, l, u);
    }
  }
  function Hl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          rt(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          rt(t, l, u);
        }
      else e.current = null;
  }
  function Zo(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      rt(t, t.return, u);
    }
  }
  function bi(t, l, e) {
    try {
      var a = t.stateNode;
      Em(a, t.type, e, l), a[tl] = l;
    } catch (u) {
      rt(t, t.return, u);
    }
  }
  function Lo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Se(t.type) || t.tag === 4;
  }
  function Si(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Lo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Se(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ei(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Bl));
    else if (a !== 4 && (a === 27 && Se(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Ei(t, l, e), t = t.sibling; t !== null; )
        Ei(t, l, e), t = t.sibling;
  }
  function mn(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Se(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (mn(t, l, e), t = t.sibling; t !== null; )
        mn(t, l, e), t = t.sibling;
  }
  function Vo(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      Wt(l, a, e), l[Lt] = t, l[tl] = e;
    } catch (n) {
      rt(t, t.return, n);
    }
  }
  var Jl = !1, Ht = !1, pi = !1, Ko = typeof WeakSet == "function" ? WeakSet : Set, Gt = null;
  function P0(t, l) {
    if (t = t.containerInfo, Xi = Hn, t = as(t), vc(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break t;
            }
            var c = 0, i = -1, f = -1, v = 0, E = 0, w = t, y = null;
            l: for (; ; ) {
              for (var g; w !== e || u !== 0 && w.nodeType !== 3 || (i = c + u), w !== n || a !== 0 && w.nodeType !== 3 || (f = c + a), w.nodeType === 3 && (c += w.nodeValue.length), (g = w.firstChild) !== null; )
                y = w, w = g;
              for (; ; ) {
                if (w === t) break l;
                if (y === e && ++v === u && (i = c), y === n && ++E === a && (f = c), (g = w.nextSibling) !== null) break;
                w = y, y = w.parentNode;
              }
              w = g;
            }
            e = i === -1 || f === -1 ? null : { start: i, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Zi = { focusedElem: t, selectionRange: e }, Hn = !1, Gt = l; Gt !== null; )
      if (l = Gt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Gt = t;
      else
        for (; Gt !== null; ) {
          switch (l = Gt, n = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  u = t[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                t = void 0, e = l, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var R = Qe(
                    e.type,
                    u
                  );
                  t = a.getSnapshotBeforeUpdate(
                    R,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (V) {
                  rt(
                    e,
                    e.return,
                    V
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Ki(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ki(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(d(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Gt = t;
            break;
          }
          Gt = l.return;
        }
  }
  function Jo(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        $l(t, e), a & 4 && uu(5, e);
        break;
      case 1:
        if ($l(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (c) {
              rt(e, e.return, c);
            }
          else {
            var u = Qe(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              rt(
                e,
                e.return,
                c
              );
            }
          }
        a & 64 && Qo(e), a & 512 && nu(e, e.return);
        break;
      case 3:
        if ($l(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Cs(t, l);
          } catch (c) {
            rt(e, e.return, c);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Vo(e);
      case 26:
      case 5:
        $l(t, e), l === null && a & 4 && Zo(e), a & 512 && nu(e, e.return);
        break;
      case 12:
        $l(t, e);
        break;
      case 31:
        $l(t, e), a & 4 && ko(t, e);
        break;
      case 13:
        $l(t, e), a & 4 && Fo(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = fm.bind(
          null,
          e
        ), Mm(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Jl, !a) {
          l = l !== null && l.memoizedState !== null || Ht, u = Jl;
          var n = Ht;
          Jl = a, (Ht = l) && !n ? kl(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : $l(t, e), Jl = u, Ht = n;
        }
        break;
      case 30:
        break;
      default:
        $l(t, e);
    }
  }
  function Wo(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Wo(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Fn(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Et = null, el = !1;
  function Wl(t, l, e) {
    for (e = e.child; e !== null; )
      $o(t, l, e), e = e.sibling;
  }
  function $o(t, l, e) {
    if (sl && typeof sl.onCommitFiberUnmount == "function")
      try {
        sl.onCommitFiberUnmount(Da, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Ht || Hl(e, l), Wl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Ht || Hl(e, l);
        var a = Et, u = el;
        Se(e.type) && (Et = e.stateNode, el = !1), Wl(
          t,
          l,
          e
        ), vu(e.stateNode), Et = a, el = u;
        break;
      case 5:
        Ht || Hl(e, l);
      case 6:
        if (a = Et, u = el, Et = null, Wl(
          t,
          l,
          e
        ), Et = a, el = u, Et !== null)
          if (el)
            try {
              (Et.nodeType === 9 ? Et.body : Et.nodeName === "HTML" ? Et.ownerDocument.body : Et).removeChild(e.stateNode);
            } catch (n) {
              rt(
                e,
                l,
                n
              );
            }
          else
            try {
              Et.removeChild(e.stateNode);
            } catch (n) {
              rt(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        Et !== null && (el ? (t = Et, Qr(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Oa(t)) : Qr(Et, e.stateNode));
        break;
      case 4:
        a = Et, u = el, Et = e.stateNode.containerInfo, el = !0, Wl(
          t,
          l,
          e
        ), Et = a, el = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, l), Ht || de(4, e, l), Wl(
          t,
          l,
          e
        );
        break;
      case 1:
        Ht || (Hl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Xo(
          e,
          l,
          a
        )), Wl(
          t,
          l,
          e
        );
        break;
      case 21:
        Wl(
          t,
          l,
          e
        );
        break;
      case 22:
        Ht = (a = Ht) || e.memoizedState !== null, Wl(
          t,
          l,
          e
        ), Ht = a;
        break;
      default:
        Wl(
          t,
          l,
          e
        );
    }
  }
  function ko(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Oa(t);
      } catch (e) {
        rt(l, l.return, e);
      }
    }
  }
  function Fo(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Oa(t);
      } catch (e) {
        rt(l, l.return, e);
      }
  }
  function tm(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Ko()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Ko()), l;
      default:
        throw Error(d(435, t.tag));
    }
  }
  function vn(t, l) {
    var e = tm(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = sm.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function al(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = t, c = l, i = c;
        t: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (Se(i.type)) {
                Et = i.stateNode, el = !1;
                break t;
              }
              break;
            case 5:
              Et = i.stateNode, el = !1;
              break t;
            case 3:
            case 4:
              Et = i.stateNode.containerInfo, el = !0;
              break t;
          }
          i = i.return;
        }
        if (Et === null) throw Error(d(160));
        $o(n, c, u), Et = null, el = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Io(l, t), l = l.sibling;
  }
  var Cl = null;
  function Io(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        al(l, t), ul(t), a & 4 && (de(3, t, t.return), uu(3, t), de(5, t, t.return));
        break;
      case 1:
        al(l, t), ul(t), a & 512 && (Ht || e === null || Hl(e, e.return)), a & 64 && Jl && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Cl;
        if (al(l, t), ul(t), a & 512 && (Ht || e === null || Hl(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, u = u.ownerDocument || u;
                  l: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[xa] || n[Lt] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), Wt(n, a, e), n[Lt] = t, jt(n), a = n;
                      break t;
                    case "link":
                      var c = Ir(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (n = c[i], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            c.splice(i, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Wt(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (c = Ir(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (i = 0; i < c.length; i++)
                          if (n = c[i], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            c.splice(i, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Wt(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(d(468, a));
                  }
                  n[Lt] = t, jt(n), a = n;
                }
                t.stateNode = a;
              } else
                Pr(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Fr(
                u,
                a,
                t.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? Pr(
              u,
              t.type,
              t.stateNode
            ) : Fr(
              u,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && bi(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        al(l, t), ul(t), a & 512 && (Ht || e === null || Hl(e, e.return)), e !== null && a & 4 && bi(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (al(l, t), ul(t), a & 512 && (Ht || e === null || Hl(e, e.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ke(u, "");
          } catch (R) {
            rt(t, t.return, R);
          }
        }
        a & 4 && t.stateNode != null && (u = t.memoizedProps, bi(
          t,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (pi = !0);
        break;
      case 6:
        if (al(l, t), ul(t), a & 4) {
          if (t.stateNode === null)
            throw Error(d(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (R) {
            rt(t, t.return, R);
          }
        }
        break;
      case 3:
        if (Cn = null, u = Cl, Cl = Mn(l.containerInfo), al(l, t), Cl = u, ul(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Oa(l.containerInfo);
          } catch (R) {
            rt(t, t.return, R);
          }
        pi && (pi = !1, Po(t));
        break;
      case 4:
        a = Cl, Cl = Mn(
          t.stateNode.containerInfo
        ), al(l, t), ul(t), Cl = a;
        break;
      case 12:
        al(l, t), ul(t);
        break;
      case 31:
        al(l, t), ul(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vn(t, a)));
        break;
      case 13:
        al(l, t), ul(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (hn = fl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vn(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, v = Jl, E = Ht;
        if (Jl = v || u, Ht = E || f, al(l, t), Ht = E, Jl = v, ul(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = u ? l._visibility & -2 : l._visibility | 1, u && (e === null || f || Jl || Ht || Xe(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                f = e = l;
                try {
                  if (n = f.stateNode, u)
                    c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    i = f.stateNode;
                    var w = f.memoizedProps.style, y = w != null && w.hasOwnProperty("display") ? w.display : null;
                    i.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (R) {
                  rt(f, f.return, R);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                f = l;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (R) {
                  rt(f, f.return, R);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                f = l;
                try {
                  var g = f.stateNode;
                  u ? Xr(g, !0) : Xr(f.stateNode, !1);
                } catch (R) {
                  rt(f, f.return, R);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, vn(t, e))));
        break;
      case 19:
        al(l, t), ul(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vn(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        al(l, t), ul(t);
    }
  }
  function ul(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Lo(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(d(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Si(t);
            mn(t, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (ke(c, ""), e.flags &= -33);
            var i = Si(t);
            mn(t, i, c);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, v = Si(t);
            Ei(
              t,
              v,
              f
            );
            break;
          default:
            throw Error(d(161));
        }
      } catch (E) {
        rt(t, t.return, E);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Po(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Po(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function $l(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Jo(t, l.alternate, l), l = l.sibling;
  }
  function Xe(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          de(4, l, l.return), Xe(l);
          break;
        case 1:
          Hl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Xo(
            l,
            l.return,
            e
          ), Xe(l);
          break;
        case 27:
          vu(l.stateNode);
        case 26:
        case 5:
          Hl(l, l.return), Xe(l);
          break;
        case 22:
          l.memoizedState === null && Xe(l);
          break;
        case 30:
          Xe(l);
          break;
        default:
          Xe(l);
      }
      t = t.sibling;
    }
  }
  function kl(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          kl(
            u,
            n,
            e
          ), uu(4, n);
          break;
        case 1:
          if (kl(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (v) {
              rt(a, a.return, v);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var i = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Ds(f[u], i);
            } catch (v) {
              rt(a, a.return, v);
            }
          }
          e && c & 64 && Qo(n), nu(n, n.return);
          break;
        case 27:
          Vo(n);
        case 26:
        case 5:
          kl(
            u,
            n,
            e
          ), e && a === null && c & 4 && Zo(n), nu(n, n.return);
          break;
        case 12:
          kl(
            u,
            n,
            e
          );
          break;
        case 31:
          kl(
            u,
            n,
            e
          ), e && c & 4 && ko(u, n);
          break;
        case 13:
          kl(
            u,
            n,
            e
          ), e && c & 4 && Fo(u, n);
          break;
        case 22:
          n.memoizedState === null && kl(
            u,
            n,
            e
          ), nu(n, n.return);
          break;
        case 30:
          break;
        default:
          kl(
            u,
            n,
            e
          );
      }
      l = l.sibling;
    }
  }
  function zi(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Va(e));
  }
  function wi(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Va(t));
  }
  function Nl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        tr(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function tr(t, l, e, a) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Nl(
          t,
          l,
          e,
          a
        ), u & 2048 && uu(9, l);
        break;
      case 1:
        Nl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Nl(
          t,
          l,
          e,
          a
        ), u & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Va(t)));
        break;
      case 12:
        if (u & 2048) {
          Nl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var n = l.memoizedProps, c = n.id, i = n.onPostCommit;
            typeof i == "function" && i(
              c,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (f) {
            rt(l, l.return, f);
          }
        } else
          Nl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Nl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Nl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = l.stateNode, c = l.alternate, l.memoizedState !== null ? n._visibility & 2 ? Nl(
          t,
          l,
          e,
          a
        ) : cu(t, l) : n._visibility & 2 ? Nl(
          t,
          l,
          e,
          a
        ) : (n._visibility |= 2, ha(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && zi(c, l);
        break;
      case 24:
        Nl(
          t,
          l,
          e,
          a
        ), u & 2048 && wi(l.alternate, l);
        break;
      default:
        Nl(
          t,
          l,
          e,
          a
        );
    }
  }
  function ha(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, c = l, i = e, f = a, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ha(
            n,
            c,
            i,
            f,
            u
          ), uu(8, c);
          break;
        case 23:
          break;
        case 22:
          var E = c.stateNode;
          c.memoizedState !== null ? E._visibility & 2 ? ha(
            n,
            c,
            i,
            f,
            u
          ) : cu(
            n,
            c
          ) : (E._visibility |= 2, ha(
            n,
            c,
            i,
            f,
            u
          )), u && v & 2048 && zi(
            c.alternate,
            c
          );
          break;
        case 24:
          ha(
            n,
            c,
            i,
            f,
            u
          ), u && v & 2048 && wi(c.alternate, c);
          break;
        default:
          ha(
            n,
            c,
            i,
            f,
            u
          );
      }
      l = l.sibling;
    }
  }
  function cu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            cu(e, a), u & 2048 && zi(
              a.alternate,
              a
            );
            break;
          case 24:
            cu(e, a), u & 2048 && wi(a.alternate, a);
            break;
          default:
            cu(e, a);
        }
        l = l.sibling;
      }
  }
  var iu = 8192;
  function ga(t, l, e) {
    if (t.subtreeFlags & iu)
      for (t = t.child; t !== null; )
        lr(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function lr(t, l, e) {
    switch (t.tag) {
      case 26:
        ga(
          t,
          l,
          e
        ), t.flags & iu && t.memoizedState !== null && Gm(
          e,
          Cl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ga(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Cl;
        Cl = Mn(t.stateNode.containerInfo), ga(
          t,
          l,
          e
        ), Cl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = iu, iu = 16777216, ga(
          t,
          l,
          e
        ), iu = a) : ga(
          t,
          l,
          e
        ));
        break;
      default:
        ga(
          t,
          l,
          e
        );
    }
  }
  function er(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function fu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Gt = a, ur(
            a,
            t
          );
        }
      er(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ar(t), t = t.sibling;
  }
  function ar(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        fu(t), t.flags & 2048 && de(9, t, t.return);
        break;
      case 3:
        fu(t);
        break;
      case 12:
        fu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, yn(t)) : fu(t);
        break;
      default:
        fu(t);
    }
  }
  function yn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Gt = a, ur(
            a,
            t
          );
        }
      er(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          de(8, l, l.return), yn(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, yn(l));
          break;
        default:
          yn(l);
      }
      t = t.sibling;
    }
  }
  function ur(t, l) {
    for (; Gt !== null; ) {
      var e = Gt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          de(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Gt = a;
      else
        t: for (e = t; Gt !== null; ) {
          a = Gt;
          var u = a.sibling, n = a.return;
          if (Wo(a), a === e) {
            Gt = null;
            break t;
          }
          if (u !== null) {
            u.return = n, Gt = u;
            break t;
          }
          Gt = n;
        }
    }
  }
  var lm = {
    getCacheForType: function(t) {
      var l = Kt(Nt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return Kt(Nt).controller.signal;
    }
  }, em = typeof WeakMap == "function" ? WeakMap : Map, ft = 0, gt = null, P = null, lt = 0, ot = 0, yl = null, me = !1, ba = !1, Ti = !1, Fl = 0, At = 0, ve = 0, Ze = 0, Ai = 0, hl = 0, Sa = 0, su = null, nl = null, _i = !1, hn = 0, nr = 0, gn = 1 / 0, bn = null, ye = null, Bt = 0, he = null, Ea = null, Il = 0, Oi = 0, Mi = null, cr = null, ou = 0, Di = null;
  function gl() {
    return (ft & 2) !== 0 && lt !== 0 ? lt & -lt : T.T !== null ? Ri() : pf();
  }
  function ir() {
    if (hl === 0)
      if ((lt & 536870912) === 0 || at) {
        var t = Au;
        Au <<= 1, (Au & 3932160) === 0 && (Au = 262144), hl = t;
      } else hl = 536870912;
    return t = ml.current, t !== null && (t.flags |= 32), hl;
  }
  function cl(t, l, e) {
    (t === gt && (ot === 2 || ot === 9) || t.cancelPendingCommit !== null) && (pa(t, 0), ge(
      t,
      lt,
      hl,
      !1
    )), Na(t, e), ((ft & 2) === 0 || t !== gt) && (t === gt && ((ft & 2) === 0 && (Ze |= e), At === 4 && ge(
      t,
      lt,
      hl,
      !1
    )), Rl(t));
  }
  function fr(t, l, e) {
    if ((ft & 6) !== 0) throw Error(d(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ca(t, l), u = a ? nm(t, l) : Ni(t, l, !0), n = a;
    do {
      if (u === 0) {
        ba && !a && ge(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !am(e)) {
          u = Ni(t, l, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = l, t.errorRecoveryDisabledLanes & n)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            l = c;
            t: {
              var i = t;
              u = su;
              var f = i.current.memoizedState.isDehydrated;
              if (f && (pa(i, c).flags |= 256), c = Ni(
                i,
                c,
                !1
              ), c !== 2) {
                if (Ti && !f) {
                  i.errorRecoveryDisabledLanes |= n, Ze |= n, u = 4;
                  break t;
                }
                n = nl, nl = u, n !== null && (nl === null ? nl = n : nl.push.apply(
                  nl,
                  n
                ));
              }
              u = c;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          pa(t, 0), ge(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
            case 0:
            case 1:
              throw Error(d(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              ge(
                a,
                l,
                hl,
                !me
              );
              break t;
            case 2:
              nl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(d(329));
          }
          if ((l & 62914560) === l && (u = hn + 300 - fl(), 10 < u)) {
            if (ge(
              a,
              l,
              hl,
              !me
            ), Ou(a, 0, !0) !== 0) break t;
            Il = l, a.timeoutHandle = jr(
              sr.bind(
                null,
                a,
                e,
                nl,
                bn,
                _i,
                l,
                hl,
                Ze,
                Sa,
                me,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          sr(
            a,
            e,
            nl,
            bn,
            _i,
            l,
            hl,
            Ze,
            Sa,
            me,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Rl(t);
  }
  function sr(t, l, e, a, u, n, c, i, f, v, E, w, y, g) {
    if (t.timeoutHandle = -1, w = l.subtreeFlags, w & 8192 || (w & 16785408) === 16785408) {
      w = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bl
      }, lr(
        l,
        n,
        w
      );
      var R = (n & 62914560) === n ? hn - fl() : (n & 4194048) === n ? nr - fl() : 0;
      if (R = Qm(
        w,
        R
      ), R !== null) {
        Il = n, t.cancelPendingCommit = R(
          gr.bind(
            null,
            t,
            l,
            n,
            e,
            a,
            u,
            c,
            i,
            f,
            E,
            w,
            null,
            y,
            g
          )
        ), ge(t, n, c, !v);
        return;
      }
    }
    gr(
      t,
      l,
      n,
      e,
      a,
      u,
      c,
      i,
      f
    );
  }
  function am(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!rl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function ge(t, l, e, a) {
    l &= ~Ai, l &= ~Ze, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - ol(u), c = 1 << n;
      a[n] = -1, u &= ~c;
    }
    e !== 0 && bf(t, e, l);
  }
  function Sn() {
    return (ft & 6) === 0 ? (ru(0), !1) : !0;
  }
  function Ci() {
    if (P !== null) {
      if (ot === 0)
        var t = P.return;
      else
        t = P, Ql = He = null, Kc(t), ra = null, Ja = 0, t = P;
      for (; t !== null; )
        Go(t.alternate, t), t = t.return;
      P = null;
    }
  }
  function pa(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, wm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Il = 0, Ci(), gt = t, P = e = jl(t.current, null), lt = l, ot = 0, yl = null, me = !1, ba = Ca(t, l), Ti = !1, Sa = hl = Ai = Ze = ve = At = 0, nl = su = null, _i = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var u = 31 - ol(a), n = 1 << u;
        l |= t[u], a &= ~n;
      }
    return Fl = l, ju(), e;
  }
  function or(t, l) {
    $ = null, T.H = lu, l === oa || l === Ju ? (l = As(), ot = 3) : l === Hc ? (l = As(), ot = 4) : ot = l === fi ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, yl = l, P === null && (At = 1, fn(
      t,
      pl(l, t.current)
    ));
  }
  function rr() {
    var t = ml.current;
    return t === null ? !0 : (lt & 4194048) === lt ? Al === null : (lt & 62914560) === lt || (lt & 536870912) !== 0 ? t === Al : !1;
  }
  function dr() {
    var t = T.H;
    return T.H = lu, t === null ? lu : t;
  }
  function mr() {
    var t = T.A;
    return T.A = lm, t;
  }
  function En() {
    At = 4, me || (lt & 4194048) !== lt && ml.current !== null || (ba = !0), (ve & 134217727) === 0 && (Ze & 134217727) === 0 || gt === null || ge(
      gt,
      lt,
      hl,
      !1
    );
  }
  function Ni(t, l, e) {
    var a = ft;
    ft |= 2;
    var u = dr(), n = mr();
    (gt !== t || lt !== l) && (bn = null, pa(t, l)), l = !1;
    var c = At;
    t: do
      try {
        if (ot !== 0 && P !== null) {
          var i = P, f = yl;
          switch (ot) {
            case 8:
              Ci(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ml.current === null && (l = !0);
              var v = ot;
              if (ot = 0, yl = null, za(t, i, f, v), e && ba) {
                c = 0;
                break t;
              }
              break;
            default:
              v = ot, ot = 0, yl = null, za(t, i, f, v);
          }
        }
        um(), c = At;
        break;
      } catch (E) {
        or(t, E);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Ql = He = null, ft = a, T.H = u, T.A = n, P === null && (gt = null, lt = 0, ju()), c;
  }
  function um() {
    for (; P !== null; ) vr(P);
  }
  function nm(t, l) {
    var e = ft;
    ft |= 2;
    var a = dr(), u = mr();
    gt !== t || lt !== l ? (bn = null, gn = fl() + 500, pa(t, l)) : ba = Ca(
      t,
      l
    );
    t: do
      try {
        if (ot !== 0 && P !== null) {
          l = P;
          var n = yl;
          l: switch (ot) {
            case 1:
              ot = 0, yl = null, za(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (ws(n)) {
                ot = 0, yl = null, yr(l);
                break;
              }
              l = function() {
                ot !== 2 && ot !== 9 || gt !== t || (ot = 7), Rl(t);
              }, n.then(l, l);
              break t;
            case 3:
              ot = 7;
              break t;
            case 4:
              ot = 5;
              break t;
            case 7:
              ws(n) ? (ot = 0, yl = null, yr(l)) : (ot = 0, yl = null, za(t, l, n, 7));
              break;
            case 5:
              var c = null;
              switch (P.tag) {
                case 26:
                  c = P.memoizedState;
                case 5:
                case 27:
                  var i = P;
                  if (c ? td(c) : i.stateNode.complete) {
                    ot = 0, yl = null;
                    var f = i.sibling;
                    if (f !== null) P = f;
                    else {
                      var v = i.return;
                      v !== null ? (P = v, pn(v)) : P = null;
                    }
                    break l;
                  }
              }
              ot = 0, yl = null, za(t, l, n, 5);
              break;
            case 6:
              ot = 0, yl = null, za(t, l, n, 6);
              break;
            case 8:
              Ci(), At = 6;
              break t;
            default:
              throw Error(d(462));
          }
        }
        cm();
        break;
      } catch (E) {
        or(t, E);
      }
    while (!0);
    return Ql = He = null, T.H = a, T.A = u, ft = e, P !== null ? 0 : (gt = null, lt = 0, ju(), At);
  }
  function cm() {
    for (; P !== null && !Dd(); )
      vr(P);
  }
  function vr(t) {
    var l = Yo(t.alternate, t, Fl);
    t.memoizedProps = t.pendingProps, l === null ? pn(t) : P = l;
  }
  function yr(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = xo(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          lt
        );
        break;
      case 11:
        l = xo(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          lt
        );
        break;
      case 5:
        Kc(l);
      default:
        Go(e, l), l = P = ds(l, Fl), l = Yo(e, l, Fl);
    }
    t.memoizedProps = t.pendingProps, l === null ? pn(t) : P = l;
  }
  function za(t, l, e, a) {
    Ql = He = null, Kc(l), ra = null, Ja = 0;
    var u = l.return;
    try {
      if (W0(
        t,
        u,
        l,
        e,
        lt
      )) {
        At = 1, fn(
          t,
          pl(e, t.current)
        ), P = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw P = u, n;
      At = 1, fn(
        t,
        pl(e, t.current)
      ), P = null;
      return;
    }
    l.flags & 32768 ? (at || a === 1 ? t = !0 : ba || (lt & 536870912) !== 0 ? t = !1 : (me = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ml.current, a !== null && a.tag === 13 && (a.flags |= 16384))), hr(l, t)) : pn(l);
  }
  function pn(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        hr(
          l,
          me
        );
        return;
      }
      t = l.return;
      var e = F0(
        l.alternate,
        l,
        Fl
      );
      if (e !== null) {
        P = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        P = l;
        return;
      }
      P = l = t;
    } while (l !== null);
    At === 0 && (At = 5);
  }
  function hr(t, l) {
    do {
      var e = I0(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, P = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        P = t;
        return;
      }
      P = t = e;
    } while (t !== null);
    At = 6, P = null;
  }
  function gr(t, l, e, a, u, n, c, i, f) {
    t.cancelPendingCommit = null;
    do
      zn();
    while (Bt !== 0);
    if ((ft & 6) !== 0) throw Error(d(327));
    if (l !== null) {
      if (l === t.current) throw Error(d(177));
      if (n = l.lanes | l.childLanes, n |= Sc, jd(
        t,
        e,
        n,
        c,
        i,
        f
      ), t === gt && (P = gt = null, lt = 0), Ea = l, he = t, Il = e, Oi = n, Mi = u, cr = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, om(wu, function() {
        return zr(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = T.T, T.T = null, u = M.p, M.p = 2, c = ft, ft |= 4;
        try {
          P0(t, l, e);
        } finally {
          ft = c, M.p = u, T.T = a;
        }
      }
      Bt = 1, br(), Sr(), Er();
    }
  }
  function br() {
    if (Bt === 1) {
      Bt = 0;
      var t = he, l = Ea, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = T.T, T.T = null;
        var a = M.p;
        M.p = 2;
        var u = ft;
        ft |= 4;
        try {
          Io(l, t);
          var n = Zi, c = as(t.containerInfo), i = n.focusedElem, f = n.selectionRange;
          if (c !== i && i && i.ownerDocument && es(
            i.ownerDocument.documentElement,
            i
          )) {
            if (f !== null && vc(i)) {
              var v = f.start, E = f.end;
              if (E === void 0 && (E = v), "selectionStart" in i)
                i.selectionStart = v, i.selectionEnd = Math.min(
                  E,
                  i.value.length
                );
              else {
                var w = i.ownerDocument || document, y = w && w.defaultView || window;
                if (y.getSelection) {
                  var g = y.getSelection(), R = i.textContent.length, V = Math.min(f.start, R), yt = f.end === void 0 ? V : Math.min(f.end, R);
                  !g.extend && V > yt && (c = yt, yt = V, V = c);
                  var r = ls(
                    i,
                    V
                  ), o = ls(
                    i,
                    yt
                  );
                  if (r && o && (g.rangeCount !== 1 || g.anchorNode !== r.node || g.anchorOffset !== r.offset || g.focusNode !== o.node || g.focusOffset !== o.offset)) {
                    var m = w.createRange();
                    m.setStart(r.node, r.offset), g.removeAllRanges(), V > yt ? (g.addRange(m), g.extend(o.node, o.offset)) : (m.setEnd(o.node, o.offset), g.addRange(m));
                  }
                }
              }
            }
            for (w = [], g = i; g = g.parentNode; )
              g.nodeType === 1 && w.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < w.length; i++) {
              var z = w[i];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          Hn = !!Xi, Zi = Xi = null;
        } finally {
          ft = u, M.p = a, T.T = e;
        }
      }
      t.current = l, Bt = 2;
    }
  }
  function Sr() {
    if (Bt === 2) {
      Bt = 0;
      var t = he, l = Ea, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = T.T, T.T = null;
        var a = M.p;
        M.p = 2;
        var u = ft;
        ft |= 4;
        try {
          Jo(t, l.alternate, l);
        } finally {
          ft = u, M.p = a, T.T = e;
        }
      }
      Bt = 3;
    }
  }
  function Er() {
    if (Bt === 4 || Bt === 3) {
      Bt = 0, Cd();
      var t = he, l = Ea, e = Il, a = cr;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Bt = 5 : (Bt = 0, Ea = he = null, pr(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (ye = null), $n(e), l = l.stateNode, sl && typeof sl.onCommitFiberRoot == "function")
        try {
          sl.onCommitFiberRoot(
            Da,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = T.T, u = M.p, M.p = 2, T.T = null;
        try {
          for (var n = t.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            n(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          T.T = l, M.p = u;
        }
      }
      (Il & 3) !== 0 && zn(), Rl(t), u = t.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? t === Di ? ou++ : (ou = 0, Di = t) : ou = 0, ru(0);
    }
  }
  function pr(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Va(l)));
  }
  function zn() {
    return br(), Sr(), Er(), zr();
  }
  function zr() {
    if (Bt !== 5) return !1;
    var t = he, l = Oi;
    Oi = 0;
    var e = $n(Il), a = T.T, u = M.p;
    try {
      M.p = 32 > e ? 32 : e, T.T = null, e = Mi, Mi = null;
      var n = he, c = Il;
      if (Bt = 0, Ea = he = null, Il = 0, (ft & 6) !== 0) throw Error(d(331));
      var i = ft;
      if (ft |= 4, ar(n.current), tr(
        n,
        n.current,
        c,
        e
      ), ft = i, ru(0, !1), sl && typeof sl.onPostCommitFiberRoot == "function")
        try {
          sl.onPostCommitFiberRoot(Da, n);
        } catch {
        }
      return !0;
    } finally {
      M.p = u, T.T = a, pr(t, l);
    }
  }
  function wr(t, l, e) {
    l = pl(e, l), l = ii(t.stateNode, l, 2), t = se(t, l, 2), t !== null && (Na(t, 2), Rl(t));
  }
  function rt(t, l, e) {
    if (t.tag === 3)
      wr(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          wr(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ye === null || !ye.has(a))) {
            t = pl(e, t), e = To(2), a = se(l, e, 2), a !== null && (Ao(
              e,
              a,
              l,
              t
            ), Na(a, 2), Rl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function xi(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new em();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (Ti = !0, u.add(e), t = im.bind(null, t, l, e), l.then(t, t));
  }
  function im(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, gt === t && (lt & e) === e && (At === 4 || At === 3 && (lt & 62914560) === lt && 300 > fl() - hn ? (ft & 2) === 0 && pa(t, 0) : Ai |= e, Sa === lt && (Sa = 0)), Rl(t);
  }
  function Tr(t, l) {
    l === 0 && (l = gf()), t = Ne(t, l), t !== null && (Na(t, l), Rl(t));
  }
  function fm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Tr(t, e);
  }
  function sm(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(d(314));
    }
    a !== null && a.delete(l), Tr(t, e);
  }
  function om(t, l) {
    return Vn(t, l);
  }
  var wn = null, wa = null, Ui = !1, Tn = !1, Hi = !1, be = 0;
  function Rl(t) {
    t !== wa && t.next === null && (wa === null ? wn = wa = t : wa = wa.next = t), Tn = !0, Ui || (Ui = !0, dm());
  }
  function ru(t, l) {
    if (!Hi && Tn) {
      Hi = !0;
      do
        for (var e = !1, a = wn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              n = (1 << 31 - ol(42 | t) + 1) - 1, n &= u & ~(c & ~i), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Mr(a, n));
          } else
            n = lt, n = Ou(
              a,
              a === gt ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Ca(a, n) || (e = !0, Mr(a, n));
          a = a.next;
        }
      while (e);
      Hi = !1;
    }
  }
  function rm() {
    Ar();
  }
  function Ar() {
    Tn = Ui = !1;
    var t = 0;
    be !== 0 && zm() && (t = be);
    for (var l = fl(), e = null, a = wn; a !== null; ) {
      var u = a.next, n = _r(a, l);
      n === 0 ? (a.next = null, e === null ? wn = u : e.next = u, u === null && (wa = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (Tn = !0)), a = u;
    }
    Bt !== 0 && Bt !== 5 || ru(t), be !== 0 && (be = 0);
  }
  function _r(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - ol(n), i = 1 << c, f = u[c];
      f === -1 ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = Yd(i, l)) : f <= l && (t.expiredLanes |= i), n &= ~i;
    }
    if (l = gt, e = lt, e = Ou(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (ot === 2 || ot === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Kn(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ca(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Kn(a), $n(e)) {
        case 2:
        case 8:
          e = yf;
          break;
        case 32:
          e = wu;
          break;
        case 268435456:
          e = hf;
          break;
        default:
          e = wu;
      }
      return a = Or.bind(null, t), e = Vn(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Kn(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Or(t, l) {
    if (Bt !== 0 && Bt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (zn() && t.callbackNode !== e)
      return null;
    var a = lt;
    return a = Ou(
      t,
      t === gt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (fr(t, a, l), _r(t, fl()), t.callbackNode != null && t.callbackNode === e ? Or.bind(null, t) : null);
  }
  function Mr(t, l) {
    if (zn()) return null;
    fr(t, l, !0);
  }
  function dm() {
    Tm(function() {
      (ft & 6) !== 0 ? Vn(
        vf,
        rm
      ) : Ar();
    });
  }
  function Ri() {
    if (be === 0) {
      var t = fa;
      t === 0 && (t = Tu, Tu <<= 1, (Tu & 261888) === 0 && (Tu = 256)), be = t;
    }
    return be;
  }
  function Dr(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Nu("" + t);
  }
  function Cr(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function mm(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = Dr(
        (u[tl] || null).action
      ), c = a.submitter;
      c && (l = (l = c[tl] || null) ? Dr(l.formAction) : c.getAttribute("formAction"), l !== null && (n = l, c = null));
      var i = new Ru(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (be !== 0) {
                  var f = c ? Cr(u, c) : new FormData(u);
                  li(
                    e,
                    {
                      pending: !0,
                      data: f,
                      method: u.method,
                      action: n
                    },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" && (i.preventDefault(), f = c ? Cr(u, c) : new FormData(u), li(
                  e,
                  {
                    pending: !0,
                    data: f,
                    method: u.method,
                    action: n
                  },
                  n,
                  f
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var qi = 0; qi < bc.length; qi++) {
    var Bi = bc[qi], vm = Bi.toLowerCase(), ym = Bi[0].toUpperCase() + Bi.slice(1);
    Dl(
      vm,
      "on" + ym
    );
  }
  Dl(cs, "onAnimationEnd"), Dl(is, "onAnimationIteration"), Dl(fs, "onAnimationStart"), Dl("dblclick", "onDoubleClick"), Dl("focusin", "onFocus"), Dl("focusout", "onBlur"), Dl(N0, "onTransitionRun"), Dl(x0, "onTransitionStart"), Dl(U0, "onTransitionCancel"), Dl(ss, "onTransitionEnd"), We("onMouseEnter", ["mouseout", "mouseover"]), We("onMouseLeave", ["mouseout", "mouseover"]), We("onPointerEnter", ["pointerout", "pointerover"]), We("onPointerLeave", ["pointerout", "pointerover"]), Oe(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Oe(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Oe("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Oe(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Oe(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Oe(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var du = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), hm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(du)
  );
  function Nr(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c], f = i.instance, v = i.currentTarget;
            if (i = i.listener, f !== n && u.isPropagationStopped())
              break t;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (E) {
              Yu(E);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (i = a[c], f = i.instance, v = i.currentTarget, i = i.listener, f !== n && u.isPropagationStopped())
              break t;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (E) {
              Yu(E);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function tt(t, l) {
    var e = l[kn];
    e === void 0 && (e = l[kn] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (xr(l, t, 2, !1), e.add(a));
  }
  function Yi(t, l, e) {
    var a = 0;
    l && (a |= 4), xr(
      e,
      t,
      a,
      l
    );
  }
  var An = "_reactListening" + Math.random().toString(36).slice(2);
  function ji(t) {
    if (!t[An]) {
      t[An] = !0, Tf.forEach(function(e) {
        e !== "selectionchange" && (hm.has(e) || Yi(e, !1, t), Yi(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[An] || (l[An] = !0, Yi("selectionchange", !1, l));
    }
  }
  function xr(t, l, e, a) {
    switch (id(l)) {
      case 2:
        var u = Lm;
        break;
      case 8:
        u = Vm;
        break;
      default:
        u = tf;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !nc || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function Gi(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var i = a.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var f = c.tag;
              if ((f === 3 || f === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (c = Ve(i), c === null) return;
            if (f = c.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              a = n = c;
              continue t;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    qf(function() {
      var v = n, E = ac(e), w = [];
      t: {
        var y = os.get(t);
        if (y !== void 0) {
          var g = Ru, R = t;
          switch (t) {
            case "keypress":
              if (Uu(e) === 0) break t;
            case "keydown":
            case "keyup":
              g = s0;
              break;
            case "focusin":
              R = "focus", g = sc;
              break;
            case "focusout":
              R = "blur", g = sc;
              break;
            case "beforeblur":
            case "afterblur":
              g = sc;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = jf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = Fd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = d0;
              break;
            case cs:
            case is:
            case fs:
              g = t0;
              break;
            case ss:
              g = v0;
              break;
            case "scroll":
            case "scrollend":
              g = $d;
              break;
            case "wheel":
              g = h0;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = e0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Qf;
              break;
            case "toggle":
            case "beforetoggle":
              g = b0;
          }
          var V = (l & 4) !== 0, yt = !V && (t === "scroll" || t === "scrollend"), r = V ? y !== null ? y + "Capture" : null : y;
          V = [];
          for (var o = v, m; o !== null; ) {
            var z = o;
            if (m = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || m === null || r === null || (z = Ha(o, r), z != null && V.push(
              mu(o, z, m)
            )), yt) break;
            o = o.return;
          }
          0 < V.length && (y = new g(
            y,
            R,
            null,
            e,
            E
          ), w.push({ event: y, listeners: V }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (y = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout", y && e !== ec && (R = e.relatedTarget || e.fromElement) && (Ve(R) || R[Le]))
            break t;
          if ((g || y) && (y = E.window === E ? E : (y = E.ownerDocument) ? y.defaultView || y.parentWindow : window, g ? (R = e.relatedTarget || e.toElement, g = v, R = R ? Ve(R) : null, R !== null && (yt = G(R), V = R.tag, R !== yt || V !== 5 && V !== 27 && V !== 6) && (R = null)) : (g = null, R = v), g !== R)) {
            if (V = jf, z = "onMouseLeave", r = "onMouseEnter", o = "mouse", (t === "pointerout" || t === "pointerover") && (V = Qf, z = "onPointerLeave", r = "onPointerEnter", o = "pointer"), yt = g == null ? y : Ua(g), m = R == null ? y : Ua(R), y = new V(
              z,
              o + "leave",
              g,
              e,
              E
            ), y.target = yt, y.relatedTarget = m, z = null, Ve(E) === v && (V = new V(
              r,
              o + "enter",
              R,
              e,
              E
            ), V.target = m, V.relatedTarget = yt, z = V), yt = z, g && R)
              l: {
                for (V = gm, r = g, o = R, m = 0, z = r; z; z = V(z))
                  m++;
                z = 0;
                for (var X = o; X; X = V(X))
                  z++;
                for (; 0 < m - z; )
                  r = V(r), m--;
                for (; 0 < z - m; )
                  o = V(o), z--;
                for (; m--; ) {
                  if (r === o || o !== null && r === o.alternate) {
                    V = r;
                    break l;
                  }
                  r = V(r), o = V(o);
                }
                V = null;
              }
            else V = null;
            g !== null && Ur(
              w,
              y,
              g,
              V,
              !1
            ), R !== null && yt !== null && Ur(
              w,
              yt,
              R,
              V,
              !0
            );
          }
        }
        t: {
          if (y = v ? Ua(v) : window, g = y.nodeName && y.nodeName.toLowerCase(), g === "select" || g === "input" && y.type === "file")
            var ct = $f;
          else if (Jf(y))
            if (kf)
              ct = M0;
            else {
              ct = _0;
              var Y = A0;
            }
          else
            g = y.nodeName, !g || g.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? v && lc(v.elementType) && (ct = $f) : ct = O0;
          if (ct && (ct = ct(t, v))) {
            Wf(
              w,
              ct,
              e,
              E
            );
            break t;
          }
          Y && Y(t, y, v), t === "focusout" && v && y.type === "number" && v.memoizedProps.value != null && tc(y, "number", y.value);
        }
        switch (Y = v ? Ua(v) : window, t) {
          case "focusin":
            (Jf(Y) || Y.contentEditable === "true") && (ta = Y, yc = v, Xa = null);
            break;
          case "focusout":
            Xa = yc = ta = null;
            break;
          case "mousedown":
            hc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hc = !1, us(w, e, E);
            break;
          case "selectionchange":
            if (C0) break;
          case "keydown":
          case "keyup":
            us(w, e, E);
        }
        var k;
        if (rc)
          t: {
            switch (t) {
              case "compositionstart":
                var et = "onCompositionStart";
                break t;
              case "compositionend":
                et = "onCompositionEnd";
                break t;
              case "compositionupdate":
                et = "onCompositionUpdate";
                break t;
            }
            et = void 0;
          }
        else
          Pe ? Vf(t, e) && (et = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (et = "onCompositionStart");
        et && (Xf && e.locale !== "ko" && (Pe || et !== "onCompositionStart" ? et === "onCompositionEnd" && Pe && (k = Bf()) : (ee = E, cc = "value" in ee ? ee.value : ee.textContent, Pe = !0)), Y = _n(v, et), 0 < Y.length && (et = new Gf(
          et,
          t,
          null,
          e,
          E
        ), w.push({ event: et, listeners: Y }), k ? et.data = k : (k = Kf(e), k !== null && (et.data = k)))), (k = E0 ? p0(t, e) : z0(t, e)) && (et = _n(v, "onBeforeInput"), 0 < et.length && (Y = new Gf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), w.push({
          event: Y,
          listeners: et
        }), Y.data = k)), mm(
          w,
          t,
          v,
          e,
          E
        );
      }
      Nr(w, l);
    });
  }
  function mu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function _n(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Ha(t, e), u != null && a.unshift(
        mu(t, u, n)
      ), u = Ha(t, l), u != null && a.push(
        mu(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function gm(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ur(t, l, e, a, u) {
    for (var n = l._reactName, c = []; e !== null && e !== a; ) {
      var i = e, f = i.alternate, v = i.stateNode;
      if (i = i.tag, f !== null && f === a) break;
      i !== 5 && i !== 26 && i !== 27 || v === null || (f = v, u ? (v = Ha(e, n), v != null && c.unshift(
        mu(e, v, f)
      )) : u || (v = Ha(e, n), v != null && c.push(
        mu(e, v, f)
      ))), e = e.return;
    }
    c.length !== 0 && t.push({ event: l, listeners: c });
  }
  var bm = /\r\n?/g, Sm = /\u0000|\uFFFD/g;
  function Hr(t) {
    return (typeof t == "string" ? t : "" + t).replace(bm, `
`).replace(Sm, "");
  }
  function Rr(t, l) {
    return l = Hr(l), Hr(t) === l;
  }
  function vt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || ke(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && ke(t, "" + a);
        break;
      case "className":
        Du(t, "class", a);
        break;
      case "tabIndex":
        Du(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Du(t, e, a);
        break;
      case "style":
        Hf(t, a, n);
        break;
      case "data":
        if (l !== "object") {
          Du(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Nu("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (l !== "input" && vt(t, l, "name", u.name, u, null), vt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), vt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), vt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (vt(t, l, "encType", u.encType, u, null), vt(t, l, "method", u.method, u, null), vt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Nu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Bl);
        break;
      case "onScroll":
        a != null && tt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && tt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Nu("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        tt("beforetoggle", t), tt("toggle", t), Mu(t, "popover", a);
        break;
      case "xlinkActuate":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Mu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Jd.get(e) || e, Mu(t, e, a));
    }
  }
  function Qi(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        Hf(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ke(t, a) : (typeof a == "number" || typeof a == "bigint") && ke(t, "" + a);
        break;
      case "onScroll":
        a != null && tt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && tt("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Bl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Af.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), l = e.slice(2, u ? e.length - 7 : void 0), n = t[tl] || null, n = n != null ? n[e] : null, typeof n == "function" && t.removeEventListener(l, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, u);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Mu(t, e, a);
          }
    }
  }
  function Wt(t, l, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        tt("error", t), tt("load", t);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var c = e[n];
            if (c != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(d(137, l));
                default:
                  vt(t, l, n, c, e, null);
              }
          }
        u && vt(t, l, "srcSet", e.srcSet, e, null), a && vt(t, l, "src", e.src, e, null);
        return;
      case "input":
        tt("invalid", t);
        var i = n = c = u = null, f = null, v = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  u = E;
                  break;
                case "type":
                  c = E;
                  break;
                case "checked":
                  f = E;
                  break;
                case "defaultChecked":
                  v = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  i = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(d(137, l));
                  break;
                default:
                  vt(t, l, a, E, e, null);
              }
          }
        Cf(
          t,
          n,
          i,
          f,
          v,
          c,
          u,
          !1
        );
        return;
      case "select":
        tt("invalid", t), a = c = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (i = e[u], i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                a = i;
              default:
                vt(t, l, u, i, e, null);
            }
        l = n, e = c, t.multiple = !!a, l != null ? $e(t, !!a, l, !1) : e != null && $e(t, !!a, e, !0);
        return;
      case "textarea":
        tt("invalid", t), n = u = a = null;
        for (c in e)
          if (e.hasOwnProperty(c) && (i = e[c], i != null))
            switch (c) {
              case "value":
                a = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(d(91));
                break;
              default:
                vt(t, l, c, i, e, null);
            }
        xf(t, a, u, n);
        return;
      case "option":
        for (f in e)
          e.hasOwnProperty(f) && (a = e[f], a != null) && (f === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : vt(t, l, f, a, e, null));
        return;
      case "dialog":
        tt("beforetoggle", t), tt("toggle", t), tt("cancel", t), tt("close", t);
        break;
      case "iframe":
      case "object":
        tt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < du.length; a++)
          tt(du[a], t);
        break;
      case "image":
        tt("error", t), tt("load", t);
        break;
      case "details":
        tt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        tt("error", t), tt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (v in e)
          if (e.hasOwnProperty(v) && (a = e[v], a != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(d(137, l));
              default:
                vt(t, l, v, a, e, null);
            }
        return;
      default:
        if (lc(l)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && Qi(
              t,
              l,
              E,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && (a = e[i], a != null && vt(t, l, i, a, e, null));
  }
  function Em(t, l, e, a) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, n = null, c = null, i = null, f = null, v = null, E = null;
        for (g in e) {
          var w = e[g];
          if (e.hasOwnProperty(g) && w != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = w;
              default:
                a.hasOwnProperty(g) || vt(t, l, g, null, a, w);
            }
        }
        for (var y in a) {
          var g = a[y];
          if (w = e[y], a.hasOwnProperty(y) && (g != null || w != null))
            switch (y) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                v = g;
                break;
              case "defaultChecked":
                E = g;
                break;
              case "value":
                c = g;
                break;
              case "defaultValue":
                i = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(d(137, l));
                break;
              default:
                g !== w && vt(
                  t,
                  l,
                  y,
                  g,
                  a,
                  w
                );
            }
        }
        Pn(
          t,
          c,
          i,
          f,
          v,
          E,
          n,
          u
        );
        return;
      case "select":
        g = c = i = y = null;
        for (n in e)
          if (f = e[n], e.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = f;
              default:
                a.hasOwnProperty(n) || vt(
                  t,
                  l,
                  n,
                  null,
                  a,
                  f
                );
            }
        for (u in a)
          if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null))
            switch (u) {
              case "value":
                y = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && vt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  f
                );
            }
        l = i, e = c, a = g, y != null ? $e(t, !!e, y, !1) : !!a != !!e && (l != null ? $e(t, !!e, l, !0) : $e(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = y = null;
        for (i in e)
          if (u = e[i], e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i))
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                vt(t, l, i, null, a, u);
            }
        for (c in a)
          if (u = a[c], n = e[c], a.hasOwnProperty(c) && (u != null || n != null))
            switch (c) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(d(91));
                break;
              default:
                u !== n && vt(t, l, c, u, a, n);
            }
        Nf(t, y, g);
        return;
      case "option":
        for (var R in e)
          y = e[R], e.hasOwnProperty(R) && y != null && !a.hasOwnProperty(R) && (R === "selected" ? t.selected = !1 : vt(
            t,
            l,
            R,
            null,
            a,
            y
          ));
        for (f in a)
          y = a[f], g = e[f], a.hasOwnProperty(f) && y !== g && (y != null || g != null) && (f === "selected" ? t.selected = y && typeof y != "function" && typeof y != "symbol" : vt(
            t,
            l,
            f,
            y,
            a,
            g
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var V in e)
          y = e[V], e.hasOwnProperty(V) && y != null && !a.hasOwnProperty(V) && vt(t, l, V, null, a, y);
        for (v in a)
          if (y = a[v], g = e[v], a.hasOwnProperty(v) && y !== g && (y != null || g != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(d(137, l));
                break;
              default:
                vt(
                  t,
                  l,
                  v,
                  y,
                  a,
                  g
                );
            }
        return;
      default:
        if (lc(l)) {
          for (var yt in e)
            y = e[yt], e.hasOwnProperty(yt) && y !== void 0 && !a.hasOwnProperty(yt) && Qi(
              t,
              l,
              yt,
              void 0,
              a,
              y
            );
          for (E in a)
            y = a[E], g = e[E], !a.hasOwnProperty(E) || y === g || y === void 0 && g === void 0 || Qi(
              t,
              l,
              E,
              y,
              a,
              g
            );
          return;
        }
    }
    for (var r in e)
      y = e[r], e.hasOwnProperty(r) && y != null && !a.hasOwnProperty(r) && vt(t, l, r, null, a, y);
    for (w in a)
      y = a[w], g = e[w], !a.hasOwnProperty(w) || y === g || y == null && g == null || vt(t, l, w, y, a, g);
  }
  function qr(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function pm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, c = u.initiatorType, i = u.duration;
        if (n && i && qr(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], v = f.startTime;
            if (v > i) break;
            var E = f.transferSize, w = f.initiatorType;
            E && qr(w) && (f = f.responseEnd, c += E * (f < i ? 1 : (i - v) / (f - v)));
          }
          if (--a, l += 8 * (n + c) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Xi = null, Zi = null;
  function On(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Br(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Yr(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function Li(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Vi = null;
  function zm() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Vi ? !1 : (Vi = t, !0) : (Vi = null, !1);
  }
  var jr = typeof setTimeout == "function" ? setTimeout : void 0, wm = typeof clearTimeout == "function" ? clearTimeout : void 0, Gr = typeof Promise == "function" ? Promise : void 0, Tm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Gr < "u" ? function(t) {
    return Gr.resolve(null).then(t).catch(Am);
  } : jr;
  function Am(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Se(t) {
    return t === "head";
  }
  function Qr(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), Oa(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          vu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, vu(e);
          for (var n = e.firstChild; n; ) {
            var c = n.nextSibling, i = n.nodeName;
            n[xa] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = c;
          }
        } else
          e === "body" && vu(t.ownerDocument.body);
      e = u;
    } while (e);
    Oa(l);
  }
  function Xr(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function Ki(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ki(e), Fn(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function _m(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[xa])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (n = t.getAttribute("src"), (n !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n)
          return t;
      } else return t;
      if (t = _l(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Om(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = _l(t.nextSibling), t === null)) return null;
    return t;
  }
  function Zr(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = _l(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ji(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Wi(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Mm(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function _l(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var $i = null;
  function Lr(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return _l(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Vr(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Kr(t, l, e) {
    switch (l = On(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(d(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(d(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(d(454));
        return t;
      default:
        throw Error(d(451));
    }
  }
  function vu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Fn(t);
  }
  var Ol = /* @__PURE__ */ new Map(), Jr = /* @__PURE__ */ new Set();
  function Mn(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Pl = M.d;
  M.d = {
    f: Dm,
    r: Cm,
    D: Nm,
    C: xm,
    L: Um,
    m: Hm,
    X: qm,
    S: Rm,
    M: Bm
  };
  function Dm() {
    var t = Pl.f(), l = Sn();
    return t || l;
  }
  function Cm(t) {
    var l = Ke(t);
    l !== null && l.tag === 5 && l.type === "form" ? so(l) : Pl.r(t);
  }
  var Ta = typeof document > "u" ? null : document;
  function Wr(t, l, e) {
    var a = Ta;
    if (a && typeof l == "string" && l) {
      var u = Sl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Jr.has(u) || (Jr.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), Wt(l, "link", t), jt(l), a.head.appendChild(l)));
    }
  }
  function Nm(t) {
    Pl.D(t), Wr("dns-prefetch", t, null);
  }
  function xm(t, l) {
    Pl.C(t, l), Wr("preconnect", t, l);
  }
  function Um(t, l, e) {
    Pl.L(t, l, e);
    var a = Ta;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + Sl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Sl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Sl(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Sl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Aa(t);
          break;
        case "script":
          n = _a(t);
      }
      Ol.has(n) || (t = H(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ol.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(yu(n)) || l === "script" && a.querySelector(hu(n)) || (l = a.createElement("link"), Wt(l, "link", t), jt(l), a.head.appendChild(l)));
    }
  }
  function Hm(t, l) {
    Pl.m(t, l);
    var e = Ta;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Sl(a) + '"][href="' + Sl(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = _a(t);
      }
      if (!Ol.has(n) && (t = H({ rel: "modulepreload", href: t }, l), Ol.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(hu(n)))
              return;
        }
        a = e.createElement("link"), Wt(a, "link", t), jt(a), e.head.appendChild(a);
      }
    }
  }
  function Rm(t, l, e) {
    Pl.S(t, l, e);
    var a = Ta;
    if (a && t) {
      var u = Je(a).hoistableStyles, n = Aa(t);
      l = l || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(
          yu(n)
        ))
          i.loading = 5;
        else {
          t = H(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ol.get(n)) && ki(t, e);
          var f = c = a.createElement("link");
          jt(f), Wt(f, "link", t), f._p = new Promise(function(v, E) {
            f.onload = v, f.onerror = E;
          }), f.addEventListener("load", function() {
            i.loading |= 1;
          }), f.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Dn(c, l, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: i
        }, u.set(n, c);
      }
    }
  }
  function qm(t, l) {
    Pl.X(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, u = _a(t), n = a.get(u);
      n || (n = e.querySelector(hu(u)), n || (t = H({ src: t, async: !0 }, l), (l = Ol.get(u)) && Fi(t, l), n = e.createElement("script"), jt(n), Wt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Bm(t, l) {
    Pl.M(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, u = _a(t), n = a.get(u);
      n || (n = e.querySelector(hu(u)), n || (t = H({ src: t, async: !0, type: "module" }, l), (l = Ol.get(u)) && Fi(t, l), n = e.createElement("script"), jt(n), Wt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function $r(t, l, e, a) {
    var u = (u = B.current) ? Mn(u) : null;
    if (!u) throw Error(d(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Aa(e.href), e = Je(
          u
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Aa(e.href);
          var n = Je(
            u
          ).hoistableStyles, c = n.get(t);
          if (c || (u = u.ownerDocument || u, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, c), (n = u.querySelector(
            yu(t)
          )) && !n._p && (c.instance = n, c.state.loading = 5), Ol.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ol.set(t, e), n || Ym(
            u,
            t,
            e,
            c.state
          ))), l && a === null)
            throw Error(d(528, ""));
          return c;
        }
        if (l && a !== null)
          throw Error(d(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = _a(e), e = Je(
          u
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(d(444, t));
    }
  }
  function Aa(t) {
    return 'href="' + Sl(t) + '"';
  }
  function yu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function kr(t) {
    return H({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Ym(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), Wt(l, "link", e), jt(l), t.head.appendChild(l));
  }
  function _a(t) {
    return '[src="' + Sl(t) + '"]';
  }
  function hu(t) {
    return "script[async]" + t;
  }
  function Fr(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Sl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, jt(a), a;
          var u = H({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), jt(a), Wt(a, "style", u), Dn(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Aa(e.href);
          var n = t.querySelector(
            yu(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, jt(n), n;
          a = kr(e), (u = Ol.get(u)) && ki(a, u), n = (t.ownerDocument || t).createElement("link"), jt(n);
          var c = n;
          return c._p = new Promise(function(i, f) {
            c.onload = i, c.onerror = f;
          }), Wt(n, "link", a), l.state.loading |= 4, Dn(n, e.precedence, t), l.instance = n;
        case "script":
          return n = _a(e.src), (u = t.querySelector(
            hu(n)
          )) ? (l.instance = u, jt(u), u) : (a = e, (u = Ol.get(n)) && (a = H({}, e), Fi(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), jt(u), Wt(u, "link", a), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(d(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Dn(a, e.precedence, t));
    return l.instance;
  }
  function Dn(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, c = 0; c < a.length; c++) {
      var i = a[c];
      if (i.dataset.precedence === l) n = i;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function ki(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Fi(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Cn = null;
  function Ir(t, l, e) {
    if (Cn === null) {
      var a = /* @__PURE__ */ new Map(), u = Cn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Cn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[xa] || n[Lt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(l) || "";
        c = t + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function Pr(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function jm(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        return l.rel === "stylesheet" ? (t = l.disabled, typeof l.precedence == "string" && t == null) : !0;
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function td(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Gm(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Aa(a.href), n = l.querySelector(
          yu(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Nn.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, jt(n);
          return;
        }
        n = l.ownerDocument || l, a = kr(a), (u = Ol.get(u)) && ki(a, u), n = n.createElement("link"), jt(n);
        var c = n;
        c._p = new Promise(function(i, f) {
          c.onload = i, c.onerror = f;
        }), Wt(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Nn.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Ii = 0;
  function Qm(t, l) {
    return t.stylesheets && t.count === 0 && Un(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Un(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Ii === 0 && (Ii = 62500 * pm());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Un(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > Ii ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Nn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Un(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var xn = null;
  function Un(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, xn = /* @__PURE__ */ new Map(), l.forEach(Xm, t), xn = null, Nn.call(t));
  }
  function Xm(t, l) {
    if (!(l.state.loading & 4)) {
      var e = xn.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), xn.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      u = l.instance, c = u.getAttribute("data-precedence"), n = e.get(c) || a, n === a && e.set(null, u), e.set(c, u), this.count++, a = Nn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var gu = {
    $$typeof: ht,
    Provider: null,
    Consumer: null,
    _currentValue: _,
    _currentValue2: _,
    _threadCount: 0
  };
  function Zm(t, l, e, a, u, n, c, i, f) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Jn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Jn(0), this.hiddenUpdates = Jn(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ld(t, l, e, a, u, n, c, i, f, v, E, w) {
    return t = new Zm(
      t,
      l,
      e,
      c,
      f,
      v,
      E,
      w,
      i
    ), l = 1, n === !0 && (l |= 24), n = dl(3, null, null, l), t.current = n, n.stateNode = t, l = Nc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Rc(n), t;
  }
  function ed(t) {
    return t ? (t = aa, t) : aa;
  }
  function ad(t, l, e, a, u, n) {
    u = ed(u), a.context === null ? a.context = u : a.pendingContext = u, a = fe(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = se(t, a, l), e !== null && (cl(e, t, l), $a(e, t, l));
  }
  function ud(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Pi(t, l) {
    ud(t, l), (t = t.alternate) && ud(t, l);
  }
  function nd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ne(t, 67108864);
      l !== null && cl(l, t, 67108864), Pi(t, 67108864);
    }
  }
  function cd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = gl();
      l = Wn(l);
      var e = Ne(t, l);
      e !== null && cl(e, t, l), Pi(t, l);
    }
  }
  var Hn = !0;
  function Lm(t, l, e, a) {
    var u = T.T;
    T.T = null;
    var n = M.p;
    try {
      M.p = 2, tf(t, l, e, a);
    } finally {
      M.p = n, T.T = u;
    }
  }
  function Vm(t, l, e, a) {
    var u = T.T;
    T.T = null;
    var n = M.p;
    try {
      M.p = 8, tf(t, l, e, a);
    } finally {
      M.p = n, T.T = u;
    }
  }
  function tf(t, l, e, a) {
    if (Hn) {
      var u = lf(a);
      if (u === null)
        Gi(
          t,
          l,
          a,
          Rn,
          e
        ), fd(t, a);
      else if (Jm(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (fd(t, a), l & 4 && -1 < Km.indexOf(t)) {
        for (; u !== null; ) {
          var n = Ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var c = _e(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var f = 1 << 31 - ol(c);
                      i.entanglements[1] |= f, c &= ~f;
                    }
                    Rl(n), (ft & 6) === 0 && (gn = fl() + 500, ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = Ne(n, 2), i !== null && cl(i, n, 2), Sn(), Pi(n, 2);
            }
          if (n = lf(a), n === null && Gi(
            t,
            l,
            a,
            Rn,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Gi(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function lf(t) {
    return t = ac(t), ef(t);
  }
  var Rn = null;
  function ef(t) {
    if (Rn = null, t = Ve(t), t !== null) {
      var l = G(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = U(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = O(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Rn = t, null;
  }
  function id(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Nd()) {
          case vf:
            return 2;
          case yf:
            return 8;
          case wu:
          case xd:
            return 32;
          case hf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var af = !1, Ee = null, pe = null, ze = null, bu = /* @__PURE__ */ new Map(), Su = /* @__PURE__ */ new Map(), we = [], Km = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function fd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ee = null;
        break;
      case "dragenter":
      case "dragleave":
        pe = null;
        break;
      case "mouseover":
      case "mouseout":
        ze = null;
        break;
      case "pointerover":
      case "pointerout":
        bu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Su.delete(l.pointerId);
    }
  }
  function Eu(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = Ke(l), l !== null && nd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Jm(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return Ee = Eu(
          Ee,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return pe = Eu(
          pe,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return ze = Eu(
          ze,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return bu.set(
          n,
          Eu(
            bu.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Su.set(
          n,
          Eu(
            Su.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function sd(t) {
    var l = Ve(t.target);
    if (l !== null) {
      var e = G(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = U(e), l !== null) {
            t.blockedOn = l, zf(t.priority, function() {
              cd(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = O(e), l !== null) {
            t.blockedOn = l, zf(t.priority, function() {
              cd(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function qn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = lf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ec = a, e.target.dispatchEvent(a), ec = null;
      } else
        return l = Ke(e), l !== null && nd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function od(t, l, e) {
    qn(t) && e.delete(l);
  }
  function Wm() {
    af = !1, Ee !== null && qn(Ee) && (Ee = null), pe !== null && qn(pe) && (pe = null), ze !== null && qn(ze) && (ze = null), bu.forEach(od), Su.forEach(od);
  }
  function Bn(t, l) {
    t.blockedOn === l && (t.blockedOn = null, af || (af = !0, x.unstable_scheduleCallback(
      x.unstable_NormalPriority,
      Wm
    )));
  }
  var Yn = null;
  function rd(t) {
    Yn !== t && (Yn = t, x.unstable_scheduleCallback(
      x.unstable_NormalPriority,
      function() {
        Yn === t && (Yn = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (ef(a || e) === null)
              continue;
            break;
          }
          var n = Ke(e);
          n !== null && (t.splice(l, 3), l -= 3, li(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function Oa(t) {
    function l(f) {
      return Bn(f, t);
    }
    Ee !== null && Bn(Ee, t), pe !== null && Bn(pe, t), ze !== null && Bn(ze, t), bu.forEach(l), Su.forEach(l);
    for (var e = 0; e < we.length; e++) {
      var a = we[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < we.length && (e = we[0], e.blockedOn === null); )
      sd(e), e.blockedOn === null && we.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], c = u[tl] || null;
        if (typeof n == "function")
          c || rd(e);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, c = n[tl] || null)
              i = c.formAction;
            else if (ef(u) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), rd(e);
        }
      }
  }
  function dd() {
    function t(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(c) {
            return u = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function uf(t) {
    this._internalRoot = t;
  }
  jn.prototype.render = uf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(d(409));
    var e = l.current, a = gl();
    ad(e, a, t, l, null, null);
  }, jn.prototype.unmount = uf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      ad(t.current, 2, null, t, null, null), Sn(), l[Le] = null;
    }
  };
  function jn(t) {
    this._internalRoot = t;
  }
  jn.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = pf();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < we.length && l !== 0 && l < we[e].priority; e++) ;
      we.splice(e, 0, t), e === 0 && sd(t);
    }
  };
  var md = A.version;
  if (md !== "19.2.7")
    throw Error(
      d(
        527,
        md,
        "19.2.7"
      )
    );
  M.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(d(188)) : (t = Object.keys(t).join(","), Error(d(268, t)));
    return t = Q(l), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var $m = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gn.isDisabled && Gn.supportsFiber)
      try {
        Da = Gn.inject(
          $m
        ), sl = Gn;
      } catch {
      }
  }
  return pu.createRoot = function(t, l) {
    if (!L(t)) throw Error(d(299));
    var e = !1, a = "", u = Eo, n = po, c = zo;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError)), l = ld(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      c,
      dd
    ), t[Le] = l.current, ji(t), new uf(l);
  }, pu.hydrateRoot = function(t, l, e) {
    if (!L(t)) throw Error(d(299));
    var a = !1, u = "", n = Eo, c = po, i = zo, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), l = ld(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      f,
      n,
      c,
      i,
      dd
    ), l.context = ed(null), e = l.current, a = gl(), a = Wn(a), u = fe(a), u.callback = null, se(e, u, a), e = a, l.current.lanes = e, Na(l, e), Rl(l), t[Le] = l.current, ji(t), new jn(l);
  }, pu.version = "19.2.7", pu;
}
var pd;
function av() {
  if (pd) return cf.exports;
  pd = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (x) {
        console.error(x);
      }
  }
  return b(), cf.exports = ev(), cf.exports;
}
var uv = av();
const vv = /* @__PURE__ */ Od(uv), zd = (b) => {
  let x;
  const A = /* @__PURE__ */ new Set(), N = (h, Q) => {
    const j = typeof h == "function" ? h(x) : h;
    if (!Object.is(j, x)) {
      const H = x;
      x = Q ?? (typeof j != "object" || j === null) ? j : Object.assign({}, x, j), A.forEach((dt) => dt(x, H));
    }
  }, d = () => x, U = { setState: N, getState: d, getInitialState: () => O, subscribe: (h) => (A.add(h), () => A.delete(h)) }, O = x = b(N, d, U);
  return U;
}, nv = ((b) => b ? zd(b) : zd), cv = (b) => b;
function iv(b, x = cv) {
  const A = S.useSyncExternalStore(
    b.subscribe,
    S.useCallback(() => x(b.getState()), [b, x]),
    S.useCallback(() => x(b.getInitialState()), [b, x])
  );
  return S.useDebugValue(A), A;
}
const wd = (b) => {
  const x = nv(b), A = (N) => iv(x, N);
  return Object.assign(A, x), A;
}, fv = ((b) => b ? wd(b) : wd), sv = (b) => new Date(b.replace(" ", "T")).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }), Td = (b) => b === "portal" ? "Portal" : b === "sms" ? "SMS" : b === "voicemail" ? "Voicemail" : "Automatic", Ad = (b) => b === "voicemail" ? "🔊" : "💬", Rt = fv((b, x) => ({
  conversations: [],
  activeConversationId: null,
  searchQuery: "",
  sidebarOpen: !1,
  conversationsLoading: !1,
  conversationsHasMore: !1,
  threadLoadingStates: {},
  // { [conversationId]: { isLoading: boolean, hasMore: boolean } }
  // Get active conversation
  getActiveConversation: () => {
    const { conversations: A, activeConversationId: N } = x();
    return A.find((d) => d.id === N);
  },
  // Set active conversation
  setActiveConversation: (A) => {
    const N = parseInt(A, 10);
    b({ activeConversationId: N }), x().conversations.find((L) => L.id === N) && x().updateConversation(N, { unread: !1 });
  },
  // Add message to active conversation
  addMessage: (A) => {
    const { activeConversationId: N, conversations: d } = x();
    if (!d.find((H) => H.id === N)) return null;
    const U = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "), O = A.senderId !== null && A.senderId !== void 0 ? parseInt(A.senderId, 10) : null, Q = {
      type: "message",
      role: A.role || "internal",
      senderId: O,
      sender_name: A.sender_name || null,
      channel: A.channel || "auto",
      time: U,
      text: A.text,
      images: A.images || []
    }, j = d.map((H) => H.id === N ? {
      ...H,
      thread: [...H.thread, Q],
      lastActivity: U,
      unread: !1
    } : H);
    return b({ conversations: j }), Q;
  },
  // Update conversation
  updateConversation: (A, N) => {
    const d = parseInt(A, 10);
    b((L) => ({
      conversations: L.conversations.map(
        (G) => G.id === d ? { ...G, ...N } : G
      )
    }));
  },
  // Toggle conversation open/closed
  toggleConversationStatus: (A) => {
    const N = parseInt(A, 10), d = x().conversations.find((L) => L.id === N);
    d && x().updateConversation(N, { open: !d.open });
  },
  // Mark conversation as unread
  markAsUnread: (A) => {
    const N = parseInt(A, 10);
    x().updateConversation(N, { unread: !0 });
  },
  // Create new conversation
  createConversation: (A, N = null) => {
    const d = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "), L = Math.floor(Math.random() * 1e6) + 1e3, G = {
      id: L,
      title: A || "New Conversation",
      reference_id: N,
      open: !0,
      unread: !1,
      lastActivity: d,
      thread: [
        {
          type: "message",
          role: "system",
          senderId: null,
          channel: "auto",
          time: d,
          text: "New conversation initialized."
        }
      ]
    };
    return b((U) => ({
      conversations: [G, ...U.conversations],
      activeConversationId: L
    })), G;
  },
  // Set search query
  setSearchQuery: (A) => {
    b({ searchQuery: A });
  },
  // Toggle sidebar (mobile)
  toggleSidebar: () => {
    b((A) => ({ sidebarOpen: !A.sidebarOpen }));
  },
  setSidebarOpen: (A) => {
    b({ sidebarOpen: A });
  },
  // Replace entire state with new data
  loadConversations: (A) => {
    const N = (A.conversations || []).map((L) => ({
      ...L,
      id: parseInt(L.id, 10),
      thread: (L.thread || []).map((G) => G.type === "message" && G.senderId !== null && G.senderId !== void 0 ? {
        ...G,
        senderId: parseInt(G.senderId, 10)
      } : G)
    })), d = A.activeConversationId ? parseInt(A.activeConversationId, 10) : N[0]?.id || null;
    b({
      conversations: N,
      activeConversationId: d
    });
  },
  // Progressive loading: Load conversation metadata only (without full threads)
  loadConversationMetadata: (A, N = {}) => {
    const { append: d = !1, hasMore: L = !1 } = N, G = A.map((U) => ({
      id: parseInt(U.id, 10),
      title: U.title,
      reference_id: U.reference_id,
      open: U.open ?? !0,
      unread: U.unread ?? !1,
      lastActivity: U.lastActivity,
      thread: U.thread || [],
      // Empty or partial thread
      threadLoaded: U.thread && U.thread.length > 0
      // Flag to track if thread is loaded
    }));
    b((U) => {
      if (d) {
        const O = new Set(U.conversations.map((Q) => Q.id)), h = G.filter((Q) => !O.has(Q.id));
        return {
          conversations: [...U.conversations, ...h],
          conversationsLoading: !1,
          conversationsHasMore: L
        };
      } else {
        const O = new Map(U.conversations.map((Q) => [Q.id, Q])), h = G.map((Q) => {
          const j = O.get(Q.id);
          return j && j.threadLoaded && (!Q.thread || Q.thread.length === 0) ? {
            ...Q,
            thread: j.thread,
            threadLoaded: j.threadLoaded
          } : Q;
        });
        return {
          conversations: h,
          conversationsLoading: !1,
          conversationsHasMore: L,
          activeConversationId: U.activeConversationId || h[0]?.id || null
        };
      }
    });
  },
  // Set conversations loading state
  setConversationsLoading: (A) => {
    b({ conversationsLoading: A });
  },
  // Progressive loading: Load/append thread items for a specific conversation
  loadConversationThread: (A, N, d = {}) => {
    const { append: L = !1, hasMore: G = !1 } = d, U = parseInt(A, 10), O = N.map((h) => h.type === "message" && h.senderId !== null && h.senderId !== void 0 ? {
      ...h,
      senderId: parseInt(h.senderId, 10)
    } : h);
    b((h) => ({
      conversations: h.conversations.map((j) => j.id === U ? {
        ...j,
        thread: L ? [...j.thread || [], ...O] : O,
        threadLoaded: !0
      } : j),
      threadLoadingStates: {
        ...h.threadLoadingStates,
        [U]: { isLoading: !1, hasMore: G }
      }
    }));
  },
  // Set thread loading state for a specific conversation
  setThreadLoading: (A, N) => {
    const d = parseInt(A, 10);
    b((L) => ({
      threadLoadingStates: {
        ...L.threadLoadingStates,
        [d]: {
          ...L.threadLoadingStates[d] || {},
          isLoading: N
        }
      }
    }));
  },
  // Get thread loading state for a conversation
  getThreadLoadingState: (A) => {
    const N = parseInt(A, 10);
    return x().threadLoadingStates[N] || { isLoading: !1, hasMore: !1 };
  },
  // Export current state
  exportState: () => {
    const { conversations: A, activeConversationId: N } = x();
    return {
      conversations: A,
      activeConversationId: N
    };
  }
})), ov = ({
  onConversationOpened: b = null,
  onNewConversationClick: x = null,
  hideNewButton: A = !1,
  newConversationLabel: N = "",
  linkBuilder: d = null
}) => {
  const L = Rt((Z) => Z.conversations), G = Rt((Z) => Z.activeConversationId), U = Rt((Z) => Z.setActiveConversation), O = Rt((Z) => Z.setSidebarOpen), [h, Q] = Ml.useState(""), j = (Z) => {
    const ut = L.find((pt) => pt.id === Z);
    U(Z), O(!1), b && ut && b({
      conversationId: Z,
      conversation: ut
    });
  }, H = L.filter((Z) => !h || Z.title.toLowerCase().includes(h.toLowerCase())).sort((Z, ut) => Z.open !== ut.open ? Z.open ? -1 : 1 : Z.lastActivity < ut.lastActivity ? 1 : -1), dt = typeof N == "string" && N !== "";
  return /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-flex-col tw-h-full" }, /* @__PURE__ */ S.createElement(
    "div",
    {
      className: "tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3.5 tw-border-b tw-font-semibold",
      style: { borderColor: "var(--chat-border)" }
    },
    /* @__PURE__ */ S.createElement("span", null, "Conversations"),
    !A && /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        className: `tw-h-8 tw-rounded-lg tw-border-none tw-text-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center ${dt ? "tw-px-3 tw-text-sm tw-font-semibold" : "tw-w-8 tw-text-xl"}`,
        style: { background: "var(--chat-primary)" },
        onClick: x,
        "aria-label": "Create new conversation"
      },
      dt ? N : "+"
    )
  ), /* @__PURE__ */ S.createElement(
    "div",
    {
      className: "tw-p-2.5 tw-px-3 tw-border-b",
      style: { borderColor: "var(--chat-border)" }
    },
    /* @__PURE__ */ S.createElement(
      "input",
      {
        type: "search",
        className: "tw-w-full tw-px-3 tw-py-2.5 tw-rounded-lg tw-border",
        style: { borderColor: "var(--chat-border)" },
        placeholder: "Search conversations...",
        value: h,
        onChange: (Z) => Q(Z.target.value),
        "aria-label": "Search conversations"
      }
    )
  ), /* @__PURE__ */ S.createElement("div", { className: "tw-overflow-y-auto tw-h-full" }, H.map((Z) => {
    const ut = d ? d("conversation", Z.id, Z) : null, st = ((Z.thread || []).find((wt) => wt.role)?.role || "external") === "external";
    return /* @__PURE__ */ S.createElement(
      "div",
      {
        key: Z.id,
        className: `tw-flex tw-items-start tw-gap-2.5 tw-px-3.5 tw-py-3 tw-border-b tw-cursor-pointer ${Z.id === G ? "tw-bg-[#eef6ff]" : "hover:tw-bg-[#fafbff]"}`,
        style: { borderColor: "var(--chat-border)" },
        onClick: () => j(Z.id),
        role: "option",
        "aria-selected": Z.id === G
      },
      /* @__PURE__ */ S.createElement(
        "div",
        {
          className: "tw-w-7 tw-h-7 tw-rounded-full tw-bg-[#dbeafe] tw-flex tw-items-center tw-justify-center tw-text-[#1d4ed8]",
          title: st ? "Patient" : "Clinic"
        },
        st ? (
          // Patient icon (person)
          /* @__PURE__ */ S.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ S.createElement("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }))
        ) : (
          // Clinic icon (medical cross/building)
          /* @__PURE__ */ S.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ S.createElement("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" }))
        )
      ),
      Z.unread ? /* @__PURE__ */ S.createElement("div", { className: "tw-w-2 tw-h-2 tw-rounded-full tw-bg-[#ef4444] tw-mt-1.5 tw-flex-shrink-0" }) : /* @__PURE__ */ S.createElement("div", { className: "tw-w-2 tw-h-2 tw-flex-shrink-0" }),
      /* @__PURE__ */ S.createElement("div", { className: "tw-flex-1 tw-min-w-0" }, /* @__PURE__ */ S.createElement("div", { className: "tw-font-semibold tw-break-words" }, Z.title), /* @__PURE__ */ S.createElement("div", { className: "tw-text-xs tw-text-[var(--chat-muted)] tw-flex tw-gap-2 tw-flex-wrap" }, /* @__PURE__ */ S.createElement("span", null, sv(Z.lastActivity)), /* @__PURE__ */ S.createElement(
        "span",
        {
          className: `tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full ${Z.open ? "tw-text-[var(--chat-open-text)]" : "tw-text-[var(--chat-closed-text)]"}`,
          style: {
            background: Z.open ? "var(--chat-open-bg)" : "var(--chat-closed-bg)"
          }
        },
        Z.open ? "Open" : "Closed"
      ))),
      ut && /* @__PURE__ */ S.createElement(
        "a",
        {
          href: ut,
          className: "tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-rounded-full tw-border tw-text-[#666] hover:tw-bg-[#f0f0f0] tw-transition-colors tw-no-underline tw-flex-shrink-0",
          style: { borderColor: "var(--chat-border)" },
          onClick: (zt) => zt.stopPropagation(),
          "aria-label": "View conversation details",
          title: "View conversation"
        },
        /* @__PURE__ */ S.createElement(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          },
          /* @__PURE__ */ S.createElement("polyline", { points: "9 18 15 12 9 6" })
        )
      )
    );
  })));
}, rv = ({ item: b, currentUserId: x, linkBuilder: A }) => {
  const N = new Date(b.time.replace(" ", "T")).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  if (b.type === "message") {
    if (b.role === "system")
      return /* @__PURE__ */ S.createElement("div", { className: "tw-mb-5 tw-flex tw-flex-col tw-items-center" }, /* @__PURE__ */ S.createElement(
        "div",
        {
          className: "tw-bg-[#fff9c4] tw-border tw-border-[#fff59d] tw-rounded-xl tw-px-4 tw-py-2.5 tw-max-w-[85%] max-[480px]:tw-max-w-[96%] tw-text-[15px] tw-shadow-sm tw-text-center"
        },
        /* @__PURE__ */ S.createElement("div", { className: "tw-text-[#666]" }, /* @__PURE__ */ S.createElement("span", { dangerouslySetInnerHTML: { __html: b.text.replace(/\n/g, "<br>") } })),
        /* @__PURE__ */ S.createElement("div", { className: "tw-text-xs tw-text-[#888] tw-mt-1" }, N)
      ));
    const d = b.senderId === x, L = b.sender_name || (d ? "You" : "Other"), G = b.images && b.images.length > 0, U = b.text && b.text.trim();
    return /* @__PURE__ */ S.createElement(
      "article",
      {
        role: "article",
        "aria-label": `Message from ${L}`,
        "data-alignment": d ? "right" : "left",
        className: `tw-mb-5 tw-flex tw-flex-col ${d ? "tw-items-end" : "tw-items-start"} tw-min-w-0`
      },
      b.sender_name && /* @__PURE__ */ S.createElement("div", { className: "tw-text-xs tw-text-[#666] tw-mb-1 tw-font-medium" }, b.sender_name),
      G && /* @__PURE__ */ S.createElement("div", { className: `tw-flex tw-flex-wrap tw-gap-1 tw-mb-1 ${d ? "tw-justify-end" : "tw-justify-start"}` }, b.images.map((O, h) => /* @__PURE__ */ S.createElement(
        "a",
        {
          key: h,
          href: O.dataUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "tw-block"
        },
        /* @__PURE__ */ S.createElement(
          "img",
          {
            src: O.dataUrl,
            alt: O.name || `Image ${h + 1}`,
            className: "tw-max-w-[200px] tw-max-h-[200px] tw-rounded-lg tw-object-cover tw-cursor-pointer hover:tw-opacity-90"
          }
        )
      ))),
      U && /* @__PURE__ */ S.createElement(
        "p",
        {
          className: `tw-max-w-[75%] max-[480px]:tw-max-w-[92%] tw-px-3.5 tw-py-2.5 tw-rounded-2xl tw-text-[15px] ${d ? "tw-bg-[#c8e6c9]" : "tw-bg-[#e3f2fd]"} tw-text-[#222] tw-whitespace-pre-wrap tw-break-words`
        },
        /* @__PURE__ */ S.createElement("span", { className: "tw-text-sm tw-align-middle" }, Ad(b.channel)),
        /* @__PURE__ */ S.createElement("span", { dangerouslySetInnerHTML: { __html: b.text.replace(/\n/g, "<br>") } })
      ),
      !U && G && /* @__PURE__ */ S.createElement("div", { className: "tw-text-sm tw-text-[#888]" }, Ad(b.channel)),
      /* @__PURE__ */ S.createElement("div", { className: "tw-text-xs tw-text-[#888] tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5" }, Td(b.channel), " · ", N)
    );
  }
  if (b.type === "ref") {
    const L = {
      doc: { icon: "📄", label: "Document", borderColor: "#64b5f6" },
      rx: { icon: "💊", label: "Prescription", borderColor: "#80cbc4" },
      appt: { icon: "🗓️", label: "Appointment", borderColor: "#64b5f6" }
    }[b.refType] || { icon: "📎", label: "Reference", borderColor: "#64b5f6" }, G = b.refId ? A ? A(b.refType, b.refId, b) : `#${b.refType}/${b.refId}` : null;
    return /* @__PURE__ */ S.createElement("div", { className: "tw-mb-5 tw-flex tw-flex-col tw-items-center" }, /* @__PURE__ */ S.createElement(
      "div",
      {
        className: "tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] max-[480px]:tw-max-w-[96%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1 tw-min-w-0",
        style: { borderColor: "#e6ee9c", borderLeftColor: L.borderColor }
      },
      /* @__PURE__ */ S.createElement("div", { className: "tw-font-bold tw-text-[#333] tw-flex tw-items-center tw-gap-2 tw-flex-wrap tw-min-w-0" }, /* @__PURE__ */ S.createElement("span", { className: "tw-text-sm" }, L.icon), b.title && /* @__PURE__ */ S.createElement("span", { className: "tw-break-words" }, b.title), G && /* @__PURE__ */ S.createElement(
        "a",
        {
          href: G,
          className: "tw-text-xs tw-underline tw-break-all",
          style: { color: "var(--chat-primary)" }
        },
        L.label
      )),
      /* @__PURE__ */ S.createElement("div", { className: "tw-text-[#444] tw-break-words" }, /* @__PURE__ */ S.createElement("span", { dangerouslySetInnerHTML: { __html: b.text.replace(/\n/g, "<br>") } })),
      /* @__PURE__ */ S.createElement("div", { className: "tw-text-xs tw-text-[#888] tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5" }, Td(b.channel), " · ", N)
    ));
  }
  return null;
}, _d = ({ currentUserId: b = null, readOnlyConversation: x = null, linkBuilder: A = null }) => {
  const N = Rt((U) => U.getActiveConversation()), d = Ml.useRef(null), L = x || N;
  if (Ml.useEffect(() => {
    d.current && (d.current.scrollTop = d.current.scrollHeight);
  }, [L?.thread]), !L)
    return /* @__PURE__ */ S.createElement("div", { className: "tw-flex-1 tw-p-4 tw-overflow-y-auto tw-flex tw-items-center tw-justify-center tw-text-[var(--chat-muted)]" }, "No conversation selected");
  const G = [...L.thread].sort(
    (U, O) => U.time < O.time ? -1 : 1
  );
  return /* @__PURE__ */ S.createElement(
    "div",
    {
      ref: d,
      className: "tw-flex-1 tw-p-4 max-[480px]:tw-p-2.5 tw-overflow-y-auto tw-overflow-x-hidden tw-min-w-0"
    },
    G.map((U, O) => /* @__PURE__ */ S.createElement(rv, { key: O, item: U, currentUserId: b, linkBuilder: A }))
  );
}, dv = ({
  onMessageSent: b,
  currentUserId: x = null,
  activeConversation: A,
  disableClosedConversations: N = !1,
  hideDeliveryMethod: d = !1,
  onConversationCreated: L = null,
  disableAutoCreateConversation: G = !1
  // When true, sending a message won't auto-create a conversation
}) => {
  const [U, O] = Ml.useState(""), [h, Q] = Ml.useState("auto"), [j, H] = Ml.useState([]), dt = Ml.useRef(null), Z = Ml.useRef(null), ut = Rt((_) => _.addMessage), pt = Rt((_) => _.conversations), $t = Rt((_) => _.createConversation), st = Rt((_) => _.getActiveConversation), zt = N && A && !A.open, ht = G && !A, wt = zt || ht;
  Ml.useEffect(() => {
    if (dt.current) {
      dt.current.style.height = "auto";
      const _ = Math.min(dt.current.scrollHeight, 320);
      dt.current.style.height = _ + "px";
    }
  }, [U]), Ml.useEffect(() => {
    dt.current && (dt.current.style.height = "auto");
  }, []);
  const Qt = (_) => {
    if (zt) return;
    const K = _.clipboardData?.items;
    if (K) {
      for (const nt of K)
        if (nt.type.startsWith("image/")) {
          _.preventDefault();
          const s = nt.getAsFile();
          if (s) {
            const p = new FileReader();
            p.onload = (D) => {
              H((q) => [...q, {
                id: Date.now() + Math.random(),
                dataUrl: D.target.result,
                file: s,
                name: s.name || "pasted-image.png"
              }]);
            }, p.readAsDataURL(s);
          }
          break;
        }
    }
  }, Yt = (_) => {
    if (!_.type.startsWith("image/")) return;
    const K = new FileReader();
    K.onload = (nt) => {
      H((s) => [...s, {
        id: Date.now() + Math.random(),
        dataUrl: nt.target.result,
        file: _,
        name: _.name || "dropped-image.png"
      }]);
    }, K.readAsDataURL(_);
  }, [W, _t] = Ml.useState(!1), Ft = (_) => {
    _.preventDefault(), _.stopPropagation(), zt || _t(!0);
  }, Pt = (_) => {
    _.preventDefault(), _.stopPropagation(), _t(!1);
  }, Xt = (_) => {
    if (_.preventDefault(), _.stopPropagation(), _t(!1), zt) return;
    const K = _.dataTransfer?.files;
    if (K)
      for (const nt of K)
        nt.type.startsWith("image/") && Yt(nt);
  }, Zt = (_) => {
    H((K) => K.filter((nt) => nt.id !== _));
  }, il = (_) => {
    const K = _.target.files;
    if (K) {
      for (const nt of K)
        nt.type.startsWith("image/") && Yt(nt);
      _.target.value = "";
    }
  }, qt = (_, K, nt = {}) => {
    b && b({
      error: {
        code: _,
        message: K,
        ...nt
      }
    });
  }, C = () => {
    if (!U.trim() && j.length === 0 || wt) {
      ht && qt(
        "AUTO_CREATE_DISABLED",
        "No active conversation. Create a new chat before sending a message.",
        { requiresConversationCreation: !0 }
      );
      return;
    }
    let _ = A, K = !1;
    if (!A && pt.length === 0) {
      if (G) {
        qt(
          "AUTO_CREATE_DISABLED",
          "No active conversation. Create a new chat before sending a message.",
          { requiresConversationCreation: !0 }
        );
        return;
      }
      _ = $t("New Conversation"), K = !0;
    }
    if (!_) {
      qt(
        "NO_ACTIVE_CONVERSATION",
        "No active conversation is selected for this message."
      );
      return;
    }
    const nt = {
      text: U.trim(),
      channel: h,
      senderId: x,
      images: j.map((p) => ({ dataUrl: p.dataUrl, name: p.name }))
    }, s = ut(nt);
    if (K) {
      if (L) {
        const p = st();
        p && L({
          conversationId: p.id,
          conversation: p
        });
      }
    } else
      b && s && b({
        conversationId: _.id,
        message: s
      });
    O(""), H([]);
  }, T = (_) => {
    _.key === "Enter" && !_.shiftKey && (_.preventDefault(), wt || C());
  }, M = (U.trim() || j.length > 0) && !wt;
  return /* @__PURE__ */ S.createElement(
    "div",
    {
      className: `chat-compose-wrapper tw-border-t tw-px-3 tw-py-2 tw-flex tw-flex-col tw-gap-2 tw-relative ${W ? "tw-bg-blue-50" : ""}`,
      style: { borderColor: "var(--chat-border)" },
      onDragOver: Ft,
      onDragLeave: Pt,
      onDrop: Xt
    },
    W && /* @__PURE__ */ S.createElement("div", { className: "tw-absolute tw-inset-0 tw-border-2 tw-border-dashed tw-border-blue-400 tw-rounded tw-flex tw-items-center tw-justify-center tw-bg-blue-50 tw-bg-opacity-90 tw-z-10 tw-pointer-events-none" }, /* @__PURE__ */ S.createElement("span", { className: "tw-text-blue-600 tw-font-medium tw-text-sm" }, "Drop image here")),
    j.length > 0 && /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-gap-2 tw-flex-wrap" }, j.map((_) => /* @__PURE__ */ S.createElement(
      "div",
      {
        key: _.id,
        className: "tw-relative tw-group"
      },
      /* @__PURE__ */ S.createElement(
        "img",
        {
          src: _.dataUrl,
          alt: _.name,
          className: "tw-h-16 tw-w-16 tw-object-cover tw-rounded tw-border",
          style: { borderColor: "var(--chat-border)" }
        }
      ),
      /* @__PURE__ */ S.createElement(
        "button",
        {
          type: "button",
          onClick: () => Zt(_.id),
          className: "tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-rounded-full tw-bg-red-500 tw-text-white tw-text-xs tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white tw-cursor-pointer hover:tw-bg-red-600",
          "aria-label": `Remove ${_.name}`
        },
        "×"
      )
    ))),
    /* @__PURE__ */ S.createElement(
      "textarea",
      {
        ref: dt,
        className: `chat-compose-textarea tw-w-full tw-max-h-[320px] tw-resize-none tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm tw-leading-[1.4] tw-outline-none tw-overflow-y-auto ${wt ? "tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-500" : "focus:tw-border-[var(--chat-primary)] focus:tw-shadow-[0_0_0_2px_rgba(25,118,210,0.13)]"}`,
        style: { borderColor: "var(--chat-border)" },
        placeholder: zt ? "Conversation closed" : ht ? "Create a new chat to send a message" : "Type a message...",
        value: U,
        onChange: (_) => O(_.target.value),
        onKeyDown: T,
        onPaste: Qt,
        rows: 1,
        "aria-label": "Message text",
        disabled: wt
      }
    ),
    /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-items-center tw-gap-2 tw-flex-wrap" }, !d && /* @__PURE__ */ S.createElement(
      "select",
      {
        className: `tw-rounded tw-px-2 tw-py-1.5 tw-border tw-text-xs ${zt ? "tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-500" : ""}`,
        style: { borderColor: "var(--chat-border)" },
        value: h,
        onChange: (_) => Q(_.target.value),
        "aria-label": "Delivery method",
        disabled: zt
      },
      /* @__PURE__ */ S.createElement("option", { value: "auto" }, "Auto"),
      /* @__PURE__ */ S.createElement("option", { value: "portal" }, "Portal"),
      /* @__PURE__ */ S.createElement("option", { value: "sms" }, "SMS"),
      /* @__PURE__ */ S.createElement("option", { value: "voicemail" }, "Voicemail"),
      /* @__PURE__ */ S.createElement("option", { value: "task" }, "Task")
    ), /* @__PURE__ */ S.createElement("span", { className: "tw-text-xs tw-text-[var(--chat-muted)]" }, U.length, " chars"), /* @__PURE__ */ S.createElement("div", { className: "tw-flex-1" }), /* @__PURE__ */ S.createElement(
      "input",
      {
        ref: Z,
        type: "file",
        accept: "image/*",
        multiple: !0,
        className: "tw-hidden",
        onChange: il,
        "aria-hidden": "true"
      }
    ), /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        onClick: () => Z.current?.click(),
        className: `tw-border tw-rounded tw-p-1.5 tw-text-lg tw-leading-none ${zt ? "tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-400" : "tw-bg-white tw-cursor-pointer tw-text-gray-600 hover:tw-bg-gray-50 hover:tw-text-gray-800"}`,
        style: { borderColor: "var(--chat-border)" },
        "aria-label": "Attach image",
        title: "Attach image or take photo",
        disabled: zt
      },
      /* @__PURE__ */ S.createElement(
        "svg",
        {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false"
        },
        /* @__PURE__ */ S.createElement("path", { d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" })
      )
    ), /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        className: `tw-border-none tw-rounded tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium ${M ? "tw-text-white tw-cursor-pointer hover:tw-bg-[var(--chat-primary-600)]" : "tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed"}`,
        style: { background: M ? "var(--chat-primary)" : void 0 },
        onClick: C,
        "aria-label": "Send message",
        disabled: !M
      },
      "Send"
    ))
  );
}, mv = ({
  hideToggleButton: b = !1,
  hideStatusToggle: x = !1,
  hideConversationStatus: A = !1,
  showCloseButton: N = !1,
  onConversationClosed: d = null,
  isCompactLayout: L = !1,
  hideStatusForWidth: G = !1
}) => {
  const U = Rt((st) => st.getActiveConversation()), O = Rt((st) => st.toggleConversationStatus), h = Rt((st) => st.markAsUnread), Q = Rt((st) => st.toggleSidebar), j = Rt((st) => st.sidebarOpen), H = () => {
    U && O(U.id);
  }, dt = () => {
    U && (U.open && N && d && d({
      conversationId: U.id,
      conversation: U
    }), O(U.id));
  }, Z = () => {
    U && h(U.id);
  }, ut = !!U?.open, pt = !!U, $t = "tw-w-8 tw-h-8 tw-rounded-md tw-border tw-bg-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-transition-colors disabled:tw-cursor-not-allowed disabled:tw-opacity-60";
  return /* @__PURE__ */ S.createElement(
    "header",
    {
      className: "tw-bg-white tw-border-b tw-px-3 tw-py-1.5 tw-flex tw-items-center tw-justify-between tw-gap-2",
      style: { borderColor: "var(--chat-border)" }
    },
    /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-items-center tw-gap-2 tw-min-w-0" }, !b && !j && L && /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        className: "tw-w-8 tw-h-8 tw-rounded-md tw-border tw-bg-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-transition-colors",
        onClick: Q,
        "aria-label": "Toggle conversations",
        title: "Toggle conversations",
        style: { borderColor: "var(--chat-border)" }
      },
      /* @__PURE__ */ S.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ S.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ S.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), /* @__PURE__ */ S.createElement("line", { x1: "3", y1: "18", x2: "21", y2: "18" }))
    ), /* @__PURE__ */ S.createElement("div", { className: "tw-font-semibold tw-text-sm tw-truncate" }, U?.title || "Clinical Timeline")),
    /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-gap-2 tw-items-center tw-flex-shrink-0" }, !A && !G && /* @__PURE__ */ S.createElement(
      "span",
      {
        className: `tw-text-[11px] tw-leading-4 tw-px-1.5 tw-py-0.5 tw-rounded-full ${ut ? "tw-text-[var(--chat-open-text)]" : "tw-text-[var(--chat-closed-text)]"}`,
        style: {
          background: ut ? "var(--chat-open-bg)" : "var(--chat-closed-bg)"
        }
      },
      ut ? "Open" : "Closed"
    ), !x && /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        className: $t,
        onClick: N ? dt : H,
        title: ut ? "Close conversation" : "Reopen conversation",
        "aria-label": ut ? "Close conversation" : "Reopen conversation",
        style: { borderColor: "var(--chat-border)" },
        disabled: !pt
      },
      ut ? (
        // Lock icon (action: close)
        /* @__PURE__ */ S.createElement(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            focusable: "false"
          },
          /* @__PURE__ */ S.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
          /* @__PURE__ */ S.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
        )
      ) : (
        // Unlock icon (action: reopen)
        /* @__PURE__ */ S.createElement(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            focusable: "false"
          },
          /* @__PURE__ */ S.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
          /* @__PURE__ */ S.createElement("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
        )
      )
    ), /* @__PURE__ */ S.createElement(
      "button",
      {
        type: "button",
        className: $t,
        onClick: Z,
        title: "Mark conversation as unread",
        "aria-label": "Mark conversation as unread",
        style: { borderColor: "var(--chat-border)" },
        disabled: !pt
      },
      /* @__PURE__ */ S.createElement(
        "svg",
        {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          focusable: "false"
        },
        /* @__PURE__ */ S.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
        /* @__PURE__ */ S.createElement("polyline", { points: "3 7 12 13 21 7" })
      )
    ))
  );
}, yv = ({
  initialData: b = null,
  initialActiveConversationId: x = null,
  onMessageSent: A = null,
  onConversationOpened: N = null,
  // Callback when a conversation is opened/selected
  onConversationCreated: d = null,
  // Callback when a new conversation is created
  onConversationClosed: L = null,
  // Callback when a conversation is closed via the Close button
  className: G = "",
  height: U = "500px",
  maxWidth: O = "1100px",
  currentUserId: h = null,
  // Identifier for the current user viewing this component
  readOnly: Q = !1,
  // Enable read-only mode
  conversation: j = null,
  // Conversation object for read-only mode
  hideNewButton: H = !1,
  // Hide the New Conversation button
  newConversationLabel: dt = "",
  // Label for the New Conversation button; falls back to '+' when empty
  hideToggleButton: Z = !1,
  // Hide the sidebar toggle button
  hideStatusToggle: ut = !1,
  // Hide the conversation status toggle button
  hideConversationStatus: pt = !1,
  // Hide the conversation status badge (Open/Closed)
  showCloseButton: $t = !1,
  // Show Close button instead of Toggle Status button
  disableClosedConversations: st = !1,
  // Disable compose area when conversation status is closed
  hideDeliveryMethod: zt = !1,
  // Hide the delivery method dropdown in compose area
  linkBuilder: ht = null,
  // Function to build custom links: (refType, refId, item) => string
  onNewConversation: wt = null,
  // Custom handler for New Conversation button: receives { openDialog, createConversation } helpers
  disableAutoCreateConversation: Qt = !1
  // Prevent the compose area from auto-creating a new conversation; only the New Chat button can create chats
}) => {
  const [Yt, W] = S.useState(!1), [_t, Ft] = S.useState(""), [Pt, Xt] = S.useState(0), Zt = S.useRef(null), il = Rt((B) => B.sidebarOpen), qt = Rt((B) => B.setSidebarOpen), C = Rt((B) => B.loadConversations), T = Rt((B) => B.createConversation), M = Rt((B) => B.setActiveConversation), _ = Rt((B) => B.getActiveConversation()), K = 720, nt = 420, s = Pt > 0 && Pt < K, p = Pt > 0 && Pt < nt;
  S.useEffect(() => {
    if (!Zt.current || typeof ResizeObserver > "u")
      return;
    const B = new ResizeObserver(([I]) => {
      I && Xt(Math.round(I.contentRect.width));
    });
    return B.observe(Zt.current), () => {
      B.disconnect();
    };
  }, []), S.useEffect(() => {
    !s && il && qt(!1);
  }, [s, qt, il]), S.useEffect(() => {
    b && C(b);
  }, [b, C]), S.useEffect(() => {
    x !== null && M(x);
  }, [x, M]);
  const D = () => {
    qt(!1);
  }, q = () => {
    if (wt) {
      wt({
        openDialog: () => W(!0),
        createConversation: (B, I = !0) => {
          const Ct = T(B || "New Conversation");
          return I && d && Ct && d({
            conversationId: Ct.id,
            conversation: Ct
          }), Ct;
        }
      });
      return;
    }
    W(!0);
  }, F = () => {
    const B = _t.trim() || "New Conversation", I = T(B);
    W(!1), Ft(""), d && I && d({
      conversationId: I.id,
      conversation: I
    });
  };
  return Q && j ? /* @__PURE__ */ S.createElement(
    "div",
    {
      ref: Zt,
      role: "region",
      "aria-label": "Chat",
      className: `chat-component-root tw-flex tw-flex-col tw-border tw-rounded-lg ${G}`,
      style: {
        height: U,
        width: "100%",
        maxWidth: O,
        background: "var(--chat-bg)",
        borderColor: "var(--chat-border)",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "var(--chat-text)"
      }
    },
    /* @__PURE__ */ S.createElement(
      "div",
      {
        className: "tw-bg-white tw-border-b tw-px-3.5 tw-py-2.5",
        style: { borderColor: "var(--chat-border)" }
      },
      /* @__PURE__ */ S.createElement("div", { className: "tw-font-bold" }, j.title || "Conversation")
    ),
    /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-min-w-0" }, /* @__PURE__ */ S.createElement("div", { className: `tw-flex tw-flex-col tw-flex-1 tw-bg-white tw-rounded-lg tw-shadow-sm tw-min-w-0 ${s ? "tw-m-2" : "tw-m-3.5"}` }, /* @__PURE__ */ S.createElement(
      _d,
      {
        currentUserId: h,
        readOnlyConversation: j,
        linkBuilder: ht
      }
    )))
  ) : /* @__PURE__ */ S.createElement(
    "div",
    {
      ref: Zt,
      role: "region",
      "aria-label": "Chat",
      className: `chat-component-root tw-flex tw-relative tw-overflow-hidden tw-border tw-rounded-lg ${G}`,
      style: {
        height: U,
        width: "100%",
        maxWidth: O,
        background: "var(--chat-bg)",
        borderColor: "var(--chat-border)",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "var(--chat-text)"
      }
    },
    /* @__PURE__ */ S.createElement(
      "aside",
      {
        className: `tw-flex tw-flex-col tw-bg-white tw-border-r tw-transition-transform tw-duration-300 tw-ease-in-out tw-min-w-0 ${s ? il ? "tw-translate-x-0 tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-z-[1001] tw-shadow-2xl" : "tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-z-[1001] tw--translate-x-full" : "tw-relative tw-translate-x-0 tw-shadow-none"}`,
        style: {
          borderColor: "var(--chat-border)",
          maxWidth: s ? "min(84%, 320px)" : "300px",
          width: s ? "min(84%, 320px)" : "300px",
          flexShrink: 0
        }
      },
      /* @__PURE__ */ S.createElement(
        ov,
        {
          onConversationOpened: N,
          onNewConversationClick: q,
          hideNewButton: H,
          newConversationLabel: dt,
          linkBuilder: ht
        }
      )
    ),
    /* @__PURE__ */ S.createElement(
      "div",
      {
        className: `tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-transition-opacity tw-duration-200 tw-z-[1000] ${s && il ? "tw-opacity-100 tw-pointer-events-auto" : "tw-opacity-0 tw-pointer-events-none"}`,
        onClick: D
      }
    ),
    /* @__PURE__ */ S.createElement("main", { className: "tw-flex tw-flex-col tw-flex-1 tw-h-full tw-min-w-0" }, /* @__PURE__ */ S.createElement(
      mv,
      {
        hideToggleButton: Z,
        hideStatusToggle: ut,
        hideConversationStatus: pt,
        showCloseButton: $t,
        onConversationClosed: L,
        isCompactLayout: s,
        hideStatusForWidth: p
      }
    ), /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-flex-1 tw-overflow-hidden tw-h-full tw-min-w-0" }, /* @__PURE__ */ S.createElement("div", { className: `tw-flex tw-flex-col tw-flex-1 tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden tw-min-w-0 ${s ? "tw-m-2" : "tw-m-3.5 max-[480px]:tw-m-2"}` }, /* @__PURE__ */ S.createElement(
      _d,
      {
        currentUserId: h,
        linkBuilder: ht
      }
    ), /* @__PURE__ */ S.createElement(
      dv,
      {
        onMessageSent: A,
        currentUserId: h,
        activeConversation: _,
        disableClosedConversations: st,
        hideDeliveryMethod: zt,
        onConversationCreated: d,
        disableAutoCreateConversation: Qt
      }
    )))),
    Yt && /* @__PURE__ */ S.createElement(
      "div",
      {
        className: "tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-[2000]",
        onClick: () => W(!1)
      },
      /* @__PURE__ */ S.createElement(
        "div",
        {
          className: "tw-bg-white tw-rounded-lg tw-p-6 tw-min-w-[320px] tw-max-w-[90vw]",
          onClick: (B) => B.stopPropagation()
        },
        /* @__PURE__ */ S.createElement("h3", { className: "tw-mt-0 tw-mb-4 tw-text-lg tw-font-semibold" }, "Create Conversation"),
        /* @__PURE__ */ S.createElement("label", { className: "tw-block tw-mb-1" }, "Title"),
        /* @__PURE__ */ S.createElement(
          "input",
          {
            type: "text",
            className: "tw-w-full tw-px-2.5 tw-py-2 tw-border tw-rounded-lg",
            style: { borderColor: "var(--chat-border)" },
            placeholder: "e.g., General Question",
            value: _t,
            onChange: (B) => Ft(B.target.value),
            onKeyDown: (B) => {
              B.key === "Enter" ? F() : B.key === "Escape" && W(!1);
            },
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ S.createElement("div", { className: "tw-flex tw-gap-2 tw-mt-3" }, /* @__PURE__ */ S.createElement(
          "button",
          {
            type: "button",
            className: "tw-flex-1 tw-px-2.5 tw-py-2 tw-border tw-rounded-lg tw-bg-white tw-cursor-pointer",
            style: { borderColor: "var(--chat-border)" },
            onClick: () => W(!1)
          },
          "Cancel"
        ), /* @__PURE__ */ S.createElement(
          "button",
          {
            type: "button",
            className: "tw-flex-1 tw-px-2.5 tw-py-2 tw-border-none tw-rounded-lg tw-text-white tw-cursor-pointer",
            style: { background: "var(--chat-primary)" },
            onClick: F
          },
          "Create"
        ))
      )
    )
  );
};
export {
  S as React,
  vv as ReactDOM,
  yv as default,
  Rt as useChatStore
};
