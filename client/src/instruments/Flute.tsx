// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { useEffect } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

/** ------------------------------------------------------------------------ **
 * References:
 * https://tonejs.github.io/docs/14.7.77/Synth.html
 *
 */
/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function FluteKey({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease("+0.30")} // Question: what is `onMouseUp`?
      className={classNames("ba pointer absolute dim", {
        'black bg-medium-gray h4': note,
      })}
      style={{
        // top: 0,
        // left: `${index * 2}rem`,
        // zIndex: minor ? 1 : 0,
        // width: minor ? '1.5rem' : '2rem',
        // marginLeft: minor ? '0.25rem' : 0,

        top: 0,
        left: `${index * 5}rem`,
        zIndex: 0,
        width: '2rem',
        marginLeft: 25,
        height: 30,
        borderRadius: 50,
        backgroundColor: "black",
      }}
    ></div>
  );
}

// eslint-disable-next-line
function FluteKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    "div",
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`, "8n"),
      onMouseUp: () => synth?.triggerRelease("+0.30"),
      className: classNames("ba pointer absolute dim flute", {
        "black bg-medium-gray h4": note,
      }),
      style: {
        // top: 0,
        // left: `${index * 2}rem`,
        // zIndex: minor ? 1 : 0,
        // width: minor ? "1.5rem" : "2rem",
        // marginLeft: minor ? "0.25rem" : 0,
     
        top: 0,
        left: `${index * 5}rem`,
        zIndex: 0,
        width: '2rem',
        marginLeft: 3,
        height: 30,
        borderRadius: 50,
        backgroundColor: "black",
        
      },
    },
    []
  );
}


// Flute type -> 
function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "dim pointer ph2 pv1 ba mr2 br1 fw7 fluteOscillatorBtns",
        {
          //CSS for buttons
          "b--black black ": active,
          "gray b--light-gray": !active,
        }
      )}
    >
      {title}
    </div>
  );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: "C", idx: 0 },
    { note: "Db", idx: 0.5 },
    { note: "D", idx: 1 },
    { note: "Eb", idx: 1.5 },
    { note: "E", idx: 2 },
    { note: "F", idx: 3 },
    { note: "Gb", idx: 3.5 },
    { note: "G", idx: 4 },
    { note: "Ab", idx: 4.5 },
    { note: "A", idx: 5 },
    { note: "Bb", idx: 5.5 },
    { note: "B", idx: 6 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();
      return new Tone.Synth({
        volume: 4,
        portamento: 0,
        detune: 0,
        envelope: {
          attack: 5,  //The shape of the attack (not sin, starts off too quiet.)
          attackCurve: "cosine",
          decay: 1,
          decayCurve: "exponential", //The shape of the decay "exponential" like a flute (air cut off)
          release: 5,
          releaseCurve: "exponential", 
          sustain: 0,
        },
        oscillator: {
          type: "fatcustom",
          // The first harmonic is the fundamental frequency, the second is the octave 
          // and so on following the harmonic series.
          // 1, 0.2, 0.01 Sounds like Bass Clarinet (smaller the number the higher it sounds)
          // Need to go up for flute
          partials: [0.000000007, 0.00007777, 0.0077, 1.5],
          phase: 3,
          /*The detune spread between the oscillators. If "count" is set to 3 oscillators and the "spread" 
            is set to 40, the three oscillators would be detuned like this: [-20, 0, 20] for a total detune spread 
            of 40 cents.*/
          spread: 1,
        },
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sine10',
    'amsine10',
    'fmsawtooth3',
    'sawtooth',
    'square',
    'triangle',
    'amtriangle10',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4" id="flute">
      <div className="relative h4 w-100 ml4">
        {Range(2, 5).map(
          (
            octave // Flute only has 3 octaves
          ) =>
            keys.map((key) => {
              const isMinor = key.note.indexOf("b") !== -1;
              const note = `${key.note}${octave}`;
              return (
                <FluteKey
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  octave={octave}
                  index={(octave - 2) * 7 + key.idx}
                />
              );
            })
        )}
      </div>
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <PianoType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
      {/* <div className="pv6" id="flute">

      
      </div> */}
    </div>
  );
}

export const FluteInstrument = new Instrument("Flute", Flute);
