import { binarySearch } from "@toptensoftware/binary-search";

/**
 * @typedef {object} LineColumn
 * @property {number} line A line number
 * @property {number} column A column number
 */

/**
 * Implements line/column to offset index mapping
 * for a string
 */
export class LineMap
{
    /**
     * Constructs a new LineMap
     * @param {string} str The string to be mapped
     * @param {object} options Options
     * @param {number} options.lineBase Base index for line numbers (default = 0)
     * @param {number} options.columnBase Base index for column numbers (default = 0)
     */
    constructor(str, options)
    {
        // Store the total length
        this.totalLength = str.length;

        this.options = Object.assign({
            lineBase: 0,
            columnBase: 0,
        }, options);

        // Build a list of the offsets at the start of all lines
        this.lineOffsets = [ 0 ];
        for (let i = 0; i < str.length; i++)
        {
            if (str[i] == '\r' && i + 1 < str.length && str[i + 1] == '\n')
                i++;

            if (str[i] == '\n' || str[i] == '\r')
            {
                this.lineOffsets.push(i + 1);
            }
        }
    }

    /**
     * Converts a character index offset to a line/column position
     * @param {number} offset The character index to convert
     * @returns {LineColumn}
     */
    fromOffset(offset)
    {
        // Do a binary search for the line
        let lineNumber = binarySearch(this.lineOffsets, (a, b) => a - b, offset);
        if (lineNumber < 0)
            lineNumber = (-lineNumber-1);
        else
            lineNumber++;

        if (lineNumber < this.lineOffsets.length)
        {
            return { 
                line: this.options.lineBase + lineNumber - 1, 
                column: this.options.columnBase + offset - this.lineOffsets[lineNumber - 1] 
            }
        }
        else
        {
            return {
                line: this.options.lineBase + this.lineOffsets.length - 1,
                column: this.options.columnBase + offset - this.lineOffsets[this.lineOffsets.length-1],
            }
        }
    }

    /**
     * Converts a line and column number to a character index
     * @param {number | LineColumn} line A LineColumn or line number
     * @param {number} [column] The column number if first parameter is a line number
     * @returns {number}
     */
    toOffset(line, column)
    {
        if (line.line !== undefined)
        {
            column = line.column;
            line = line.line;
        }
        line -= this.options.lineBase;
        column -= this.options.columnBase;
        if (line > this.lineOffsets.length)
            return this.totalLength;
        let offset = this.lineOffsets[line] + column;
        if (offset > this.totalLength)
            offset = this.totalLength;
        return offset;
    }
}
