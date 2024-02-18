// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © glenrutherford4

//@version=5
indicator("Time Based Levels", overlay = true)

plotPastDayHighLowCount = input.int(5, "Number of past days highs and lows to plot")

// Do I even need this when I can use LuxAlgo's ICT Killzones indicator?
// londonOpenKillZone = time(timeframe.period, '0200-0500', 'UTC-5')
// plot(londonOpenKillZone)


[dailyTimeFrameHigh, dailyTimeFrameLow] = request.security("","1D", [high, low])

// How to get bar_index for start of each day?
// https://www.tradingcode.net/tradingview/daily-high-low-boxes/
// https://www.tradingcode.net/tradingview/session-high-low-box/
// line.new(x1=bar_index, y1=open, x2=bar_index+lineLength, y2=open, color= color.blue)


plot(dailyTimeFrameHigh)
plot(dailyTimeFrameLow)
