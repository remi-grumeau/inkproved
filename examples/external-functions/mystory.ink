// Define variables in Ink
VAR _whereAmI = "house"
VAR _day = "noday"
VAR _daytime = ""
VAR _hour = 0
VAR _hourampm = "0AM"
VAR _temperature = 0

// External functions in Javascript you can use in the Ink story
EXTERNAL _getDay()
EXTERNAL _getHour()
EXTERNAL _getDaytime()
EXTERNAL _getTemperature()

EXTERNAL _setPlayerStatus(val)
EXTERNAL _setEffect(effect)

// ADD FALLBACK FUNCTIONS IN CASE YOU USE INKY
INCLUDE fallback_functions.ink


// SET THE DAY FROM EXTERNAL JAVASCRIPT
// IF INSIDE INKY, THE FALLBACK FUNCTION IS USED
~ _day = _getDay()
~ _daytime = _getDaytime()

~ _hour = _getHour()
{
 - _hour>12:
    ~ _hourampm = (_hour-12) + "PM"
 - else:
    ~ _hourampm = _hour + "AM"
}


// START

- Ahhh... what a beautiful day this is!
- I love {_day}, but i feel a bit tired.
- I should go take a nap... even if it's {_hourampm} in the {_daytime}.

~ _setPlayerStatus("standing")

* [Get a nap in the garden] -> GARDEN
* [Stay inside and hit the couch ] -> COUCH

    
=== GARDEN ===
- Hummm... let me check the temperature outside first
~ _setPlayerStatus("checking_temp")
~_getTemperature()
// SINCE TEMPERATURE IS ASKING AN ONLINE SERVER, CALLBACK IS ASYNCHRONOUS, SO ASKING THE USER TO CLICK MIGHT TAKE THE SECOND NEEDED
* Check the thermometer at the window #CLASS: action

- Ahhh... {_temperature}°C, let's kick that hammock for an hour!
~ _whereAmI = "garden"
~ _setPlayerStatus("sleeping")
* [Check temperature again] -> CHECK_TEMP_AGAIN

-> DONE

=== COUCH ===
~ _whereAmI = "couch"
- You're right, blood thirsty midges are all around those days.
~ _setPlayerStatus("sleeping")

-> END


=== WAKEUP ===
~ _setPlayerStatus("awake")
~ _setEffect("shake")
- AH
- What?
- Oh... sorry about that.

-> DONE


=== CHECK_TEMP_AGAIN ===
- Outside temperature now is {_temperature}°C.

-> END