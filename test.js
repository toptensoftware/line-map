import { strict as assert } from "node:assert";
import { test } from "node:test";
import { LineMap } from "./LineMap.js";



test("exact", () => {

    // NB: different line end formats
    let text = `Line 0\r\nLine 1\nLine 2\rLine 3`;

    let lm = new LineMap(text);

    // Check edge conditions
    assert.equal(lm.toOffset(0, 0), 0);   // start of first line
    assert.equal(lm.toOffset(0, 6), 6);   // end of first line
    assert.equal(lm.toOffset(1, 0), 8);   // start of second line
    assert.equal(lm.toOffset(1, 6), 14);  // end of second line
    assert.equal(lm.toOffset(2, 0), 15);  // start of third line
    assert.equal(lm.toOffset(3, 0), 22);  // start of third line

    assert.equal(lm.toOffset(100, 0), text.length);  // Past last line

    // Check all positions convert both ways
    for (let i=0; i<test.length + 1; i++)
    {
        let lp = lm.fromOffset(i);
        let ofs = lm.toOffset(lp);
        assert.equal(ofs, i);
    }

});