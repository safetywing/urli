const tinytest = require("tiny-test");
const URL      = require("../index.js");

tinytest(function (test, load) {
  test("http://www.google.com/")
    .this(function () {
      let l = new URL("http://www.google.com/");
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin  : { __origin: "http://www.google.com" },
        search  : { __schema: {}, __schemaKeys: [] },
        params  : { __path: [], __params: [], __isMatch: true },
        isMatch : true
      };
    });

  test("http://www.google.com/ (object.origin)")
    .this(function () {
      let l = new URL({ origin: "http://www.google.com/" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin  : { __origin: "http://www.google.com" },
        search  : { __schema: {}, __schemaKeys: [] },
        params  : { __path: [], __params: [], __isMatch: true },
        isMatch : true
      };
    });

  test("http://www.google.com/ (object.href)")
    .this(function () {
      let l = new URL({ href: "http://www.google.com/" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin  : { __origin: "http://www.google.com" },
        search  : { __schema: {}, __schemaKeys: [] },
        params  : { __path: [], __params: [], __isMatch: true },
        isMatch : true
      };
    });

  test("http://www.google.com/:x")
    .this(function () {
      let l = new URL("http://www.google.com/:x", { href: "http://www.google.com/cat" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin : { __origin: "http://www.google.com" },
        search : { __schema: {}, __schemaKeys: [] },
        params : {
          __path    : [ "cat" ],
          __params  : [ ":x" ],
          __isMatch : true,
          x         : "cat"
        },
        isMatch : true,
      };
    });

  test("http://www.google.com/:x/:y")
    .this(function () {
      let l = new URL("http://www.google.com/:x/:y", { href: "http://www.google.com/cats/dogs" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin : { __origin: "http://www.google.com" },
        search : { __schema: {}, __schemaKeys: [] },
        params : {
          __path    : [ "cats", "dogs" ],
          __params  : [ ":x", ":y" ],
          __isMatch : true,
          x         : "cats",
          y         : "dogs",
        },
        isMatch : true
      };
    });

  test("http://www.google.com/:x/:y (isMatch = false)")
    .this(function () {
      let l = new URL("http://www.google.com/:x/:y", { href: "http://www.google.com/cats" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin : { __origin: "http://www.google.com" },
        search : { __schema: {}, __schemaKeys: [] },
        params : {
          __path    : [ "cats" ],
          __params  : [ ":x", ":y" ],
          __isMatch : false,
          x         : "cats",
          y         : undefined,
        },
        isMatch : false
      };
    });

  test("http://www.google.com?search=1")
    .this(function () {
      let l = new URL({ href: "http://www.google.com/?search=1" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin: { __origin: "http://www.google.com" },

        search: {
          __schema     : {},
          __schemaKeys : [],
          search       : 1
        },

        params: {
          __path    : [],
          __params  : [],
          __isMatch : true
        },

        isMatch: true
      };
    });

  test("http://www.google.com?search[]")
    .this(function () {
      let l = new URL("http://www.google.com?search[]", { href: "http://www.google.com/?search[]=1&search[]=2" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin: {
          __origin : "http://www.google.com"
        },

        search: {
          __schema     : {
            search : {
              type : "array",
              map  : []
            }
          },
          __schemaKeys : [ "search" ],
          search       : [ 1, 2 ]
        },

        params: {
          __path    : [],
          __params  : [],
          __isMatch : true
        },

        isMatch: true
      };
    });

  test("http://www.google.com (no schema and array)")
    .this(function () {
      let l = new URL("http://www.google.com", { href: "http://www.google.com/?search[]=1&search[]=2" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin: {
          __origin : "http://www.google.com"
        },

        search: {
          __schema     : {},
          __schemaKeys : [],
          search       : [ 1, 2 ]
        },

        params: {
           __path    : [],
           __params  : [],
           __isMatch : true
        },

        isMatch: true
      };
    });

  test("http://www.google.com/?search=:number")
    .this(function () {
      let l = new URL("http://www.google.com/?search=:number", { href: "http://www.google.com/?search=1" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        origin: {
          __origin : "http://www.google.com"
        },

        search: {
          __schema     : {
            search: {
              type: "object",
              map: [ "number" ]
            }
          },
          __schemaKeys : [ "search" ],
          search       : { number: 1 }
        },

        params: {
           __path    : [],
           __params  : [],
           __isMatch : true
        },

        isMatch: true
      };
    });

  load();
});