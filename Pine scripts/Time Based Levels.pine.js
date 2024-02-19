// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © glenrutherford4

//@version=5
indicator("Time Based Levels", overlay = true)

extendDailyHighLowDays = input.int(2, "Number of days to extend daily high and low")
dailyHighColour = input.color(color.aqua, "Daily high colour")
dailyLowColour = input.color(color.blue, "Daily low colour")
drawFromDayOfHighLow = input.bool(false, "Draw from day of high/low?")

barCountPerDay = 24*60*60/timeframe.in_seconds()
extendDailyHighLowLength = extendDailyHighLowDays * barCountPerDay
if(extendDailyHighLowLength > 500)
    extendDailyHighLowLength := 500 // TradingView limit of drawing into the future

startingBar = bar_index
if(drawFromDayOfHighLow)
    startingBar := bar_index - barCountPerDay
    

[dailyHigh, dailyLow] = request.security("","1D", [high, low])

if(ta.change(dailyHigh) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    line.new(x1=startingBar, y1=dailyHigh, x2=bar_index+extendDailyHighLowLength, y2=dailyHigh, color= dailyHighColour)

if(ta.change(dailyLow) and not barstate.islast) // does not draw for the current bar until it is closed ie not last
    line.new(x1=startingBar, y1=dailyLow, x2=bar_index+extendDailyHighLowLength, y2=dailyLow, color= dailyLowColour)
