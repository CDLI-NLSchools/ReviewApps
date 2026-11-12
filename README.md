# ReviewApps

The unified CDLI review app. One shell serves every course; each course
contributes a bank module under `banks/` and a configuration entry in
`courses.js`. Teachers pick their course at the app address, or arrive on a
course link with the course already selected.

Course links:

- Physics 3204: https://cdli-nlschools.github.io/ReviewApps/?course=physics-3204
- Physics 2204: https://cdli-nlschools.github.io/ReviewApps/?course=physics-2204

The familiar per-course addresses (for example Physics3204Review) forward
to the matching course link, preserving any settings in the original link.
