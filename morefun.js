var morefun = (function(){

	//魔方对象，存储魔方的状态。
	var m = {
		d:   'w',   u:   'y',   l:   'o',   f:   'b',   r:   'r',   b:   'g',
		dl:  'wo',  df:  'wb',  dr:  'wr',  db:  'wg',
		ul:  'yo',  uf:  'yb',  ur:  'yr',  ub:  'yg',
		lf:  'ob',  fr:  'br',  rb:  'rg',  bl:  'go',
		dlf: 'wob', dfr: 'wbr', drb: 'wrg', dbl: 'wgo',
		ulf: 'yob', ufr: 'ybr', urb: 'yrg', ubl: 'ygo'
	};

	//魔方颜色
	var c = {r:'red',g:'green',y:'yellow',o:'orange',b:'blue',w:'white'};

	var next = {l:'f',f:'r',r:'b',b:'l'};
	var prev = {l:'b',b:'r',r:'f',f:'l'};
	var next_c = {o:'b',b:'r',r:'g',g:'o'};

	/**************************** 魔方基本动作 ******************************/
	//后面顺时针旋转90°
	var mov_b = function(){
		var tmp = m.ub;
		m.ub = m.rb;
		m.rb = m.db;
		m.db = m.bl; m.db = m.db[1] + m.db[0];
		m.bl = tmp;  m.bl = m.bl[1] + m.bl[0];
		tmp = m.ubl;
		m.ubl = m.urb; m.ubl = m.ubl[1] + m.ubl[2] + m.ubl[0];
		m.urb = m.drb; m.urb = m.urb[1] + m.urb[0] + m.urb[2];
		m.drb = m.dbl; m.drb = m.drb[2] + m.drb[0] + m.drb[1];
		m.dbl = tmp;   m.dbl = m.dbl[2] + m.dbl[1] + m.dbl[0];
	};

	//右面顺时针旋转90°
	var mov_r = function(){
		var tmp = m.ur;
		m.ur = m.fr;
		m.fr = m.dr;
		m.dr = m.rb; m.dr = m.dr[1] + m.dr[0];
		m.rb = tmp;  m.rb = m.rb[1] + m.rb[0];
		tmp = m.urb;
		m.urb = m.ufr; m.urb = m.urb[1] + m.urb[2] + m.urb[0];
		m.ufr = m.dfr; m.ufr = m.ufr[1] + m.ufr[0] + m.ufr[2];
		m.dfr = m.drb; m.dfr = m.dfr[2] + m.dfr[0] + m.dfr[1];
		m.drb = tmp;   m.drb = m.drb[2] + m.drb[1] + m.drb[0];
	};

	//前面顺时针旋转90°
	var mov_f = function(){
		var tmp = m.uf;
		m.uf = m.lf;
		m.lf = m.df;
		m.df = m.fr; m.df = m.df[1] + m.df[0];
		m.fr = tmp;  m.fr = m.fr[1] + m.fr[0];
		tmp = m.ufr;
		m.ufr = m.ulf; m.ufr = m.ufr[1] + m.ufr[2] + m.ufr[0];
		m.ulf = m.dlf; m.ulf = m.ulf[1] + m.ulf[0] + m.ulf[2];
		m.dlf = m.dfr; m.dlf = m.dlf[2] + m.dlf[0] + m.dlf[1];
		m.dfr = tmp;   m.dfr = m.dfr[2] + m.dfr[1] + m.dfr[0];
	};

	//左面顺时针旋转90°
	var mov_l = function(){
		var tmp = m.ul;
		m.ul = m.bl;
		m.bl = m.dl;
		m.dl = m.lf; m.dl = m.dl[1] + m.dl[0];
		m.lf = tmp;  m.lf = m.lf[1] + m.lf[0];
		tmp = m.ulf;
		m.ulf = m.ubl; m.ulf = m.ulf[1] + m.ulf[2] + m.ulf[0];
		m.ubl = m.dbl; m.ubl = m.ubl[1] + m.ubl[0] + m.ubl[2];
		m.dbl = m.dlf; m.dbl = m.dbl[2] + m.dbl[0] + m.dbl[1];
		m.dlf = tmp;   m.dlf = m.dlf[2] + m.dlf[1] + m.dlf[0];
	};

	//顶面顺时针旋转90°
	var mov_u = function(){
		//棱块转动
		var tmp = m.ul;
		m.ul = m.uf;
		m.uf = m.ur;
		m.ur = m.ub;
		m.ub = tmp;
		//角块转动
		tmp = m.ulf;
		m.ulf = m.ufr;
		m.ufr = m.urb;
		m.urb = m.ubl;
		m.ubl = tmp;
	};

	//底面顺时针旋转90°
	var mov_d = function(){
		//棱块转动
		var tmp = m.dl;
		m.dl = m.db;
		m.db = m.dr;
		m.dr = m.df;
		m.df = tmp;
		//角块转动
		tmp = m.dlf;
		m.dlf = m.dbl;
		m.dbl = m.drb;
		m.drb = m.dfr;
		m.dfr = tmp;
	};

	//魔方基本动作函数打包
	var mov = function(com){
		switch(com){
			case 'd': 	//d - 底面顺时针旋转90°
				mov_d();
				break;
			case 'D': 	//D - 底面逆时针旋转90°
				mov_d();mov_d();mov_d();
				break;
			case 'u': 	//u - 顶面顺时针旋转90°
				mov_u();
				break;
			case 'U': 	//U - 顶面逆时针旋转90°
				mov_u();mov_u();mov_u();
				break;
			case 'l': 	//l - 左面顺时针旋转90°
				mov_l();
				break;
			case 'L': 	//L - 左面逆时针旋转90°
				mov_l();mov_l();mov_l();
				break;
			case 'f': 	//f - 前面顺时针旋转90°
				mov_f();
				break;
			case 'F': 	//F - 前面逆时针旋转90°
				mov_f();mov_f();mov_f();
				break;
			case 'r': 	//r - 右面顺时针旋转90°
				mov_r();
				break;
			case 'R': 	//R - 右面逆时针旋转90°
				mov_r();mov_r();mov_r();
				break;
			case 'b': 	//b - 后面顺时针旋转90°
				mov_b();
				break;
			case 'B': 	//B - 后面逆时针旋转90°
				mov_b();mov_b();mov_b();
				break;
		}
	};

	//魔方组合动作
	var exe = function(com) {
		for (var i = 0; i < com.length; i++) {
			mov(com[i]);
		};
	};

	/*************************** 层先法复原魔方 **************************/
	//查找块所在的位置及状态
	var pos = function(block){
		var reg = new RegExp('['+block+']{'+block.length+'}');
		for(k in m){
			if(m[k].match(reg)){
				return {k:k,v:m[k]};
			}
		}
	};

	//调整单个底棱块
	var _step_1 = function(position, block){
		var exp = '';
		var exp_log = '';
		var s;
		for(var i = 0; i < 7; i++){
			s = pos(block);
			if(s.k.indexOf('d') != -1){
				if(s.v[0] == block[0]){
					if(s.k == position){
						console.log(exp_log);
						return exp_log;		//最终返回指令
					}else{
						exp = s.k[1] + s.k[1];
					}
				}else{
					exp = s.k[1];
				}
			}else if(s.k.indexOf('u') != -1){
				if(s.k[1] == position[1]){
					if(s.v[0] == block[0]){
						exp = s.k[1] + s.k[1];
					}else if(m[position[0]+next[s.k[1]]] != m[position[0]] + m[next[s.k[1]]]){
						exp = 'U' + next[s.k[1]].toUpperCase() + s.k[1];
					}else{
						exp = 'U' + next[s.k[1]].toUpperCase() + s.k[1] + next[s.k[1]];
					}
				}else{
					exp = 'u';
				}
			}else{
				if(s.v[0] == block[0]){
					if(s.k[1] == position[1]){
						exp = s.k[1].toUpperCase();
					}else if(m[position[0]+s.k[1]] != m[position[0]]+m[s.k[1]]){
						exp = s.k[1];
					}else{
						exp = s.k[1] + 'u' + s.k[1].toUpperCase();
					}
				}else{
					if(s.k[0] == position[1]){
						exp = s.k[0];
					}else if(m[position[0]+s.k[0]] != m[position[0]]+m[s.k[0]]){
						exp = s.k[0].toUpperCase();
					}else{
						exp = s.k[0].toUpperCase() + 'u' + s.k[0];
					}
				}
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[1'+exp_log+'1]');
		return '[1'+exp_log+'1]';
	};

	//调整单个底角块
	var _step_2 = function(position, block){
		// dlf
		var exp = '';
		var exp_log = '';
		var s;
		for(var i = 0; i<10; i++){
			s = pos(block);
			if(s.k.indexOf('d') != -1){
				//所找的角块在底面位置
				if(s.v[0] == 'w'){
					if(s.k == position){
						console.log(exp_log);
						return exp_log;		//最终返回指令
					}else{
						exp = s.k[1].toUpperCase() + 'u' + s.k[1];
					}
				}else if(s.v[1] == 'w'){
					exp = s.k[1].toUpperCase() + 'U' + s.k[1];
				}else{
					exp = s.k[2] + 'u' + s.k[2].toUpperCase();
				}
			}else{
				//所找的角块在顶面位置
				if(s.k == 'u'+position[1]+position[2]){
					if(s.v[0] == 'w'){
						exp = s.k[2] + 'U' + s.k[2].toUpperCase();
					}else if(s.v[1] == 'w'){
						exp = s.k[1].toUpperCase() + 'U' + s.k[1];
					}else{
						exp = s.k[2] + 'u' + s.k[2].toUpperCase();
					}
				}else{
					exp = 'u';
				}
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[2'+exp_log+'2]');
		return '[2'+exp_log+'2]';
	};

	//调整单个中棱块
	var _step_3 = function(position, block){
		var exp = '';
		var exp_log = '';
		var s;
		for(var i = 0; i < 6; i++){
			s = pos(block);
			if(s.k.indexOf('u') != -1){
				if(next_c[s.v[0]] == s.v[1]){
					if(s.v[1] == m[s.k[1]]){
						exp = 'U'+prev[s.k[1]].toUpperCase()+'u'+prev[s.k[1]]+'u'+s.k[1]+'U'+s.k[1].toUpperCase();
					}else{
						exp = 'u';
					}
				}else{
					if(s.v[1] == m[s.k[1]]){
						exp = 'u'+next[s.k[1]]+'U'+next[s.k[1]].toUpperCase()+'U'+s.k[1].toUpperCase()+'u'+s.k[1];
					}else{
						exp = 'u';
					}
				}
			}else{
				if(s.v[0] == m[s.k[0]] && s.v[1] == m[s.k[1]]){
					console.log(exp_log);
					return exp_log;
				}else{
					exp = 'U'+s.k[0].toUpperCase()+'u'+s.k[0]+'u'+s.k[1]+'U'+s.k[1].toUpperCase();
				}
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[3'+exp_log+'3]');
		return '[3'+exp_log+'3]';
	};

	//第一步：底棱归位
	var step_1 = function(){
		console.log('------------ 第一步：底棱归位 ------------');
		var exp_log = '';
		exp_log += _step_1('dl', 'wo');
		exp_log += _step_1('df', 'wb');
		exp_log += _step_1('dr', 'wr');
		exp_log += _step_1('db', 'wg');
		return exp_log;
	};

	//第二步：底角归位
	var step_2 = function(){
		console.log('------------ 第二步：底角归位 ------------');
		var exp_log = '';
		exp_log += _step_2('dlf', 'wob');
		exp_log += _step_2('dfr', 'wbr');
		exp_log += _step_2('drb', 'wrg');
		exp_log += _step_2('dbl', 'wgo');
		return exp_log;
	};

	//第三步：中棱归位
	var step_3 = function(){
		console.log('------------ 第三步：中棱归位 ------------');
		var exp_log = '';
		exp_log += _step_3('lf', 'ob');
		exp_log += _step_3('fr', 'br');
		exp_log += _step_3('rb', 'rg');
		exp_log += _step_3('bl', 'go');
		return exp_log;
	};

	//第四步：顶部十字
	var step_4 = function(){
		console.log('------------ 第四步：顶部十字 ------------');
		var exp = '';
		var exp_log = '';
		for(var i = 0; i < 4; i++){
			if(m.ul[0] == 'y' && m.ur[0] == 'y' && m.uf[0] == 'y' && m.ub[0] == 'y'){
				console.log(exp_log);
				return exp_log;
			}else if(m.ul[0] == 'y' && m.ur[0] == 'y'){
				exp = 'fruRUF';
			}else if(m.uf[0] == 'y' && m.ub[0] == 'y'){
				exp = 'rbuBUR';
			}else if(m.uf[0] == 'y' && m.ur[0] == 'y'){
				exp = 'fruRUF';
			}else if(m.ur[0] == 'y' && m.ub[0] == 'y'){
				exp = 'rbuBUR';
			}else if(m.ub[0] == 'y' && m.ul[0] == 'y'){
				exp = 'bluLUB';
			}else if(m.ul[0] == 'y' && m.uf[0] == 'y'){
				exp = 'lfuFUL';
			}else{
				exp = 'fruRUF';
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[4'+exp_log+'4]');
		return '[4'+exp_log+'4]';
	};

	//第五步：顶角归位（状态）
	var step_5 = function(){
		console.log('------------ 第五步：顶角归位（状态） ------------');
		var exp = '';
		var exp_log = '';
		var s = '';
		for(var i = 0; i < 10; i++){
			s = '';
			s += m.ulf.indexOf('y');
			s += m.ufr.indexOf('y');
			s += m.urb.indexOf('y');
			s += m.ubl.indexOf('y');
			if(s == '0000'){
				console.log(exp_log);
				return exp_log;
			}else if(s.match(/0111|1011|1101|1110/)){
				if(s == '1101'){
					exp = 'luLuluuL';
				}else{
					exp = 'u';
				}
			}else if(s.match(/0222|2022|2202|2220/)){
				if(s == '2220'){
					exp = 'RUrURuur';
				}else{
					exp = 'u';
				}
			}else if(s.match(/0102|0201|1020|2010/)){
				if(s == '0201'){
					exp = 'RUrURuur';
				}else{
					exp = 'u';
				}
			}else if(s.match(/2121|1212/)){
				if(s == '1212'){
					exp = 'RUrURuur';
				}else{
					exp = 'u';
				}
			}else if(s.match(/1200|2100|0012|0021|1002|2001|0120|0210/)){
				if(s == '0021' || s == '2001'){
					exp = 'RUrURuur';
				}else{
					exp = 'u';
				}
			}else{
				exp = 'RUrURuur';
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[5'+exp_log+'5]');
		return '[5'+exp_log+'5]';
	};

	//第六步：顶角归位（位置）
	var step_6 = function(){
		console.log('------------ 第六步：顶角归位（位置） ------------');
		var exp = '';
		var exp_log = '';
		var s = '';
		for(var i = 0; i < 9; i++){
			s = m.ulf[1] + m.ufr[1] + m.urb[1] + m.ubl[1];
			if(s.match(/obrg|brgo|rgob|gobr/)){
				if(s == 'obrg'){
					console.log(exp_log);
					return exp_log;
				}else{
					exp = 'u';
				}				
			}else if(s.match(/ob|br|rg|go/)){
				if(s.match(/^ob|^br|^rg|^go/)){
					exp = 'rBrffRbrffrr';
				}else{
					exp = 'u';
				}		
			}else{
				exp = 'rBrffRbrffrr';
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[6'+exp_log+'6]');
		return '[6'+exp_log+'6]';
	};

	//第七步：顶棱归位
	var step_7 = function(){
		console.log('------------ 第七步：顶棱归位 ------------');
		var exp = '';
		var exp_log = '';
		var s = '';
		for(var i = 0; i < 6; i++){
			s = m.ul[1] + m.uf[1] + m.ur[1] + m.ub[1];
			if(s.indexOf('g') == '3'){
				if(s == 'obrg'){
					console.log(exp_log);
					return exp_log;
				}else if(s == 'brog'){
					exp = 'ffUlRffLrUff';
				}else if(s == 'robg'){
					exp = 'ffulRffLruff';
				}else if(s == 'orbg'){
					exp = 'uffulRffLruff'
				}else{
					exp = 'ffulRffLruff';
				}
			}else if(s.indexOf('g') == '0'){
				exp = 'UffulRffLruffu';
			}else if(s.indexOf('g') == '1'){
				exp = 'uffulRffLruffU';
			}else{
				exp = 'uffUlRffLrUffU';
			}
			exp_log += exp;
			exe(exp);
		}
		console.log('[7'+exp_log+'7]');
		return '[7'+exp_log+'7]';
	};

	//复原魔方，返回所需步骤
	var step = function(){
		var exp_log = '';
		exp_log += step_1();
		exp_log += step_2();
		exp_log += step_3();
		exp_log += step_4();
		exp_log += step_5();
		exp_log += step_6();
		exp_log += step_7();
		return exp_log;
	};

	//压缩指令数
	var reduce = function(str){
		var min = '';
		min = str.replace(/uU|Uu|dD|Dd|lL|Ll|fF|Ff|rR|Rr|bB|Bb|uuuu|dddd|llll|ffff|rrrr|bbbb/g, '');
		min = min.replace(/uuu/g, 'U');
		min = min.replace(/ddd/g, 'D');
		min = min.replace(/lll/g, 'L');
		min = min.replace(/fff/g, 'F');
		min = min.replace(/rrr/g, 'R');
		min = min.replace(/bbb/g, 'B');
		return min;
	};

	/*************************** 输入输出操作 **************************/
	//根据魔方六个面的颜色数组获取魔方状态
	var scan_by_face = function(ob){
		m.d = ob.d[1][1];
		m.u = ob.u[1][1];
		m.l = ob.l[1][1];
		m.f = ob.f[1][1];
		m.r = ob.r[1][1];
		m.b = ob.b[1][1];
		m.dl = ob.d[1][0] + ob.l[2][1];
		m.df = ob.d[0][1] + ob.f[2][1];
		m.dr = ob.d[1][2] + ob.r[2][1];
		m.db = ob.d[2][1] + ob.b[2][1];
		m.ul = ob.u[1][0] + ob.l[0][1];
		m.uf = ob.u[2][1] + ob.f[0][1];
		m.ur = ob.u[1][2] + ob.r[0][1];
		m.ub = ob.u[0][1] + ob.b[0][1];
		m.lf = ob.l[1][2] + ob.f[1][0];
		m.fr = ob.f[1][2] + ob.r[1][0];
		m.rb = ob.r[1][2] + ob.b[1][0];
		m.bl = ob.b[1][2] + ob.l[1][0];
		m.dlf = ob.d[0][0] + ob.l[2][2] + ob.f[2][0];
		m.dfr = ob.d[0][2] + ob.f[2][2] + ob.r[2][0];
		m.drb = ob.d[2][2] + ob.r[2][2] + ob.b[2][0];
		m.dbl = ob.d[2][0] + ob.b[2][2] + ob.l[2][0];
		m.ulf = ob.u[2][0] + ob.l[0][2] + ob.f[0][0];
		m.ufr = ob.u[2][2] + ob.f[0][2] + ob.r[0][0];
		m.urb = ob.u[0][2] + ob.r[0][2] + ob.b[0][0];
		m.ubl = ob.u[0][0] + ob.b[0][2] + ob.l[0][0];
	};

	//根据魔方对象获取魔方状态
	var scan_by_obj = function(ob){
		for(k in ob){
			m[k] = ob[k];
		}
	};

	//输入魔方状态
	var scan = function(ob, type){
		if(type == 1){		//通过对象方式获取魔方状态
			scan_by_obj(ob);
		}else{
			scan_by_face(ob);
		}
	};

	//输出魔方状态
	var out = function(){

		return m;
	};

	/****************************** 其它 *******************************/
	//随机打乱魔方
	var mad = function(n) {
		n = n ? n : 24;
		n = n > 240 ? 240 : n;
		var arr = ['u','d','l','f','r','b','U','D','L','F','R','B'];
		var str = '';
		for(var i = 0; i < n; i++){
			var x =  Math.floor(12 * Math.random());
			str += arr[x];
		}
		exe(str);
		return str;
	};

	return {
		c      : c,
		out    : out,
		exe	   : exe,
		step   : step,
		mad	   : mad,
		reduce : reduce,
		scan   : scan
	};

})();