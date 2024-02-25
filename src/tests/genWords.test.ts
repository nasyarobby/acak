import tap from "tap";
import genWords from "../index.js";

tap.test("Test 001", (t) => {
    const alwaysPick1 = (arr: string[]) => arr[1];
    t.equal(genWords("a|b", {pickerFn: alwaysPick1}), "b", "Pass");
    t.equal(genWords("[a|b]", {pickerFn: alwaysPick1}), "b", "Pass")
    t.equal(genWords("this is [a|b]", {pickerFn: alwaysPick1}), "this is b", "Pass")
    t.equal(genWords("[a|b] [x|y|z]", {pickerFn: alwaysPick1}), "b y", "Pass")
    t.equal(genWords("[a|[x|[x|[x|y|z]|z]|z]]", {pickerFn: alwaysPick1}), "y", "Pass")
    t.equal(genWords("I love [Zelda|Pokemon [blue|red]|Batman] [game|series]", {pickerFn: alwaysPick1}), "I love Pokemon red series", "Pass")
    t.ok(["X", "Y", "Z"].includes(genWords("X|Y|Z")), "OK")
    t.ok(["I love Red X", "I love Blue X", " I love Red Y", "I love Blue X"].includes(genWords("I love [Red|Blue] X")), "OK")

    t.end()
})