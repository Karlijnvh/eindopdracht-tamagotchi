input.onButtonPressed(Button.A, function () {
    if (Toestand == 2) {
        Toestand = 1
        Timer = input.runningTime() + 5000
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else if (Toestand == 1) {
        Toestand = 4
        Timer = input.runningTime() + 8000
    }
})
input.onGesture(Gesture.Shake, function () {
    if (Toestand == 4) {
        Timer = Timer / 2
    }
})
let Timer = 0
let Toestand = 0
Toestand = 1
pins.digitalWritePin(DigitalPin.P2, 1)
Timer = input.runningTime() + 5000
basic.forever(function () {
    if (Toestand == 1) {
        music.stopAllSounds()
        if (input.runningTime() >= Timer) {
            Toestand = 2
        }
    }
    if (Toestand == 2) {
        Timer = 0
        music.play(music.tonePlayable(294, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
        music.rest(music.beat(BeatFraction.Whole))
    }
    if (Toestand == 4) {
        pins.analogWritePin(AnalogPin.P2, 470)
        if (input.runningTime() >= Timer) {
            Toestand = 1
        }
    }
})
