// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © glenrutherford4

//@version=5
indicator("Time Based Levels", overlay = true, max_lines_count = 500)

extendDailyHighLowDays = input.int(2, "Number of days to extend daily high and low")
dailyHighColour = input.color(color.aqua, "Daily high colour")
dailyLowColour = input.color(color.blue, "Daily low colour")

barCountPerDay = 24*60*60/timeframe.in_seconds()
extendDailyHighLowLength = extendDailyHighLowDays * barCountPerDay
if(extendDailyHighLowLength > 500)
    extendDailyHighLowLength := 500 // TradingView limit of drawing into the future

startingBar = bar_index

[dailyHigh, dailyLow] = request.security("","1D", [high, low], lookahead = barmerge.lookahead_off)

//////////////////////////////
// Extend lines until they are crossed (by close)
// https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html
// https://stackoverflow.com/a/68733918
var line[] dailyHighLowLines = array.new_line(0)

adjustHorizontalLineEnd(_arrayOfLines, stopExtensionOnCloseCross, fixedExtensionLength) =>
    maxLineLength = 1000    // Delete if it gets too long

    int _qtyOfLines = array.size(_arrayOfLines)
    if _qtyOfLines > 0
        for _i = _qtyOfLines - 1 to 0
            line  _currentLine = array.get(_arrayOfLines, _i)
            float _lineLevel   = line.get_price(_currentLine, bar_index)
            
            if stopExtensionOnCloseCross
                bool  _lineCrossed = math.sign(close[1] - _lineLevel) != math.sign(close - _lineLevel) and bar_index != line.get_x1(_currentLine)
                line.set_x2(_currentLine, bar_index)
                if _lineCrossed or bar_index - line.get_x1(_currentLine) > maxLineLength
                    array.remove(_arrayOfLines, _i)

                true    // don't need a return value but this fixes a return type error
            else
                line.set_x2(_currentLine, line.get_x1(_currentLine) + fixedExtensionLength)

                false    // don't need a return value but this fixes a return type error

////////////////////////////

// Add lines 
if(ta.change(dailyHigh) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    array.push(dailyHighLowLines, line.new(x1=startingBar, y1=dailyHigh, x2=bar_index+extendDailyHighLowLength, y2=dailyHigh, color= dailyHighColour))

if(ta.change(dailyLow) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    array.push(dailyHighLowLines, line.new(x1=startingBar, y1=dailyLow, x2=bar_index+extendDailyHighLowLength, y2=dailyLow, color= dailyLowColour))

// Adjust line length of all lines
adjustHorizontalLineEnd(dailyHighLowLines, true, extendDailyHighLowLength)