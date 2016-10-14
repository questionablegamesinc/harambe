/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __spr_block() { 
__sprite_init__(this, spr_block, 64, 64, 0, 0, 'Box', 32, 0, 64, 0, 64, ['img/spr_block_0.png']);
}; var spr_block = new __spr_block();

function __spr_child_flying() { 
__sprite_init__(this, spr_child_flying, 32, 32, 16, 16, 'Circle', 16, 0, 32, 0, 32, ['img/spr_child_flying_0.png','img/spr_child_flying_1.png','img/spr_child_flying_2.png','img/spr_child_flying_3.png','img/spr_child_flying_4.png','img/spr_child_flying_5.png','img/spr_child_flying_6.png','img/spr_child_flying_7.png','img/spr_child_flying_8.png','img/spr_child_flying_9.png','img/spr_child_flying_10.png','img/spr_child_flying_11.png']);
}; var spr_child_flying = new __spr_child_flying();

function __spr_child_launched() { 
__sprite_init__(this, spr_child_launched, 26, 24, 13, 12, 'Circle', 13, 0, 26, 0, 24, ['img/spr_child_launched_0.png','img/spr_child_launched_1.png','img/spr_child_launched_2.png','img/spr_child_launched_3.png','img/spr_child_launched_4.png','img/spr_child_launched_5.png','img/spr_child_launched_6.png','img/spr_child_launched_7.png','img/spr_child_launched_8.png','img/spr_child_launched_9.png','img/spr_child_launched_10.png','img/spr_child_launched_11.png','img/spr_child_launched_12.png','img/spr_child_launched_13.png','img/spr_child_launched_14.png','img/spr_child_launched_15.png','img/spr_child_launched_16.png','img/spr_child_launched_17.png','img/spr_child_launched_18.png','img/spr_child_launched_19.png','img/spr_child_launched_20.png','img/spr_child_launched_21.png']);
}; var spr_child_launched = new __spr_child_launched();

function __spr_child_launching() { 
__sprite_init__(this, spr_child_launching, 24, 24, 12, 12, 'Box', 12, 0, 24, 0, 24, ['img/spr_child_launching_0.png','img/spr_child_launching_1.png']);
}; var spr_child_launching = new __spr_child_launching();

function __spr_child_walk() { 
__sprite_init__(this, spr_child_walk, 26, 24, 13, 12, 'Circle', 13, 0, 26, 0, 24, ['img/spr_child_walk_0.png','img/spr_child_walk_1.png','img/spr_child_walk_2.png','img/spr_child_walk_3.png','img/spr_child_walk_4.png','img/spr_child_walk_5.png','img/spr_child_walk_6.png','img/spr_child_walk_7.png','img/spr_child_walk_8.png']);
}; var spr_child_walk = new __spr_child_walk();

function __spr_crosshair() { 
__sprite_init__(this, spr_crosshair, 16, 16, 8, 8, 'Box', 8, 0, 16, 0, 16, ['img/spr_crosshair_0.png']);
}; var spr_crosshair = new __spr_crosshair();

function __spr_food() { 
__sprite_init__(this, spr_food, 32, 32, 16, 16, 'Circle', 16, 0, 32, 0, 32, ['img/spr_food_0.png','img/spr_food_1.png','img/spr_food_2.png','img/spr_food_3.png','img/spr_food_4.png','img/spr_food_5.png','img/spr_food_6.png','img/spr_food_7.png','img/spr_food_8.png','img/spr_food_9.png','img/spr_food_10.png','img/spr_food_11.png','img/spr_food_12.png','img/spr_food_13.png','img/spr_food_14.png','img/spr_food_15.png']);
}; var spr_food = new __spr_food();

function __spr_harambe_dead() { 
__sprite_init__(this, spr_harambe_dead, 80, 74, 40, 37, 'Circle', 32, 0, 80, 0, 74, ['img/spr_harambe_dead_0.png','img/spr_harambe_dead_1.png','img/spr_harambe_dead_2.png']);
}; var spr_harambe_dead = new __spr_harambe_dead();

function __spr_harambe_hit_chest() { 
__sprite_init__(this, spr_harambe_hit_chest, 59, 64, 29, 32, 'Circle', 29, 0, 59, 0, 64, ['img/spr_harambe_hit_chest_0.png','img/spr_harambe_hit_chest_1.png']);
}; var spr_harambe_hit_chest = new __spr_harambe_hit_chest();

function __spr_harambe_hit_face() { 
__sprite_init__(this, spr_harambe_hit_face, 64, 60, 32, 30, 'Circle', 32, 0, 64, 0, 60, ['img/spr_harambe_hit_face_0.png','img/spr_harambe_hit_face_1.png']);
}; var spr_harambe_hit_face = new __spr_harambe_hit_face();

function __spr_harambe_hit_head() { 
__sprite_init__(this, spr_harambe_hit_head, 78, 65, 39, 32, 'Circle', 32, 0, 78, 0, 65, ['img/spr_harambe_hit_head_0.png','img/spr_harambe_hit_head_1.png','img/spr_harambe_hit_head_2.png','img/spr_harambe_hit_head_3.png']);
}; var spr_harambe_hit_head = new __spr_harambe_hit_head();

function __spr_harambe_punch_left() { 
__sprite_init__(this, spr_harambe_punch_left, 90, 64, 45, 32, 'Circle', 32, 0, 90, 0, 64, ['img/spr_harambe_punch_left_0.png','img/spr_harambe_punch_left_1.png','img/spr_harambe_punch_left_2.png']);
}; var spr_harambe_punch_left = new __spr_harambe_punch_left();

function __spr_harambe_punch_right() { 
__sprite_init__(this, spr_harambe_punch_right, 90, 57, 45, 28, 'Circle', 32, 0, 90, 0, 57, ['img/spr_harambe_punch_right_0.png','img/spr_harambe_punch_right_1.png','img/spr_harambe_punch_right_2.png','img/spr_harambe_punch_right_3.png']);
}; var spr_harambe_punch_right = new __spr_harambe_punch_right();

function __spr_harambe_run() { 
__sprite_init__(this, spr_harambe_run, 78, 64, 39, 32, 'Circle', 30, 8, 68, 10, 68, ['img/spr_harambe_run_0.png','img/spr_harambe_run_1.png','img/spr_harambe_run_2.png','img/spr_harambe_run_3.png','img/spr_harambe_run_4.png','img/spr_harambe_run_5.png','img/spr_harambe_run_6.png','img/spr_harambe_run_7.png','img/spr_harambe_run_8.png']);
}; var spr_harambe_run = new __spr_harambe_run();

function __spr_harambe_stand() { 
__sprite_init__(this, spr_harambe_stand, 78, 64, 39, 32, 'Circle', 30, 12, 68, 8, 64, ['img/spr_harambe_stand_0.png','img/spr_harambe_stand_1.png','img/spr_harambe_stand_2.png','img/spr_harambe_stand_3.png','img/spr_harambe_stand_4.png','img/spr_harambe_stand_5.png','img/spr_harambe_stand_6.png','img/spr_harambe_stand_7.png']);
}; var spr_harambe_stand = new __spr_harambe_stand();

function __spr_harambe_walk() { 
__sprite_init__(this, spr_harambe_walk, 78, 64, 39, 32, 'Circle', 30, 0, 78, 0, 64, ['img/spr_harambe_walk_0.png','img/spr_harambe_walk_1.png','img/spr_harambe_walk_2.png','img/spr_harambe_walk_3.png','img/spr_harambe_walk_4.png','img/spr_harambe_walk_5.png','img/spr_harambe_walk_6.png','img/spr_harambe_walk_7.png','img/spr_harambe_walk_8.png','img/spr_harambe_walk_9.png']);
}; var spr_harambe_walk = new __spr_harambe_walk();

function __spr_shadow() { 
__sprite_init__(this, spr_shadow, 21, 11, 10, 5, 'Box', 10, 0, 21, 0, 11, ['img/spr_shadow_0.png']);
}; var spr_shadow = new __spr_shadow();

function __spr_swat_shoot() { 
__sprite_init__(this, spr_swat_shoot, 32, 48, 16, 24, 'Box', 16, 0, 32, 0, 48, ['img/spr_swat_shoot_0.png','img/spr_swat_shoot_1.png','img/spr_swat_shoot_2.png','img/spr_swat_shoot_3.png']);
}; var spr_swat_shoot = new __spr_swat_shoot();

function __spr_swat_stand() { 
__sprite_init__(this, spr_swat_stand, 32, 48, 16, 24, 'Box', 16, 0, 32, 0, 48, ['img/spr_swat_stand_0.png','img/spr_swat_stand_1.png','img/spr_swat_stand_2.png','img/spr_swat_stand_3.png']);
}; var spr_swat_stand = new __spr_swat_stand();

function __spr_target() { 
__sprite_init__(this, spr_target, 8, 8, 4, 4, 'Box', 4, 0, 8, 0, 8, ['img/spr_target_0.png']);
}; var spr_target = new __spr_target();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __blow() { 
__audio_init__(this, blow, 'aud/blow.wav', '', '');
}; var blow = new __blow();



/***********************************************************************
 * MUSICS
 ***********************************************************************/
function __snd_bg_voices() { 
__audio_init__(this, snd_bg_voices, '', '', 'aud/bg_voices.ogg');
}; var snd_bg_voices = new __snd_bg_voices();



/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/


/***********************************************************************
 * FONTS
 ***********************************************************************/
function __courier12() { 
__font_init__(this, courier12, 'courier', 12, 0, 0)}; var courier12 = new __courier12();

function __courier13() { 
__font_init__(this, courier13, 'courier', 13, 0, 0)}; var courier13 = new __courier13();

function __generic() { 
__font_init__(this, generic, 'courier', 20, 0, 0)}; var generic = new __generic();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __GOD() {
__instance_init__(this, GOD, null, 1, -9999, null, 1, 1);
this.on_creation = function() {
with(this) {
global.LOG = true;
//global.WIDTH = Math.floor(Math.min(room_width, room_height)/24);
global.WIDTH = Math.floor(room_width/24);
global.HEIGHT = Math.floor(room_height/24);
log("global.WIDTH = " + global.WIDTH);
log("global.HEIGHT = " + global.HEIGHT);
global.GOD = this;
global.harambe = instance_create(room_width/2, room_height/2, harambe);

this.score = 0;
this.level = 1;

/*
for(var xx=global.WIDTH; xx<room_width-global.WIDTH; xx+=global.WIDTH) {
	instance_create(xx, global.WIDTH, block);
	instance_create(xx, room_height-global.HEIGHT, block);
}
for(var yy=global.HEIGHT; yy<room_height-global.HEIGHT; yy+=global.HEIGHT) {
	instance_create(0, yy, block);
	instance_create(room_width-global.WIDTH, yy, block);
}
*/
// child creation
var interval_child_time = 1;
function interval_child() {
	setTimeout(function() {
		var rnd = Math.random();
		var _child = null;
		if (rnd < 0.25) { // left
			_child = instance_create(global.WIDTH/2,
						global.WIDTH+Math.random()*(room_height-global.WIDTH),
						child);
		} else if (rnd < 0.5) { // up
			_child = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
						global.WIDTH/2,
						child);
		} else if (rnd < 0.75) { // right
			_child = instance_create(room_width-global.WIDTH/2,
						global.WIDTH+Math.random()*(room_height-global.WIDTH),
						child);
		} else { // down
			_child = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
						room_height-global.WIDTH/2,
						child);	
		}
		_child.goto_x = global.WIDTH+Math.random()*(room_width-global.WIDTH *2);
		_child.goto_y = global.WIDTH+Math.random()*(room_height-global.WIDTH *2);
		_child._speed = global.WIDTH/4 + Math.random()*global.WIDTH/4;
		interval_child_time = 10000/Math.log(3+global.GOD.level)
					- (instance_number(enemy)-instance_number(child))*1000
					+ 2500*Math.random()/Math.log(3+global.GOD.level);
		interval_child();
	}, interval_child_time);
}
interval_child();
// enemy creation
this.interval_soldier = setInterval(function() {
	var rnd = Math.random();
	var e;
	if (rnd < 0.25) { // left
		e = instance_create(global.WIDTH/2,
			global.HEIGHT+Math.random()*(room_height-global.HEIGHT),
			enemy)
		e._direction = 2;
	} else if (rnd < 0.5) { // up
		e = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
			global.HEIGHT/2,
			enemy);
		e._direction = 0;
	} else if (rnd < 0.75) { // right
		e = instance_create(room_width-global.WIDTH/2,
			global.HEIGHT+Math.random()*(room_height-global.HEIGHT),
			enemy);
		e._direction = 1;
	} else { // down
		e = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
			room_height-global.HEIGHT/2,
			enemy);
		e._direction = 3;
	}
}, 20000/Math.log(3+this.level) + 10000*Math.random()/Math.log(3+this.level));

// food creation
this.interval_food = setInterval(function() {
	var rnd = Math.random();
	var _food = null;
	if (rnd < 0.25) { // left
		_food = instance_create(global.WIDTH/2,
					global.WIDTH+Math.random()*(room_height-global.WIDTH),
					food);
	} else if (rnd < 0.5) { // up
		_food = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
					global.WIDTH/2,
					food);
	} else if (rnd < 0.75) { // right
		_food = instance_create(room_width-global.WIDTH/2,
					global.WIDTH+Math.random()*(room_height-global.WIDTH),
					food);
	} else { // down
		_food = instance_create(global.WIDTH+Math.random()*(room_width-global.WIDTH),
					room_height-global.WIDTH/2,
					food);	
	}
	_food.type = Math.floor(Math.random()*12);
	_food.goto_x = global.WIDTH+Math.random()*(room_width-global.WIDTH *2);
	_food.goto_y = global.WIDTH+Math.random()*(room_height-global.WIDTH *2);
	_food._speed = global.WIDTH/4 + Math.random()*global.WIDTH/4;
}, 30000 + 15000*Math.random());

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
// this.level = 1 + Math.floor(Math.log(1+this.score/10)); LOGARITHMIC
this.level = 1 + Math.floor(score/1000);
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(0, 0, 0);
draw_set_linewidth(global.WIDTH/20);
draw_rectangle(global.WIDTH, global.HEIGHT, room_width-global.WIDTH, room_height-global.HEIGHT, true);
/*if (global.harambe.load > 0) {
	draw_set_color(128, 0, 0);
	draw_set_linewidth(global.harambe.load *1/global.WIDTH);
	draw_line(mouse_x, mouse_y, global.harambe.x, global.harambe.y);
}*/
if (global.harambe.show_hp) {
	draw_set_color(0, 0, 0);
	draw_rectangle(global.harambe.x -global.WIDTH,
				global.harambe.y -global.HEIGHT*2,
				global.harambe.x -global.WIDTH + 100 *global.WIDTH/48,
				global.harambe.y -global.HEIGHT*1.8,
				false);
	draw_set_color(255 - Math.floor(global.harambe.hp*2.55),
		Math.floor(global.harambe.hp*2.55),
		0);
	draw_set_linewidth(1);
	draw_rectangle(global.harambe.x -global.WIDTH,
				global.harambe.y -global.HEIGHT*2,
				global.harambe.x -global.WIDTH + global.harambe.hp *global.WIDTH/48,
				global.harambe.y -global.HEIGHT*1.8,
				false);
	draw_set_color(255, 255, 255);
	draw_rectangle(global.harambe.x -global.WIDTH,
				global.harambe.y -global.HEIGHT*2,
				global.harambe.x -global.WIDTH + global.harambe.hp *global.WIDTH/48,
				global.harambe.y -global.HEIGHT*1.8,
				true);
}

/*draw_set_color(0, 0, 0);
draw_sprite_ext(this.harambe.sprite_index,
			this.harambe.image_index,
			this.harambe.x,
			this.harambe.y + 32,
			this.harambe.image_xscale,
			this.harambe.image_yscale /3,
			this.harambe.image_angle,
			this.harambe.image_alpha);*/
/*
draw_bold_text(16, 16, "HEALTH");
draw_bold_text(room_width/2-16, 16, "POWER-UP");
draw_bold_text(room_width/2 -global.WIDTH/2, global.WIDTH/2, "SCORE: " + this.score);
*/
draw_bold_text(global.WIDTH*2, global.HEIGHT/2, "LEVEL: " + this.level);
}
}
};
}; var GOD = new __GOD();

function __harambe() {
__instance_init__(this, harambe, null, 1, 0, spr_harambe_run, 1, 2);
this.on_creation = function() {
with(this) {
set_image_scale(this, 4);
this.image_speed = 0;

this.hp = 100;
this.load = 0;
this.goto_x = 0;
this.goto_y = 0;
this.max_speed = global.WIDTH;
this.friction = 0;
this.show_hp = false;

this.lbound = global.WIDTH+sprite_index.width*image_xscale/3;
this.rbound = room_width-global.WIDTH-sprite_index.width*image_xscale/3;
this.ubound = global.HEIGHT/2;
this.dbound = room_height-global.HEIGHT-sprite_index.height*image_yscale/2;

this.n_hits = 0;
this.start_direction = null;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
/* MOVEMENT #1
if (mouse_down && load < max_speed) {
	load += max_speed /25;
}
if (mouse_check_released() && load > 0) {
	speed = load;
	log(speed);
	direction = point_direction(x, y, mouse_x, mouse_y);
	load = 0;
	if (target) {
		with(target) { instance_destroy(); }
	}
	target = instance_create(mouse_x, mouse_y, target);
	friction = 0;
	n_hits = 0;
}
*/

if (x < lbound || x > rbound) {
	x = x<lbound ? lbound+1 : rbound-1;
	speed = 0;
}
if (y < ubound || y > dbound) {
	y = y<ubound ? ubound+1 : dbound-1;
	speed = 0;
}
// MOVEMENT #2
if (mouse_down) {
	direction = point_direction(x, y, mouse_x, mouse_y);
	speed = Math.min(40, point_distance(x, y, mouse_x, mouse_y)/15);
	if (start_direction == null || Math.abs(direction-start_direction) > 20) {
		n_hits = 0;
		start_direction = direction;
	}
}

if (speed > 0) {
	speed -= speed/global.WIDTH*2;
} else {
	speed = 0;
	n_hits = 0;
}

}
};
this.on_end_step = function() {
with(this) {
depth = -y;
if (direction > -90 && direction < 90) {
	image_xscale = Math.abs(image_xscale)*-1;
} else {
	image_xscale = Math.abs(image_xscale);
}

if (sprite_index != spr_harambe_stand
	&& sprite_index != spr_harambe_walk
	&& sprite_index != spr_harambe_run) {
	return;
}
if (speed > max_speed/2.5) {
	sprite_index = spr_harambe_run;
} else if (speed > 0.2) {
	sprite_index = spr_harambe_walk;
} else {
	sprite_index = spr_harambe_stand;
}
if (load > 0) {
	image_speed = load /global.WIDTH*2;
} else if (speed > 0) {
	image_speed = speed /global.WIDTH*2;
} else {
	image_speed = 0.3;
}

}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, target);
if(this.other != null) {
friction = speed/global.WIDTH*2;
with(other) instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, child);
if(this.other != null) {
if (other.sprite_index == spr_child_launching) {
	return;
}
if (this.speed > this.max_speed/5) {
	if (!other.flying) {
		other.speed = this.speed*2;
		other.direction = point_direction(this.x, this.y, other.x, other.y);
		other.sprite_index = spr_child_flying;
		other.image_speed = other.speed/5;
		other.flying = true;
		sprite_index = sprite_index == spr_harambe_punch_right ?
			spr_harambe_punch_left : spr_harambe_punch_right;
		image_index = 0;
		image_speed = 0.2;
		n_hits++;
		var s = Math.floor(this.speed * n_hits * 10);
		global.GOD.score += s;
		show_text(x, y, "+" + s);
	}
} else {
	this.holding = other;
}
}
this.other = this.place_meeting(this.x, this.y, food);
if(this.other != null) {
update_harambe_hp((other.type+1)*5);
with(other) instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
if (sprite_index == spr_harambe_dead) {
	iamge_speed = 0;
	return;
}
if (sprite_index != spr_harambe_stand
	&& sprite_index != spr_harambe_walk
	&& sprite_index != spr_harambe_run) {
	sprite_index = spr_harambe_walk;
}
}
}
};
this.on_draw = on_draw_i;
}; var harambe = new __harambe();

function __block() {
__instance_init__(this, block, null, 1, 0, spr_block, 1, 3);
this.on_creation = function() {
with(this) {
set_image_scale(this, 1);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var block = new __block();

function __child() {
__instance_init__(this, child, null, 1, 0, spr_child_launching, 1, 4);
this.on_creation = function() {
with(this) {
set_image_scale(this, 1.25);
this.launched = false;
this.flying = false;
image_speed = 0;

var me = this;
setTimeout(function() {
	me.launched = true;
	me.sprite_index = spr_child_launched;
	me.image_speed = _speed /20;
}, 1000);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.launched) {
	move_towards_point(this.goto_x, this.goto_y, this._speed);
}
if (x == goto_x && y == goto_y && launched) {
	this.launched = false;
	sprite_index = spr_child_walk;
	image_speed = 0;
	/*setInterval(function() {
		if (flying) { return; }
		direction = Math.random()*360;
		speed = 0.2+Math.random()*0.5;
		image_speed = speed/2;
		if (direction > 270 || direction < 90) {
			image_xscale = Math.abs(image_xscale)*-1;
		} else {
			image_xscale = Math.abs(image_xscale);
		}
	}, 5000+Math.random()*5000);*/
}

if (outside_of_room(this)) {
	instance_destroy();
}
}
};
this.on_end_step = function() {
with(this) {
depth = -y;
collision_checking = (sprite_index == spr_child_flying ||
	point_distance(x, y, global.harambe.x, global.harambe.y) < global.WIDTH*5);

if (sprite_index == spr_child_flying && this.target == null) {
	var threshold = global.WIDTH*3;
	var min_d = 999999;
	for(var i=0; i<instance_list(enemy).length; i++) {
		var s = instance_list(enemy)[i];
		var p = point_distance(x, y, s.x, s.y);
		if (p < threshold  && p < min_d) {
			this.target = s;
			min_d = p;
		}
	}
	if (this.target != null) {
		direction = point_direction(x, y, this.target.x, this.target.y);
	}
}
}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, child);
if(this.other != null) {
//?
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var child = new __child();

function __shadow() {
__instance_init__(this, shadow, null, 1, 0, spr_shadow, 1, 5);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var shadow = new __shadow();

function __enemy() {
__instance_init__(this, enemy, null, 1, 0, spr_swat_stand, 1, 6);
this.on_creation = function() {
with(this) {
set_image_scale(this, 1.75);
this.image_speed = 0;

this.crosshair = instance_create(x, y, crosshair);
this.crosshair.goto_x = global.harambe.x;
this.crosshair.goto_y = global.harambe.y;
this.crosshair.goto_speed = Math.max(global.GOD.level, 10);
this.interval_time = 10000 / global.GOD.level/1.5;

this.interval_move = setInterval(function() {
			var rnd = Math.random();
			var h = global.harambe;
			if (rnd < 0.3) { // chest
				crosshair.target = 0;
				crosshair.goto_x = h.x;
				crosshair.goto_y = h.y + h.sprite_index.height*h.image_yscale/4;			
			} else if (rnd < 0.6) { // face
				crosshair.target = 1;
				crosshair.goto_x = h.x;
				crosshair.goto_y = h.y - h.sprite_index.height*h.image_yscale/5;
			} else { // head
				crosshair.target = 2;
				crosshair.goto_x = h.x;
				crosshair.goto_y = h.y - h.sprite_index.height*h.image_yscale/4;
			}
			crosshair.goto_speed = Math.max(global.GOD.level, 10);
			if (interval_time > 0.1) {
				interval_time/=1.1;
			}
		}, interval_time);

}
};
this.on_destroy = function() {
with(this) {
with(this.crosshair) { instance_destroy(); }
}
};
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
this.image_index = this._direction;

if (this.crosshair.shooting
	|| this.crosshair.x != this.crosshair.goto_x
	|| this.crosshair.y != this.crosshair.goto_y) {
	sprite_index = spr_swat_shoot;
} else {
	sprite_index = spr_swat_stand;
}
}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, child);
if(this.other != null) {
if (other.sprite_index == spr_child_launching) {
	return;
}
var s = Math.floor(other.speed * 2.5);
show_text(x, y, "+" + s);
global.GOD.score += s;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(sprite_index, image_index, x, y, image_xscale, image_yscale, image_angle, image_alpha);
if (this.crosshair.shooting) {
	draw_set_color(255, 0, 0);
	draw_dotted_line(x, y, crosshair.x, crosshair.y);
}

}
}
};
}; var enemy = new __enemy();

function __target() {
__instance_init__(this, target, null, 0, 0, spr_target, 1, 7);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var target = new __target();

function __crosshair() {
__instance_init__(this, crosshair, null, 1, -999999, spr_crosshair, 1, 8);
this.on_creation = function() {
with(this) {
this.collision_time = 0;
this.shooting = false;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x != goto_x || y != goto_y) {
	move_towards_point(goto_x, goto_y, goto_speed);
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, harambe);
if(this.other != null) {
collision_time++;
if (!shooting && collision_time > 200/Math.log(3+global.GOD.level)) {
	shooting = true;
	update_harambe_hp(-5);
	global.harambe.image_speed = 0.1;
	global.harambe.image_index = 0;		
	if (target == 0) {
		global.harambe.sprite_index = spr_harambe_hit_chest;
	} else if (target == 1) {
		global.harambe.sprite_index = spr_harambe_hit_face;		
	} else {
		global.harambe.sprite_index = spr_harambe_hit_head;		
	}
	setTimeout(function() {
		shooting = false;
		collision_time = 0;
	}, 1000);
}
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(255, 0, 0);
draw_circle(x, y, global.WIDTH/10, false);
}
}
};
}; var crosshair = new __crosshair();

function __text_handler() {
__instance_init__(this, text_handler, null, 1, -9999, null, 1, 9);
this.on_creation = function() {
with(this) {
fucking_die = false;
direction = point_direction(x, y, room_width/2, room_height/2);
speed = global.WIDTH/10;
var me = this;
setTimeout(function() { me.fucking_die = true; }, 1500);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = function() {
with(this) {
if (fucking_die) { instance_destroy(); }
}
};
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_bold_text(x, y, text, color);
}
}
};
}; var text_handler = new __text_handler();

function __food() {
__instance_init__(this, food, null, 1, 0, spr_food, 1, 10);
this.on_creation = function() {
with(this) {
image_speed = 0;
set_image_scale(this, 1.5);
this.launched = false;
collision_checking = false;

var me = this;
setTimeout(function() {
	me.launched = true;
}, 1000);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
image_index = this.type;
if (launched) {
	move_towards_point(this.goto_x, this.goto_y, this._speed);
	image_angle += this._speed;
}
if (x == goto_x && y == goto_y && launched) {
	launched = false;
	collision_checking = true;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_same_sprite(this);
}
}
};
}; var food = new __food();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __main_room() { 
this.tiles = [
];
this.objects = [
[{o:GOD, x:21, y:23}]];
this.start = function() {
__room_start__(this, main_room, 640, 640, 60, 192, 192, 192, null, 0, 0, 0, 640, 640, null, 50, 50);

// get screen width and height
var e = window, a = 'inner';
if (!( 'innerWidth' in window )) {
	a = 'client';
	e = document.documentElement || document.body;
}
var screen = {width:e[a + 'Width'], height:e[a + 'Height']};
/* alert(screen.width + ", " + screen.height);
//current scene size = 512, 640
var original_scene_width = 640;
var original_scene_height = 640;
var scene_width = 0;
var scene_height = 0;
if (screen.width < screen.height) {
	scene_width = screen.width;
	scene_height = original_scene_height * screen.width/original_scene_width;
} else {
	scene_width = original_scene_width * screen.height/original_scene_height;
	scene_height = screen.height;	
}*/
// re-start room with adjusted scene size
__room_start__(this, main_room, screen.width, screen.height,
	30, 192, 192, 192, null, 0, 0, 0,
	screen.width, screen.height, null, 50, 50);
};
}
var main_room = new __main_room();
tu_scenes.push(main_room);
tu_room_to_go = main_room;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/


/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/

function draw_bold_text(x, y, txt, color) { 
function __generic() {
	__font_init__(this, generic, 'courier',
				Math.min(global.WIDTH, global.HEIGHT)/3, 0, 0)
};
draw_set_font(generic);
draw_set_color(0, 0, 0);
draw_text(x, y, txt);
draw_set_font(generic);
draw_set_color(255, 255, 255);
if (color == "red") {
	draw_set_color(255, 0, 0);
} else if (color == "green") {
	draw_set_color(0, 255, 0);
}
draw_text(x+1, y-1, txt);
}
function draw_dotted_line(start_x, start_y, end_x, end_y) { 
//log("draw_dotted_line(" + start_x +", " + start_y	+ ", " + end_x + ", " + end_y + ")");
delta = (end_x-start_x)/(end_y-start_y);
n_lines = point_distance(start_x, start_y, end_x, end_y)/global.WIDTH;
step_x = (end_x-start_x)/n_lines;
step_y = (end_y-start_y)/n_lines;
line_x = start_x;
line_y = start_y;
for(var i=1; i<n_lines; i++) {
	//log(i + ": draw_line(" + line_x + ", " + line_y + ", " + (line_x+step_x/2) + ", " + (line_y+step_y/2) + ")");
	draw_line(line_x,
			line_y,
			line_x+step_x/2,
			line_y+step_y/2);
	line_x += step_x;
	line_y += step_y;
}
}
function log() { 
if (global.LOG != null && global.LOG!= undefined && global.LOG) {
	for (var i = 0; i < arguments.length; i++) {
		console.log(arguments[i]);
	}
}
}
function outside_of_room(obj) { 
return (obj.x < 0 || obj.x > room_width
	|| obj.y < 0 || obj.y > room_height);
}
function set_image_scale(obj, size) { 
var scale = Math.min(global.WIDTH*size /obj.sprite_index.width,
						global.HEIGHT*size /obj.sprite_index.height);
obj.image_xscale = obj.image_yscale = scale;
}
function show_text(x, y, text, color) { 
var t = instance_create(x, y, text_handler);
t.text = text;
t.color = color;
}
function update_harambe_hp(delta) { 
global.harambe.hp += delta;
if (global.harambe.hp < 0) {
	global.harambe.hp = 0;
}
if (global.harambe.hp > 100) {
	global.harambe.hp = 100;
}
global.harambe.show_hp = true;
/*
show_text(global.harambe.x,
		global.harambe.y,
		(delta>0 ? "+":"") + delta,
		(delta>0 ? "green":"red"));
*/
setTimeout(function() {
	global.harambe.show_hp = false;
	}, 1000);
}
function draw_same_sprite(obj) { 
draw_sprite_ext(obj.sprite_index,
				obj.image_index,
				obj.x,
				obj.y,
				obj.image_xscale,
				obj.image_yscale,
				obj.image_angle,
				obj.image_alpha);
}


tu_gameloop = tu_loop;
tu_loop();
