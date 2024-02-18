// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © glenrutherford4

//@version=5
indicator("Time Based Levels", overlay = true)

londonOpenKillZone = time(timeframe.period, '0200-0500', 'UTC-5')

[dailyTimeFrameHigh, dailyTimeFrameLow] = request.security("","1D", [high, low])



plot(dailyTimeFrameHigh)
