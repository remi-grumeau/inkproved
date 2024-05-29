// Define variables in Ink
VAR _whereAmI = "house"
VAR _day = "not_a_day"
VAR _daytime = "no_day_time"
VAR _temperature = 0


// START

- Ahhh... what a beautiful {_daytime} this is!
- I love {_day}, but i feel a bit tired.
- I should go take a nap...

* [Get a nap in the garden] -> GARDEN
* [Stay inside and nap on the couch ] -> COUCH

    
=== GARDEN ===
- Hummm...
- Let's check the temperature outside first
- ...
- Ahhh... {_temperature}°C
- Fine, let's kick that hammock for an hour!
~ _whereAmI = "garden"
* [Check temperature again] -> CHECK_TEMP_AGAIN

-> DONE

=== COUCH ===
~ _whereAmI = "couch"
- You're right, blood thirsty midges are all around those days.

-> END

=== CHECK_TEMP_AGAIN ===
- Outside temperature now seems to be {_temperature}°C.

-> END