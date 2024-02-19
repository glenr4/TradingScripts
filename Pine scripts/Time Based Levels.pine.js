// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © glenrutherford4

//@version=5
indicator("Time Based Levels", overlay = true)

extendDailyHighLowLength = input.int(48, "Number bars to extend daily high and low")
dailyHighColour = input.color(color.aqua, "Daily high colour")
dailyLowColour = input.color(color.blue, "Daily low colour")

barCountPerDay = 24*60*60/timeframe.in_seconds()

[dailyHigh, dailyLow] = request.security("","1D", [high, low])

if(ta.change(dailyHigh) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    line.new(x1=bar_index - barCountPerDay, y1=dailyHigh, x2=bar_index+extendDailyHighLowLength, y2=dailyHigh, color= dailyHighColour)

if(ta.change(dailyLow) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    line.new(x1=bar_index - barCountPerDay, y1=dailyLow, x2=bar_index+extendDailyHighLowLength, y2=dailyLow, color= dailyLowColour)
