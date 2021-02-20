! function (e) {
    var t = {};

    function n(a) {
        if (t[a]) return t[a].exports;
        var c = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(c.exports, c, c.exports, n), c.l = !0, c.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, a) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var c in e) n.d(a, c, function (t) {
                return e[t]
            }.bind(null, c));
        return a
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/", n(n.s = 0)
}([function (e, t, n) {
    "use strict";
    n.r(t);
    const a = "https://api.giphy.com/v1/gifs/translate?api_key=OUN5WKMjCRqGCoBwJGnzBCnRBg14UdNN&s=";
    var c = (() => {
            const e = async e => {
                let t = null;
                try {
                    const n = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + e + "&APPID=ea07e9e09150478becb8d938351479dd", {
                            mode: "cors"
                        }),
                        a = await n.json();
                    t = {
                        cityName: a.name,
                        latitude: a.coord.lat,
                        longitude: a.coord.lon,
                        weather: a.weather[0].main,
                        description: a.weather[0].description,
                        temp_min: {
                            celcius: (a.main.temp_min - 273.15).toFixed(1),
                            farenheit: (9 * (a.main.temp_min - 273.15) / 5 + 32).toFixed(1)
                        },
                        feels_like: {
                            celcius: (a.main.feels_like - 273.15).toFixed(1),
                            farenheit: (9 * (a.main.feels_like - 273.15) / 5 + 32).toFixed(1)
                        },
                        temp_max: {
                            celcius: (a.main.temp_max - 273.15).toFixed(1),
                            farenheit: (9 * (a.main.temp_max - 273.15) / 5 + 32).toFixed(1)
                        }
                    }
                } catch (n) {
                    t = {
                        cityName: `Whoops could not find "${e}"`,
                        latitude: "...",
                        longitude: "...",
                        weather: "...",
                        description: "...",
                        temp_min: {
                            celcius: "...",
                            farenheit: "..."
                        },
                        feels_like: {
                            celcius: "...",
                            farenheit: "..."
                        },
                        temp_max: {
                            celcius: "...",
                            farenheit: "..."
                        }
                    }
                }
                return t
            };
            return {
                getDefaultWeather: () => e("Lagos"),
                getWeather: e,
                getGif: async e => {
                    let t = null;
                    try {
                        const n = await fetch(a + e, {
                            mode: "cors"
                        });
                        t = (await n.json()).data.images.downsized_large.url
                    } catch (e) {
                        const n = await fetch(a + "404 not found", {
                            mode: "cors"
                        });
                        t = (await n.json()).data.images.downsized_large.url
                    }
                    return t
                }
            }
        })(),
        i = {
            searchbutton: () => {
                document.getElementById("search").addEventListener("click", () => {
                    const e = (e => {
                        const t = document.getElementById(e);
                        return t.elements.namedItem("city").value ? t.elements.namedItem("city").value : null
                    })("search-form");
                    e ? l.updateDefaultData(e) : alert("please provide a location")
                })
            },
            tempsButtons: () => {
                const e = document.getElementById("celcius"),
                    t = document.getElementById("farenheit");
                e.addEventListener("click", () => {
                    e.className = "active", t.className = "", document.querySelectorAll("#celcius-temp").forEach(e => {
                        e.className = ""
                    }), document.querySelectorAll("#farenheit-temp").forEach(e => {
                        e.className = "hide"
                    })
                }), t.addEventListener("click", () => {
                    e.className = "", t.className = "active", document.querySelectorAll("#celcius-temp").forEach(e => {
                        e.className = "hide"
                    }), document.querySelectorAll("#farenheit-temp").forEach(e => {
                        e.className = ""
                    })
                })
            }
        },
        r = (e, t = null) => {
            const n = document.createElement("div");
            n.className = "left-side", n.appendChild((() => {
                const e = document.createElement("form");
                e.id = "search-form";
                const t = document.createElement("input");
                t.type = "search", t.name = "city", t.id = "city", t.placeholder = "Enter a city name", e.appendChild(t);
                const n = document.createElement("input");
                return n.type = "button", n.value = "Go", n.id = "search", e.appendChild(n), e
            })());
            const a = document.createElement("div");
            a.className = "weather-info";
            const c = document.createElement("div");
            c.className = "temp-button";
            const i = document.createElement("button");
            i.id = "celcius", i.className = "active", i.innerText = "In Celcius", c.appendChild(i);
            const r = document.createElement("button");
            r.id = "farenheit", r.innerText = "In Farenheit", c.appendChild(r), a.appendChild(c);
            const d = document.createElement("h2");
            d.innerText = e.cityName, a.appendChild(d);
            const l = document.createElement("div");
            l.className = "position";
            const o = document.createElement("div"),
                s = document.createElement("h3");
            s.innerText = "Latitude", o.appendChild(s);
            const m = document.createElement("span");
            m.innerText = e.latitude, o.appendChild(m), l.appendChild(o);
            const p = document.createElement("div"),
                u = document.createElement("h3");
            u.innerText = "Longitude", p.appendChild(u);
            const h = document.createElement("span");
            h.innerText = e.longitude, p.appendChild(h), l.appendChild(p), a.appendChild(l);
            const f = document.createElement("div");
            f.className = "weather";
            const y = document.createElement("h3");
            y.innerText = e.weather, f.appendChild(y);
            const E = document.createElement("q");
            E.innerText = e.description, f.appendChild(E), a.appendChild(f);
            const g = document.createElement("div");
            g.className = "temperatures";
            const C = document.createElement("div"),
                v = document.createElement("h3");
            v.innerText = "Minimum", C.appendChild(v);
            const x = document.createElement("span");
            x.innerHTML = `<span id='celcius-temp'>${e.temp_min.celcius} °C</span>\n  <span id='farenheit-temp' class='hide'>${e.temp_min.farenheit} °F</span>`, C.appendChild(x), g.appendChild(C);
            const b = document.createElement("div"),
                _ = document.createElement("h3");
            _.innerText = "Feels like", b.appendChild(_);
            const w = document.createElement("span");
            w.innerHTML = `<span id='celcius-temp'>${e.feels_like.celcius} °C</span>\n  <span id='farenheit-temp' class='hide'>${e.feels_like.farenheit} °F</span>`, b.appendChild(w), g.appendChild(b);
            const N = document.createElement("div"),
                T = document.createElement("h3");
            T.innerText = "Maximum", N.appendChild(T);
            const k = document.createElement("span");
            k.innerHTML = `<span id='celcius-temp'>${e.temp_max.celcius} °C</span>\n  <span id='farenheit-temp' class='hide'>${e.temp_max.farenheit} °F</span>`, N.appendChild(k), g.appendChild(N), a.appendChild(g), n.appendChild(a);
            const W = document.createElement("div");
            if (W.className = "rigth-side", t) W.style.backgroundImage = `url(${t})`, W.style.backgroundPosition = "center", W.style.backgroundSize = "cover", W.style.backgroundRepeat = "no-repeat";
            else {
                const e = document.createElement("div"),
                    t = document.createElement("h1");
                t.innerText = "Welcome to Weather Now!!", e.appendChild(t);
                const n = document.createElement("h3");
                n.innerText = "Search any city and get informed about the weather at the moment", e.appendChild(n), W.appendChild(e);
                const a = document.createElement("img");
                a.src = "../img/logo.gif", a.alt = "logo", W.appendChild(a)
            }
            return {
                leftWrapper: n,
                rightWrapper: W
            }
        };
    const d = document.querySelector(".container");
    var l = {
        appDefaultDatas: async () => {
            try {
                const e = await c.getDefaultWeather(),
                    t = r(e);
                d.appendChild(t.leftWrapper), d.appendChild(t.rightWrapper), i.searchbutton(), i.tempsButtons()
            } catch (e) {
                alert("We could not load the app, check your network")
            }
        },
        updateDefaultData: async e => {
            try {
                const t = await c.getWeather(e),
                    n = await c.getGif(t.description);
                d.innerHTML = "";
                const a = r(t, n);
                d.appendChild(a.leftWrapper), d.appendChild(a.rightWrapper), i.searchbutton(), i.tempsButtons()
            } catch (e) {
                alert("Sorry, we could not find this city")
            }
        }
    };
    l.appDefaultDatas()
}]);
