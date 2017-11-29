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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "",
          searchSchema : ""
        },
        hash    : { value: "" },
        origin  : { value: "http://www.google.com" },
        search  : { schema: {}, schemaKeys: [] },
        params  : { path: [], params: [], isMatch: true },
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "",
          searchSchema : ""
        },
        hash    : { value: "" },
        origin  : { value: "http://www.google.com" },
        search  : { schema: {}, schemaKeys: [] },
        params  : { path: [], params: [], isMatch: true },
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
        location : {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "",
          searchSchema : ""
        },
        hash    : { value: "" },
        origin  : { value: "http://www.google.com" },
        search  : { schema: {}, schemaKeys: [] },
        params  : { path: [], params: [], isMatch: true },
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/cat",
          hash         : "",
          pathname     : "/cat",
          params       : "/:x",
          search       : "",
          searchSchema : ""
        },
        hash   : { value: "" },
        origin : { value: "http://www.google.com" },
        search : { schema: {}, schemaKeys: [] },
        params : {
          path    : [ "cat" ],
          params  : [ ":x" ],
          isMatch : true,
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/cats/dogs",
          hash         : "",
          pathname     : "/cats/dogs",
          params       : "/:x/:y",
          search       : "",
          searchSchema : ""
        },
        hash   : { value: "" },
        origin : { value: "http://www.google.com" },
        search : { schema: {}, schemaKeys: [] },
        params : {
          path    : [ "cats", "dogs" ],
          params  : [ ":x", ":y" ],
          isMatch : true,
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/cats",
          hash         : "",
          pathname     : "/cats",
          params       : "/:x/:y",
          search       : "",
          searchSchema : ""
        },
        hash   : { value: "" },
        origin : { value: "http://www.google.com" },
        search : { schema: {}, schemaKeys: [] },
        params : {
          path    : [ "cats" ],
          params  : [ ":x", ":y" ],
          isMatch : false,
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/?search=1",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?search=1",
          searchSchema : ""
        },

        hash   : { value: "" },
        origin : { value: "http://www.google.com" },

        search : {
          schema     : {},
          schemaKeys : [],
          search       : 1
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/?search[]=1&search[]=2",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?search[]=1&search[]=2",
          searchSchema : "?search[]"
        },

        origin : {
          value : "http://www.google.com"
        },
        hash   : { value: "" },

        search: {
          schema     : {
            search : {
              type : "array",
              delimiter : "+",
              map  : []
            }
          },
          schemaKeys : [ "search" ],
          search       : [ 1, 2 ]
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/?search[]=1&search[]=2",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?search[]=1&search[]=2",
          searchSchema : ""
        },

        origin: {
          value : "http://www.google.com"
        },

        hash   : { value: "" },

        search: {
          schema     : {},
          schemaKeys : [],
          search       : [ 1, 2 ]
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
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
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/?search=1",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?search=1",
          searchSchema : "?search=:number"
        },

        origin: {
          value : "http://www.google.com"
        },

        hash : { value: "" },

        search: {
          schema     : {
            search: {
              delimiter : "+",
              type      : "object",
              map       : [ "number" ]
            }
          },
          schemaKeys : [ "search" ],
          search       : { number: 1 }
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
        },

        isMatch: true
      };
    });

  test("http://www.google.com/?search[]=:number")
    .this(function () {
      let l = new URL("http://www.google.com/?search[]=:number", { href: "http://www.google.com/?search[]=1&search[]=2" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        location: {
          origin       : "http://www.google.com",
          href         : "http://www.google.com/?search[]=1&search[]=2",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?search[]=1&search[]=2",
          searchSchema : "?search[]=:number"
        },

        origin: {
          value : "http://www.google.com"
        },

        hash : { value: "" },

        search: {
          schema     : {
            search: {
              delimiter : "+",
              type      : "array",
              map       : [ "number" ]
            }
          },
          schemaKeys : [ "search" ],
          search       : [{ number: 1 }, { number: 2 }]
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
        },

        isMatch: true
      };
    });

  test("http://www.google.com/ (toString)")
    .this(function () {
      let l = new URL("http://www.google.com/");
      return l.toString();
    })
    .isEqual(function () {
      return "http://www.google.com/";
    });

  test("http://www.google.com/?search=2 (toString)")
    .this(function () {
      let l = new URL({ href: "http://www.google.com/?search=2" });
      l.search.search = 3;
      return l.toString();
    })
    .isEqual(function () {
      return "http://www.google.com/?search=3";
    });

  test("http://www.google.com/?search[]=1&search[]=2 (toString)")
    .this(function () {
      let l = new URL({ href: "http://www.google.com/?search[]=1&search[]=2" });
      l.search.search[0] = 3;
      return l.toString();
    })
    .isEqual(function () {
      return "http://www.google.com/?search[]=3&search[]=2";
    });

  test("http://www.google.com/?search[]=:number (toString)")
    .this(function () {
      let l = new URL("http://www.google.com/?search[]=:number", {
        href: "http://www.google.com/?search[]=1&search[]=2"
      });
      l.search.search[0].number = 3;
      return l.toString();
    })
    .isEqual(function () {
      return "http://www.google.com/?search[]=3&search[]=2";
    });

  test("http://www.google.com/?search[]=:name,:gender (toString)")
    .this(function () {
      let l = new URL("http://www.google.com/?search[]=:name,:gender", {
        href: "http://www.google.com/?search[]=sean,male&search[]=sarah,female"
      });
      l.search.search[0].name = "John";
      return l.toString();
    })
    .isEqual(function () {
      return "http://www.google.com/?search[]=John,male&search[]=sarah,female";
    });

  test("/user/:userID (string HREF)")
    .this(function () {
      const l = new URL(
        "/user/:userID",
        "/user/SeanJM"
      );
      return l.params.userID;
    })
    .isEqual(function () {
      return "SeanJM";
    });

  test("/user/:userID (object)")
    .this(function () {
      const l = new URL("/user/:userID", { pathname: "/user/SeanJM" });
      return l.params.userID;
    })
    .isEqual(function () {
      return "SeanJM";
    });

  test("/user/:userID?depth[]=:number+:id")
    .this(function () {
      const l = new URL("/user/:userID?depth[]=:number+:id", {
        pathname : "/user/SeanJM",
        search   : "?depth[]=0+o8jk&depth[]=1+99qE&depth[]=2+eBPs"
      });
      return l.search.depth;
    })
    .isDeepEqual(function () {
      return [{
        number: 0,
        id    : "o8jk"
      }, {
        number: 1,
        id    : "99qE"
      }, {
        number: 2,
        id    : "eBPs"
      }];
    });

  test("/post/:postID?origin=... (manipulating a mapped object)")
    .this(function () {
      const l = new URL("/post/:postID?origin=board+:category+:page", {
        pathname: "/post/ezAYhlkuGEz",
        search  : "?origin=board+food+1"
      });

      l.search.origin.category = "fitness";
      return l.toString();
    })
    .isEqual(function () {
      return "/post/ezAYhlkuGEz?origin=board+fitness+1";
    });

  test("Empty")
    .this(function () {
      const l = new URL();
      return l.toString();
    })
    .isEqual(function () {
      return "/";
    });

  test("/a vs /a/b (does not match)")
    .this(function () {
      const a = new URL("/:a", "/a");
      const b = new URL("/:a", "/a/b");
      return a.isMatch && !b.isMatch;
    })
    .isEqual(function () {
      return true;
    });

  test("*?origin=user+:userID+:section+:page")
    .this(function () {
      let l = new URL("*?origin=user+:userID+:section+:page", { href: "http://www.domain.com/?origin=user+98fjhd+all+1" });
      return l;
    })
    .isDeepEqual(function () {
      return {
        location: {
          origin       : "http://www.domain.com",
          href         : "http://www.domain.com/?origin=user+98fjhd+all+1",
          hash         : "",
          pathname     : "/",
          params       : "/",
          search       : "?origin=user+98fjhd+all+1",
          searchSchema : "?origin=user+:userID+:section+:page"
        },

        origin: {
          value: "http://www.domain.com"
        },

        hash : { value: "" },

        search: {
          schema     : {
            origin: {
              delimiter: "+",
              type : "object",
              map: [ { constant: "user" }, "userID", "section", "page" ]
            }
          },
          schemaKeys : [ "origin" ],
          origin       : {
            user: "user",
            userID: "98fjhd",
            section: "all",
            page : 1
          }
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
        },

        isMatch: true
      };
    });

  test("*?origin=user+:userID+:section+:page (pathname, search)")
    .this(function () {
      let l = new URL("*?origin=user+:userID+:section+:page", {
        pathname : "/post/p398dfjkj",
        search   : "?origin=user+98fjhd+all+1"
      });
      return l;
    })
    .isDeepEqual(function () {
      return {
        location: {
          origin       : undefined,
          href         : undefined,
          hash         : "",
          pathname     : "/post/p398dfjkj",
          params       : "/",
          search       : "?origin=user+98fjhd+all+1",
          searchSchema : "?origin=user+:userID+:section+:page"
        },

        origin: { value: undefined },

        hash : { value: "" },

        search: {
          schema     : {
            origin: {
              delimiter: "+",
              type : "object",
              map: [ { constant: "user" }, "userID", "section", "page" ]
            }
          },
          schemaKeys : [ "origin" ],
          origin       : {
            user: "user",
            userID: "98fjhd",
            section: "all",
            page : 1
          }
        },

        params: {
          path    : [ "post", "p398dfjkj" ],
          params  : [],
          isMatch : true
        },

        isMatch: true
      };
    });

  test("/board/:category?page")
    .this(function () {
      let back            = new URL("/user/:userID/:section?page");
      back.params.userID  = "98374jf";
      back.params.section = "comments";
      back.search.page    = 1;
      return back.toString();
    })
    .isDeepEqual(function () {
      return "/user/98374jf/comments?page=1";
    });

  test("http://localhost:3000/login?reset")
    .this(function () {
      let url = new URL({ href: "http://localhost:3000/login?reset" });
      return url.search.reset;
    })
    .isDeepEqual(function () {
      return 1;
    });

  test("http://localhost:3000/login?reset (toString)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/login?reset"
      });
      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3000/login?reset=1";
    });

  test("http://localhost:3000/?string (search set)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/?string"
      });

      url.search.set({
        string: "this will be an encoded string"
      });

      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3000/?string=this%20will%20be%20an%20encoded%20string";
    });

  test("http://localhost:3000/?string (search get)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/?string"
      });

      url.search.string = "this will be an encoded string";

      return url.search.get("string");
    })
    .isDeepEqual(function () {
      return "this will be an encoded string";
    });

  test("http://localhost:3000/?string (search get array)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/?string"
      });

      url.search.set({
        string: "this will be an encoded string",
        number: 2098
      });

      return url.search.get([ "string", "number" ]);
    })
    .isDeepEqual(function () {
      return {
        string: "this will be an encoded string",
        number: 2098
      };
    });

  test("http://localhost:3000/?string (set pathname)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/?string"
      });

      url.set({
        pathname : "/path/name"
      });

      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3000/path/name?string=1";
    });

  test("http://localhost:3000/?string (set search)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/login"
      });

      url.set({
        search : "?search=1&cat=fluffy&dog=sam"
      });

      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3000/login?search=1&cat=fluffy&dog=sam";
    });

  test("http://localhost:3000/startswith/ (startsWith)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/startswith/"
      });
      return url.params.startsWith("startswith");
    })
    .isDeepEqual(function () {
      return true;
    });

  test("/startswith (startsWith)")
    .this(function () {
      let url = new URL({
        href: "/login"
      });
      return url.params.startsWith("/login");
    })
    .isDeepEqual(function () {
      return true;
    });

  test("http://localhost:3000/startswith/ (startsWith multiple)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/startswith/reset"
      });
      return (
        url.params.startsWith("startswith/reset") &&
        url.params.startsWith("/startswith/reset") &&
        !url.params.startsWith("/startswith/res") &&
        !url.params.startsWith("startswith/test")
      );
    })
    .isDeepEqual(function () {
      return true;
    });

  test("http://localhost:3000/starts/with/that (is)")
    .this(function () {
      let url = new URL({
        href: "http://localhost:3000/starts/with/"
      });
      return (
        url.params.is("starts/with/") &&
        url.params.is("/starts/with/") &&
        url.params.is("starts/with") &&
        !url.params.is("starts/with/that")
      );
    })
    .isDeepEqual(function () {
      return true;
    });

  test("http://localhost:3001/ (startsWith)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/",
      });
      return url.params.startsWith("login");
    })
    .isDeepEqual(function () {
      return false;
    });

  test("http://localhost:3001/ (push)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/",
      });
      url.params.push("login");
      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3001/login";
    });

  test("http://localhost:3001/ (push object)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/",
      });

      url.params.push({ name: "login" });

      return [ url.toString(), url.params.name ];
    })
    .isDeepEqual(function () {
      return [ "http://localhost:3001/login", "login" ];
    });

  test("http://localhost:3001/ (unshift)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/",
      });
      url.params.unshift("login");
      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3001/login";
    });

  test("http://localhost:3001/ (unshift object)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/",
      });

      url.params.unshift({ name: "login" });

      return [ url.toString(), url.params.name ];
    })
    .isDeepEqual(function () {
      return [ "http://localhost:3001/login", "login" ];
    });

  test("http://localhost:3001/#my-hash (Object)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/#my-hash",
      });
      return url;
    })
    .isDeepEqual(function () {
      return {
        location: {
          origin       : "http://localhost:3001",
          href         : "http://localhost:3001/#my-hash",
          pathname     : "/",
          hash         : "#my-hash",
          params       : "/",
          search       : "",
          searchSchema : ""
        },

        origin: {
          value: "http://localhost:3001"
        },

        search: {
          schema     : {},
          schemaKeys : []
        },

        params: {
          path    : [],
          params  : [],
          isMatch : true
        },

        hash: {
          value: "#my-hash"
        },

        isMatch: true
      };
    });

  test("http://localhost:3001/#my-hash (query hash)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/#my-hash",
      });

      return url.location.hash;
    })
    .isDeepEqual(function () {
      return "#my-hash";
    });

  test("http://localhost:3001/#my-hash (hash toString)")
    .this(function () {
      let url = new URL({
        href : "http://localhost:3001/#my-hash",
      });

      url.hash.value = "#changed-hash";
      return url.toString();
    })
    .isDeepEqual(function () {
      return "http://localhost:3001/#changed-hash";
    });

  test("https://maps.googleapis.com/maps/api/place/textsearch/json (Copy)")
    .this(function () {
      let url  = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
      let copy = url.copy();

      copy.search.query = "test";

      return [
        url.toString(),
        copy.toString()
      ];
    })
    .isDeepEqual(function () {
      return [
        "https://maps.googleapis.com/maps/api/place/textsearch/json",
        "https://maps.googleapis.com/maps/api/place/textsearch/json?query=test"
      ];
    });

  load();
});