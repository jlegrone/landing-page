import * as wasm from './header_bg';

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

export function __wbg_new_59cb74e423758ede() {
    return addHeapObject(new Error());
}

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            writeOffset += written;
            if (read === arg.length) {
                break;
            }
            arg = arg.substring(read);
            ptr = wasm.__wbindgen_realloc(ptr, size, size += arg.length * 3);
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

export function __wbg_stack_558ba5917b466edd(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_canvas_CanvasRenderingContext2D(arg0) {

    const val = getObject(arg0).canvas;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_begin_path_CanvasRenderingContext2D(arg0) {
    getObject(arg0).beginPath();
}

export function __widl_f_fill_CanvasRenderingContext2D(arg0) {
    getObject(arg0).fill();
}

export function __widl_f_set_stroke_style_CanvasRenderingContext2D(arg0, arg1) {
    getObject(arg0).strokeStyle = getObject(arg1);
}

export function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

export function __widl_f_arc_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4, arg5, exnptr) {
    try {
        getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_clear_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
}

export function __widl_f_width_HTMLCanvasElement(arg0) {
    return getObject(arg0).width;
}

export function __widl_f_height_HTMLCanvasElement(arg0) {
    return getObject(arg0).height;
}

export function __wbg_random_58bd29ed438c19c0() {
    return Math.random();
}

export function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

export function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

function freeMouseState(ptr) {

    wasm.__wbg_mousestate_free(ptr);
}
/**
*/
export class MouseState {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeMouseState(ptr);
    }

    /**
    * @returns {number}
    */
    get x() {
        return wasm.__wbg_get_mousestate_x(this.ptr);
    }
    set x(arg0) {
        return wasm.__wbg_set_mousestate_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        return wasm.__wbg_get_mousestate_y(this.ptr);
    }
    set y(arg0) {
        return wasm.__wbg_set_mousestate_y(this.ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get down() {
        return (wasm.__wbg_get_mousestate_down(this.ptr)) !== 0;
    }
    set down(arg0) {
        return wasm.__wbg_set_mousestate_down(this.ptr, arg0);
    }
    /**
    * @returns {}
    */
    constructor() {
        this.ptr = wasm.mousestate_new();
    }
}

function freeSimulation(ptr) {

    wasm.__wbg_simulation_free(ptr);
}
/**
*/
export class Simulation {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeSimulation(ptr);
    }

    /**
    * @param {any} context
    * @param {number} particle_count
    * @param {number} acceleration_multiplier
    * @param {number} effect_distance
    * @returns {}
    */
    constructor(context, particle_count, acceleration_multiplier, effect_distance) {
        this.ptr = wasm.simulation_new(addHeapObject(context), particle_count, acceleration_multiplier, effect_distance);
    }
    /**
    * @param {number} canvas_width
    * @param {number} canvas_height
    * @param {MouseState} mouse
    * @returns {void}
    */
    draw(canvas_width, canvas_height, mouse) {
        return wasm.simulation_draw(this.ptr, canvas_width, canvas_height, mouse.ptr);
    }
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

