'use strict';

/*

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

  (Это свободная программа: вы можете перераспространять ее и/или изменять
   ее на условиях Стандартной общественной лицензии GNU в том виде, в каком
   она была опубликована Фондом свободного программного обеспечения; либо
   версии 3 лицензии, либо (по вашему выбору) любой более поздней версии.

   Эта программа распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <http://www.gnu.org/licenses/>.)
*/

function build(){
	var start=new Date().getTime();
	var checksNolist=document.getElementsByClassName('check-nolist');
	for(var ci=0;ci<checksNolist.length;ci++){
		globalNolist[checksNolist[ci].id]=!$(checksNolist[ci]).is(':checked');
	}
	$('#targetGroups')[0].innerHTML='';
	$('#targetAud')[0].innerHTML='';
//	console.log(base);
	prepareBase();
	countTable("aud","prep","grp",'targetAud','Аудитория',globalNolist);
	countTable("grp","prep","aud",'targetGroups','Группа',globalNolist);
	preBuildEdit();
//	console.log(base);
	setTimeout(saveInBackground,10);
	nowait();
	console.log('build():'+(new Date().getTime()-start));
}

function diagr(){
	$('.jqplot-target').html('');
	prepareBase();
	var baselen=base.length;
	var kolvoDni=dni.length;
	var statdni=[];
	var statpary=[];
	var stataud={};
	var baseelem;

	var statpodnyam=[], statpodnyammas=[];
	for(var i=0;i<kolvoDni;i++){
		statpodnyam[i]=[];
		statpodnyammas[i]=[];
	}
	var korp={};
	var korpval=$('#select-korpusa').val();
	for(var i=0;i<korpval.length;i++){
		korp[korpval[i]]=1;
	}
	for(var i=0;i<baselen;i++){
		baseelem=base[i];
		for(var j=0;j<baseelem.aud.length;j++){
			var fl_korp=0;
			var k=baseelem.aud[j].match(/.*(?=_)/g);
			if(!k)
				k=['1'];
			if(korp[k[0]]){
				fl_korp=1;
			}
			if(fl_korp){
				safeinc(stataud,baseelem.aud[j] );
				safeinc(statpodnyam[baseelem.den],baseelem.aud[j] );
			}
		}
		if(fl_korp){
			safeinc(statpary,baseelem.para,baseelem.aud.length/dni .length/2);
			safeinc(statdni ,baseelem.den ,baseelem.aud.length/pary.length/2);
		}
	}

	var stataudmas=[];
	for(var chto in stataud){
		stataudmas.push([stataud[chto],chto]);
		for(var i=0;i<kolvoDni;i++){
			statpodnyammas[i].push([statpodnyam[i][chto],chto]);
		}
	}
	stataudmas=stataudmas.sortNumericArr();
	stataudmas=stataudmas.T();
	$('.jqplot-target-aud').css('width',stataudmas[0].length*50);
	
	jqplotBarRender('jqplot-pary',statpary,pary,0);
	jqplotBarRender('jqplot-dni' ,statdni ,dni ,0);
	nonjqplotBarRender('jqplot-aud' ,stataudmas[0],stataudmas[1],0);

	var podnyam=$('#jqplot-pary-po-dnyam')[0];
	for(var i=0;i<kolvoDni;i++){
		statpodnyammas[i]=statpodnyammas[i].T();
		statpodnyammas[i][0].replaceUndefinedBy0();
		statpodnyammas[i]=statpodnyammas[i].T();
		statpodnyammas[i]=statpodnyammas[i].sortNumericArr();
		statpodnyammas[i]=statpodnyammas[i].T();
		var h3=document.createElement('h3');
		h3.innerHTML=dni[i];
		podnyam.appendChild(h3);
		var targdiv=document.createElement('div');
		targdiv.id='jqplot-podnyam-'+dni[i];
		targdiv.className='jqplot-target jqplot-target-aud'
		targdiv.style.width=''+(stataudmas[0].length*50)+'px';

		var wrapdiv=document.createElement('div');
		wrapdiv.className='x-scroll';
		podnyam.appendChild(wrapdiv);
		wrapdiv.appendChild(targdiv);
		nonjqplotBarRender('jqplot-podnyam-'+dni[i],statpodnyammas[i][0],statpodnyammas[i][1],0);
	}
	innerHTMLtoImg($('#jqplot-pary')[0]);
	innerHTMLtoImg($('#jqplot-dni' )[0]);
	nowait();
}

if(document.location.href.search('#--noconcat')!=-1){
	base=$.jStorage.get("base",[]);
}else{
	base=base.concat($.jStorage.get("base",[]));
}

if(document.location.href.search('#--deleteall')!=-1){
	base=[];
}

if(document.location.href.search('#--jstorage-flush')!=-1){
	$.jStorage.flush();
}

baseSave();
createKorpusa();

$(function(){
	$("#tabs").tabs();
	build();
	buildDobav();
	nowait();
});

