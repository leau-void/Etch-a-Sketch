Live : https://leau-void.github.io/etch-a-sketch/
with code before.

here is a live Repl.it with the changes : https://replit.com/@leauvoid/refac-etch-help#script.js
--See at the initial scale of the grid 16x16 the Alternating rainbow works well, with the 6 colors alternating, but when switching any other grid density, the Rainbow color and the gray scale stop working, as if multiple instaces of the function runs at each trigger, and this problem appeared only as I changed from having an event listener on every cell to having an event listener on the Grid Container and passing the function event.target.
I also noticed I had to use mouseover, which could cause this problem (I had mouseenter before switching the event listenenrs.) I could not get mouseenter or mouseleave to work, even if in the documentation I couldn't find any mention of it not working on children elements(I read the exact opposite actually.)

This is my Etch-a-Sketch project, completed as part of The Odin Project's Foundations.

It is optimised for mouse users and preferably for landscape mode screens, but can be used with any screen.

The project goal was to practice DOM manipulation, and as so I got to think a lot about how to achieve what I had in mind.

I feel more familiar with Event Listeners and with DOM manipulation, although I still have a lot to learn. I plan on revisiting this project later on, to see how I could make the Scripts better.

Refactoring the code a little bit, changed from multiple Event Listeners to an Event Delegation model, both for the grid cells, the buttons, and the range slider options.

Also changed these funtions for switch statements for readability.