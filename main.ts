input.onButtonPressed(Button.A, function () {
    if (Toestand == 1) {
        Toestand = 4
        TimerMoe = input.runningTime() + 8000
    } else if (Toestand == 2) {
        Toestand = 1
        TimerHonger = input.runningTime() + 5000
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (Toestand == 4) {
        TimerMoe = TimerMoe / 2
    }
})
input.onButtonPressed(Button.B, function () {
    if (Toestand == 4) {
        Toestand = 1
    }
})
let TimerGedraaid = 0
let TimerComa = 0
let TimerMoe = 0
let TimerHonger = 0
let Toestand = 0
Toestand = 1
pins.digitalWritePin(DigitalPin.P2, 1)
TimerHonger = input.runningTime() + 5000
loops.everyInterval(500, function () {
    if (Toestand == 2) {
        pins.analogWritePin(AnalogPin.P2, 1023)
        basic.pause(500)
        pins.analogWritePin(AnalogPin.P2, 0)
        basic.pause(500)
    }
})
basic.forever(function () {
    if (Toestand == 1) {
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P2, 1)
        if (input.runningTime() >= TimerHonger) {
            Toestand = 2
            TimerComa = input.runningTime() + 4000
        }
    } else if (Toestand == 2) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
        music.rest(music.beat(BeatFraction.Whole))
        if (input.runningTime() >= TimerComa) {
            Toestand = 3
            music.stopAllSounds()
        }
    } else if (Toestand == 3) {
        pins.analogWritePin(AnalogPin.P2, 0)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
        if (input.rotation(Rotation.Pitch) == 45) {
            Toestand = 5
            TimerGedraaid = input.runningTime() + 6000
        }
    } else if (Toestand == 4) {
        music.stopAllSounds()
        pins.analogWritePin(AnalogPin.P2, 470)
        if (input.runningTime() >= TimerMoe) {
            Toestand = 1
            TimerHonger = input.runningTime() + 5000
        }
    } else if (Toestand == 5) {
        if (input.rotation(Rotation.Pitch) != 45) {
            Toestand = 3
        }
        if (input.runningTime() >= TimerComa) {
            Toestand = 1
            TimerHonger = input.runningTime() + 5000
        }
    }
})
