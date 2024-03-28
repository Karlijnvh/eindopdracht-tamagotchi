input.onButtonPressed(Button.A, function () {
    if (Toestand == 1) {
        Toestand = 4
        Timer = input.runningTime() + 8000
    } else if (Toestand == 2) {
        Toestand = 1
        Timer = input.runningTime() + 5000
        pins.digitalWritePin(DigitalPin.P2, 1)
        music.stopAllSounds()
    }
})
input.onGesture(Gesture.Shake, function () {
    if (Toestand == 4) {
        Timer = Timer / 2
    }
})
input.onButtonPressed(Button.B, function () {
    if (Toestand == 4) {
        Toestand = 1
        Timer = input.runningTime() + 5000
    }
})
let Timer = 0
let Toestand = 0
Toestand = 1
Timer = input.runningTime() + 5000
music.setBuiltInSpeakerEnabled(false)
let kompaswaarde = input.compassHeading()
basic.forever(function () {
    if (Toestand == 1) {
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P2, 1)
        if (input.runningTime() >= Timer) {
            Toestand = 2
            Timer = input.runningTime() + 4000
        }
    } else if (Toestand == 2) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
        basic.pause(500)
        pins.analogWritePin(AnalogPin.P2, 1023)
        basic.pause(500)
        pins.analogWritePin(AnalogPin.P2, 0)
        if (input.runningTime() >= Timer) {
            Toestand = 3
            music.stopAllSounds()
            kompaswaarde = input.compassHeading()
        }
    } else if (Toestand == 3) {
        pins.analogWritePin(AnalogPin.P2, 0)
        music.play(music.stringPlayable("E D C C E D C D ", 67), music.PlaybackMode.LoopingInBackground)
        basic.showNumber(input.compassHeading())
        if (input.compassHeading() == kompaswaarde - 45) {
            Toestand = 5
            Timer = input.runningTime() + 6000
        }
    } else if (Toestand == 4) {
        music.stopAllSounds()
        pins.analogWritePin(AnalogPin.P2, 289)
        if (input.runningTime() >= Timer) {
            Toestand = 1
            Timer = input.runningTime() + 5000
        }
    } else if (Toestand == 5) {
        if (input.compassHeading() < kompaswaarde - 55 || input.compassHeading() < kompaswaarde - 35) {
            Timer = input.runningTime() + 6000
        }
        if (input.runningTime() >= Timer) {
            music.stopAllSounds()
            Toestand = 1
            Timer = input.runningTime() + 5000
        }
    }
})
