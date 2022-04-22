// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { FluteInstrument } from './instruments/Flute';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WaveformVisualizerFlute } from './visualizers/Flute_Waveform';
import { CircleVisualizer } from './visualizers/Circle';
import { KalimbaWaveformVisualizer } from './visualizers/KalimbaWaveform';
import { FlowerVisualizer } from './visualizers/visual_nyan';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, FluteInstrument]);     // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, FlowerVisualizer, KalimbaWaveformVisualizer, CircleVisualizer, WaveformVisualizerFlute ]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});