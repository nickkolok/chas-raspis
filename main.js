'use strict';

Array.prototype.getVariety=function(prop){
	var len=this.length;
	var rez=[];
	for(var i=0;i<len;i++){
		if(this[i][prop]!==undefined){
			if(this[i][prop].isArray){
				rez=rez.concat(this[i][prop]);
			}else{
				rez.push(this[i][prop]);
			}
		}
	}
	return rez.sortDelDubl();
}

String.prototype.multiply=function(n){
	var rez=this;
	for(var i=0;i<n;i++)
		rez+=this;
	return rez;
}

function safeinc(obj,prop){
	if(!obj[prop])
		obj[prop]=1;
	else
		obj[prop]++;
}

/*
var base=[
	{aud:[319], grp:[1.1,1.2], den: 2, chzn: 0, para: 1, prep: ["Иванов И. И."], predm: "ИМХО"},
	{aud:[319], grp:[1.1,1.2], den: 2, chzn: 1, para: 1, prep: ["Иванов И. И."], predm: "ИМХО"},
	{aud:[309], grp:[1.1], den: 2, chzn: 0, para: 2, prep: ["Петров И. И."], predm: "Теория криптовалют"},
	{aud:[308], grp:[1.2], den: 2, chzn: 1, para: 2, prep: ["Петров И. И."], predm: "Теория криптовалют"},
	{aud:[319,320],grp:[1.1,1.2,1.3], den:1, chzn:0,para:0, prep:['Мячиков Ё.Ё.','Гантелькин Щ.Щ.'],predm:"Физкультура"}
];
*/
var base=[
	{den: 0, para: 1, chzn: 0, aud:[319], grp:[1.1,1.2,1.3,2,3.1,3.2,3.3,4.1,4.2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 1, chzn: 1, aud:[325], grp:[1.3,2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 2, chzn: 0, aud:[480], grp:[1.1,1.2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 2, chzn: 2, aud:[315], grp:[1.3,2], prep: ["Орешина"], predm: "Английский язык"},
	{den: 0, para: 3, chzn: 2, aud:[306], grp:[1.1,1.2,1.3], prep: ["Завгородний"], predm: "Технологии программирования"},
	{den: 0, para: 4, chzn: 2, aud:[300,"Борц. зал"], grp:[1.1,1.2,1.3,2,3.1,3.2,3.3,4.1,4.2], prep: ["Попов","Стрельникова"], predm: "Физкультура"},

	{den: 1, para: 2, chzn: 2, aud:[305], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 1, para: 3, chzn: 2, aud:[305], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 1, para: 3, chzn: 2, aud:[436], grp:[1.2], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 1, para: 3, chzn: 2, aud:[227], grp:[1.3], prep: ["Груздьев"], predm: "Диф. ур-я"},
	{den: 1, para: 4, chzn: 2, aud:[319], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 1, para: 4, chzn: 2, aud:[436], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 1, para: 4, chzn: 2, aud:[321], grp:[1.3], prep: ["Бахтина"], predm: "Мат. анализ"},

	{den: 2, para: 0, chzn: 2, aud:[314], grp:[1.1,1.2], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 0, chzn: 2, aud:["501П"], grp:[1.3], prep: ["Ушаков"], predm: "ТП"},
	{den: 2, para: 1, chzn: 2, aud:["501П"], grp:[1.2], prep: ["Ушаков"], predm: "ТП"},
	{den: 2, para: 1, chzn: 0, aud:[359], grp:[1.3], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 1, chzn: 1, aud:[365], grp:[1.3], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 1, chzn: 0, aud:[310], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 2, para: 1, chzn: 1, aud:[318], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 2, para: 2, chzn: 2, aud:[305], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "Диф. ур-я"},

	{den: 3, para: 0, chzn: 2, aud:[333], grp:[1.2], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 3, para: 1, chzn: 2, aud:[325], grp:[1.1], prep: ["Кочетова"], predm: "Английский язык"},
	{den: 3, para: 1, chzn: 2, aud:["?"], grp:[1.2], prep: ["Орешина"], predm: "Английский язык"},
	{den: 3, para: 1, chzn: 2, aud:[333], grp:[1.3], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 3, para: 2, chzn: 2, aud:[430], grp:[1.1,1.2,1.3], prep: ["Курина"], predm: "Мат. анализ"},
	{den: 3, para: 3, chzn: 2, aud:[305], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "фак. Доп. главы диф. ур-й"},
	{den: 3, para: 4, chzn: 2, aud:[310], grp:[1.1], prep: ["Завгородний"], predm: "ТП"},
	{den: 3, para: 4, chzn: 2, aud:[325], grp:[1.3,2,3.3,4.2], prep: ["Бенедиктова"], predm: "Немецкий язык"},

	{den: 4, para: 1, chzn: 2, aud:[306], grp:[1.1,1.2,1.3], prep: ["Курина"], predm: "Мат. анализ"},
	{den: 4, para: 2, chzn: 2, aud:[437], grp:[1.1,1.2,1.3], prep: ["Гликлих"], predm: "Диф. геометрия и топология"},
	{den: 4, para: 3, chzn: 0, aud:[333], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 4, para: 3, chzn: 1, aud:[340], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 4, para: 3, chzn: 0, aud:[343], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 4, para: 3, chzn: 1, aud:[436], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 4, para: 3, chzn: 2, aud:["504П"], grp:[1.3], prep: ["Груздьев"], predm: "Диф. ур-я"},
	{den: 4, para: 4, chzn: 2, aud:[227], grp:[1.1,1.2,1.3], prep: ["Звягин"], predm: "Современные методы геометрии и анализа"},

];

function prepareBase(){
	var baselen=base.length;
	var baseelem;
	var dubl;
	for(var i=0;i<baselen;i++){
		baseelem=base[i];
		if(baseelem.chzn==2){
			baseelem.chzn=4;
			dubl=baseelem.clone();
			dubl.chzn=1;
			base.push(dubl);
		}
	}
}
prepareBase();

var pary=[
	"8:00-9:35",
	"9:45-11:20",
	"11:20-13:05",
	"13:25-15:00",
	"15:10-16:45",
	"16:55-18:30",
	"18:40-20:00",
	"20:10-21:30",
];

var dni=[
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
];

function countTable(zagol,p1,p2,target,ugolnazv){

	var targetTable=document.createElement("table");
	var groups=base.getVariety(zagol);
	var th=(ugolnazv.vTag('td')+groups.join('</th><th>').vTag('th')).vTag('tr');
	var maintable=[];
	var kolvoParVDen=pary.length;
	var kolvoPar=kolvoParVDen*6*2;
	var kolvoGroups=groups.length;
	var otobrStroki=[];
	for(var i=0;i<kolvoPar;i++){
		maintable[i]=[
			pary[((i-1)/2).round()%kolvoParVDen].bold()
			];
		maintable[i].length=kolvoGroups+1;
	}
	var groupsindex={};
	var nagr=['Нагрузка, ч/нед'];
	for(var gi=0;gi<kolvoGroups;gi++){
		groupsindex[groups[gi]]=gi;
		nagr[gi+1]=0;
	}

	var kolvoBase=base.length;
	var baseElem;
	for(var j=0;j<kolvoBase;j++){
		baseElem=base[j];
		for(var g=0;g<baseElem.grp.length;g++){
			maintable[(baseElem.den*kolvoParVDen+baseElem.para)*2+baseElem.chzn%2][groupsindex[baseElem[zagol][g]]+1]=
				[baseElem.predm,baseElem[p1],baseElem[p2]].join(' ');
			nagr[groupsindex[baseElem[zagol][g]]+1]++;
			otobrStroki[baseElem.den*kolvoParVDen+baseElem.para]=1;
		}

	}
	var maintableCopy=maintable.clone();
	for(var itr=0;itr<kolvoPar;itr++){
		maintable[itr]=maintable[itr].join('</td><td>').vTag('td');
	}

	var ih=maintable.join('</tr><tr>').vTag('tr');
	targetTable.innerHTML=th+ih+nagr.join('</td><td>').vTag('td').vTag('tr');
	$('#'+target)[0].appendChild(targetTable);

	$(targetTable).attr("cellspacing",0);
	$(targetTable).attr("cellpadding",0);

	var tablemap=[];
	var trs=targetTable.getElementsByTagName('tr');
	for(var i=0;i<kolvoPar;i++){
		tablemap[i]=trs[i+1].getElementsByTagName('td');
	}

	for(var i=0;i<kolvoPar;i++)
		for(var j=0;j<kolvoGroups+1;j++)
			if(tablemap[i][j].innerHTML===''){
				tablemap[i][j].innerHTML='&nbsp;';
				tablemap[i][j].className="empty";
			}

	for(var i=0;i<kolvoPar;i++){
		var elemPerv=0;
		for(var j=2;j<kolvoGroups+1;j++){
			if(tablemap[i][j].innerHTML==tablemap[i][j-1].innerHTML && tablemap[i][j].innerHTML!='&nbsp;'){
				if(elemPerv===0){
					elemPerv=tablemap[i][j-1];
					$(elemPerv).attr("colspan",1);
				}
				$(elemPerv).attr("colspan",1*$(elemPerv).attr("colspan")+1);
				tablemap[i][j].style.display="none";
			}else{
				elemPerv=0;
			}
		}
	}

	for(var i=0;i<kolvoPar;i+=2){
		for(var j=0;j<kolvoGroups+1;j++){
			if(tablemap[i][j].innerHTML==tablemap[i+1][j].innerHTML){
				$(tablemap[i][j]).attr("rowspan","2");
				tablemap[i+1][j].style.display="none";
			}
		}	
		if(otobrStroki[(i/2).floor()]===undefined && i%(2*kolvoParVDen) && (i+1)%(2*kolvoParVDen) ){
			tablemap[i][1].parentNode.style.display="none";
			tablemap[i-1][1].parentNode.style.display="none";
		}

	}
}

function build(){
	$('#targetGroups')[0].innerHTML='';
	$('#targetAud')[0].innerHTML='';
	prepareBase();
	try{
		base=JSON.parse($('#textbase').val());
		prepareBase();
	}catch(e){
		alert('Ошибка в записи базы');
	}
	countTable("grp","prep","aud",'targetGroups','Группа');
	countTable("aud","prep","grp",'targetAud','Аудитория');
//	countTable("prep","grp","aud");
}

function jqplotBarRender(target,uroven,ticks,ymin){
	$.jqplot(target, [uroven],{
			axes:{
				xaxis:{
					ticks:ticks,
					renderer:$.jqplot.CategoryAxisRenderer,
				},
				yaxis:{
					min:ymin,
				}
			},
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: { barMargin: 15 },
			}
		}
	);
}

function diagr(){
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
	for(var i=0;i<baselen;i++){
		baseelem=base[i];
		safeinc(statpary,baseelem.para);
		safeinc(statdni ,baseelem.den );

		for(var j=0;j<baseelem.aud.length;j++){
			safeinc(stataud,baseelem.aud[j] );
			safeinc(statpodnyam[baseelem.den],baseelem.aud[j] );
		}
	}

	var stataudmas=[];
	for(var chto in stataud){
		stataudmas.push([stataud[chto],chto]);
		for(var i=0;i<kolvoDni;i++){
			statpodnyammas[i].push([statpodnyam[i][chto],chto]);
		}
	}
	stataudmas=stataudmas.sort();
	stataudmas=stataudmas.T();
	
	jqplotBarRender('jqplot-pary',statpary,pary,0);
	jqplotBarRender('jqplot-dni' ,statdni ,dni ,0);
	jqplotBarRender('jqplot-aud' ,stataudmas[0],stataudmas[1],0);

	var podnyam=$('#jqplot-pary-po-dnyam')[0];
	for(var i=0;i<kolvoDni;i++){
		statpodnyammas[i]=statpodnyammas[i].sort();
		statpodnyammas[i]=statpodnyammas[i].T();
		var h3=document.createElement('h3');
		h3.innerHTML=dni[i];
		podnyam.appendChild(h3);
		var targdiv=document.createElement('div');
		targdiv.id='jqplot-podnyam-'+dni[i];
		podnyam.appendChild(targdiv);
		jqplotBarRender('jqplot-podnyam-'+dni[i],statpodnyammas[i][0],statpodnyammas[i][1],0);
	}
}

$('#textbase').val(JSON.stringify(base));
$(function(){
	$("#tabs").tabs();
	build();
});
