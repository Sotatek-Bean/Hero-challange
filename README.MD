For eaiser to understand, i made 1 demo video here:
https://drive.google.com/file/d/1M74bweDVCPdTU-3Y96wGQHs41YvEtfBL/view?usp=sharing

Introduction
  This is a turn-based RPG game that take place in the World of Fantasy.

  Player will buy hero with money given, equip based items then go on fighting with monsters.

  When defeat enemy, they get Money and sometime drop Items.

  Level up, Find better Equipment then become the top leader of Adventurers

Time used: Plan/idea structure designed 1-2 hours, almost 4 days coding with 2-3 hours each.

Total: around 12-15 hours.

Improvements later:
- The system for equipments can be added more than just Armor and Weapon, just add more type then equip by add more key to "equip" in Hero
 eg: equip: { mount: 1, armor: 1, ... }

- Animations can be added easily by add more "AnimationType" and algorithm to the "switch case clause".

- More action to be used by user like: Defend that reduce damage, run away, use items, OR even switch Hero

- A way to automate the system with "paused" already implemented, now just add a way to remember the last choice

- Way to automate level up Hero: after battle end, check if money/exp enough => call "level up"

- Code:
    + the part of Hero and Monster init and update of CanvasService can be more abstract and re-useable for more Entities join in the Fight.
    + setCurrentHero and startBattle in PlayService still have some duplicates.
      Maybe add a new methods to control the process of preparing datas after hero is set.
...
