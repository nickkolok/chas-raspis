var pary=[
	"8:00-9:35",
	"9:45-11:20",
	"11:30-13:05",
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

var korpusa=[
	"1",
	"1а",
	"1б",
	"2",
	"3",
	"4",
	"5",
//	"5а",
	"6",
	"7",
	"8",
	"9",
//	"10",
];

var grpalias=[
/*	[/МАТ_1_2.1/g,"МАТ_1_2"],
	[/МАТ_2_2.1/g,"МАТ_2_2"],
	[/МАТ__4.1/g,"МАТ_4.1"],
	[/ПММ_1_ФИИТ_62/g,"ПММ_1_ФИИТ.62"],
	[/"ФИЗ_1_1"/g,"\"ФИЗ_1_1.1\",\"ФИЗ_1_1.2\""],
	[/"ФИЗ_1_2"/g,"\"ФИЗ_1_2.1\",\"ФИЗ_1_2.2\""],
	[/"ФИЗ_1_3"/g,"\"ФИЗ_1_3.1\",\"ФИЗ_1_3.2\""],
	[/"ФИЗ_1_5НТ"/g,"\"ФИЗ_1_5НТ.1\",\"ФИЗ_1_5НТ.2\""],
	[/"ФИЗ_1_6"/g,"\"ФИЗ_1_6.1\",\"ФИЗ_1_6.2\""],
	[/"ФИЗ_1_7"/g,"\"ФИЗ_1_7.1\",\"ФИЗ_1_7.2\""],
	[/"ФИЗ_1_8"/g,"\"ФИЗ_1_8.1\",\"ФИЗ_1_8.2\""],
*/
//	[/"ФИПСИ_5_2"/g,"\"ФИПСИ_5_2.1\",\"ФИПСИ_5_2.2\""],

//Следующее убрать!
//	[/"ПММ_1_[^"]*"/g,"\"\""],
//Чистка лишних пар БПФ

//	[/"БПФ_1_1"[^\]]/g,"\"\""],
	[/"БПФ_1_1"[",1-9]*]/g,"]"],
	[/"БПФ_БИОЛ[12]_[1-9]"/g,'""'],
	[/"ЖУР\(б\)_/g,'"ЖУР_'],
	[/"ЖУР_2жур_/g,'"ЖУР_2_жур'],
	[/a"],"grp":/g,'А"],"grp":'],
	[/а"],"grp":/g,'А"],"grp":'],
	[/б"],"grp":/g,'Б"],"grp":'],
	[/п"],"grp":/g,'П"],"grp":'],
	[/"1_3502П"/g,'"1_502П"'],
	[/"1_437\/438"/g,'""'],
	[/"1_480"/g,'"1а_480"'],
	[/"1_479"/g,'"1а_479"'],
	[/"1_478"/g,'"1а_478"'],
	[/"1_477"/g,'"1а_477"'],
	[/"1_290"/g,'"1а_290"'],
	[/"1_193"/g,'"1а_193"'],
	[/"1_лаб21"/g,'"1_21"'],
	[/"1_Л7"/g,'"1_7"'],
	[/"chzn":0,"aud":\["1_133\/21"\]/g,'"chzn":0,"aud":["1_133"]'],
	[/"chzn":1,"aud":\["1_133\/21"\]/g,'"chzn":0,"aud":["1_21"]'],
	[/"chzn":0,"aud":\["1_21\/30"\]/g,'"chzn":0,"aud":["1_21"]'],
	[/"chzn":1,"aud":\["1_21\/30"\]/g,'"chzn":0,"aud":["1_30"]'],
	[/"chzn":0,"aud":\["1_30\/21"\]/g,'"chzn":0,"aud":["1_30"]'],
	[/"chzn":1,"aud":\["1_30\/21"\]/g,'"chzn":0,"aud":["1_21"]'],
	[/"1_спорт зал"/g,'"?"'],
	[/"\?\?"/g,'"?"'],
	[/"-"/g,'"?"'],

	[/"1_(?=[0-9]+П")/g,'"1б_'],
	[/"1_лаб21"/g,'"1_21"'],

	[/"1_лаб"/g,'"?"'],
	[/"с\/з"/g,'"?"'],

	[/"1_лаБ"/g,'"?"'],
	[/"Юр_/g,'"ЮР_'],
	[/"ЭКО_2_1"/g,'"ЭКО_2_01"'],
	[/"ЭКО_2_2"/g,'"ЭКО_2_02"'],
	[/"ЭКО_3_1"/g,'"ЭКО_3_01"'],
	[/"ЭКО_3_2"/g,'"ЭКО_3_02"'],
	[/"ЭКО_4_1"/g,'"ЭКО_4_01"'],
	[/"ЭКО_4_2"/g,'"ЭКО_4_02"'],
	[/"ПММ_МОиАИС.9.1"/g,'""'],
	[/"ПММ_МОиАИС.9.2"/g,'""'],
	[/"ПММ_МОиАИС.91.1"/g,'""'],
	[/"ПММ_МОиАИС.91.2"/g,'""'],
	[/"ПММ_1_В\/О"/g,'"ПММ_1ВЕЧ_1"'],
	[/"ПММ_2_В\/О"/g,'"ПММ_2ВЕЧ_1"'],
	[/"ПММ_3_В\/О"/g,'"ПММ_3ВЕЧ_1"'],
	[/"ПММ_4_В\/О"/g,'"ПММ_4ВЕЧ_1"'],
	[/"ПММ_5_В\/О"/g,'"ПММ_5ВЕЧ_1"'],
	[/"ПММ_6_В\/О"/g,'"ПММ_6ВЕЧ_1"'],
	[/"ПММ_3_МОЭВМ.9"/g,'"ПММ_3_МОиАИС.9"'],
	[/"ПММ_3_МОЭВМ.91.1"/g,'"ПММ_3_МОиАИС.91.1"'],
	[/"ПММ_3_МОЭВМ.91.2"/g,'"ПММ_3_МОиАИС.91.2"'],
	[/"ПММ_3_МЕХ1.1"/g,'"ПММ_3_МЕХ.1.1"'],
	[/"ПММ_3_МЕХ1.2"/g,'"ПММ_3_МЕХ.1.2"'],
	[/"ПММ_2МАГ_14.МОиАИС12"/g,'"ПММ_2МАГ_МОиАИС12"'],
	[/"1_119Э"/g,'"5_119"'],
	[/"1_115Э"/g,'"5_115"'],
	[/"prep":["Хользунова","Мяснянкин"]/g,'"prep":["Мяснянкин"]'],
	[/"5_(213)"/g,'"5_213"'],
	[/"6_131а"/g,'"6_131А"'],
	[/"6_-"/g,'"?"'],
	[/"?_?"/g,'"?"'],
	[/"1_?"/g,'"?"'],
	[/"ФИЗ_1_В\/О"/g,'"ФИЗ_1_В\/О.1","ФИЗ_1_В\/О.2"'],
		
	[/"ФАРМ_СПО_1.1"/g,'"ФАРМ_1СПО_1"'],
	[/"ФАРМ_СПО_2.1"/g,'"ФАРМ_2СПО_1"'],
	

/*	[/"ФИЗ_2_1"/g,"\"ФИЗ_2_1.1\",\"ФИЗ_2_1.2\""],
	[/"ФИЗ_2_2"/g,"\"ФИЗ_2_2.1\",\"ФИЗ_2_2.2\""],
	[/"ФИЗ_2_3"/g,"\"ФИЗ_2_3.1\",\"ФИЗ_2_3.2\""],
	[/"ФИЗ_2_4"/g,"\"ФИЗ_2_4.1\",\"ФИЗ_2_4.2\""],
	[/"ФИЗ_2_5"/g,"\"ФИЗ_2_5.1\",\"ФИЗ_2_5.2\""],
	[/"ФИЗ_2_6"/g,"\"ФИЗ_2_6.1\",\"ФИЗ_2_6.2\""],
	[/"ФИЗ_2_7"/g,"\"ФИЗ_2_7.1\",\"ФИЗ_2_7.2\""],
	[/"ФИЗ_2_8\(ЯФиТ\)"/g,"\"ФИЗ_2_8(ЯФиТ).1\",\"ФИЗ_2_8(ЯФиТ).2\""],
*//*
	[/"ФИЗ_3_ОПТ"/g,"\"ФИЗ_3_ОПТ.1\",\"ФИЗ_3_ОПТ.2\""],
	[/"ФИЗ_3_ЭЛ"/g,"\"ФИЗ_3_ЭЛ.1\",\"ФИЗ_3_ЭЛ.2\""],
	[/"ФИЗ_3_ФИС"/g,"\"ФИЗ_3_ФИС.1\",\"ФИЗ_3_ФИС.2\""],
	[/"ФИЗ_3_ИС"/g,"\"ФИЗ_3_ИС.1\",\"ФИЗ_3_ИС.2\""],
	[/"ФИЗ_3_ЯД\+МФ"/g,"\"ФИЗ_3_ЯД+МФ.1\",\"ФИЗ_3_ЯД+МФ.2\""],
	[/"ФИЗ_3_ЯФиТ"/g,"\"ФИЗ_3_ЯФиТ.1\",\"ФИЗ_3_ЯФиТ.2\""],
	[/"ФИЗ_3_КТ"/g,"\"ФИЗ_3_КТ.1\",\"ФИЗ_3_КТ.2\""],
	[/"ФИЗ_3_МЭ"/g,"\"ФИЗ_3_МЭ.1\",\"ФИЗ_3_МЭ.2\""],
	[/"ФИЗ_3_ФТТиНС"/g,"\"ФИЗ_3_ФТТиНС.1\",\"ФИЗ_3_ФТТиНС.2\""],
	[/"ФИЗ_4_ОПТ"/g,"\"ФИЗ_4_ОПТ.1\",\"ФИЗ_4_ОПТ.2\""],
	[/"ФИЗ_4_ЭЛ"/g,"\"ФИЗ_4_ЭЛ.1\",\"ФИЗ_4_ЭЛ.2\""],
	[/"ФИЗ_4_КТ"/g,"\"ФИЗ_4_КТ.1\",\"ФИЗ_4_КТ.2\""],
	[/"ФИЗ_4_ФТТиНС"/g,"\"ФИЗ_4_ФТТиНС.1\",\"ФИЗ_4_ФТТиНС.2\""],
	[/МАТ_1_4.2/g,""],
	[/МАТ_1_4.1/g,"МАТ_1_4"],
	[/"ПММ_1_ПИ.10"/g,"\"ПММ_1_ПИВЮР.10\""],
	* */
];

var conflicts=[];
conflicts[-1]=[];

var podskaz={
	"МАТ":"Математический факультет",
	"БПФ":"Биолого-почвенный факультет",
	"ФАРМ":"Фармацевтический факультет",
	"РГФ":"Факультет романо-германской филологии",
	"ФИЛ":"Филологический факультет",
	"ФИЗ":"Физический факультет",
	"ХИМ":"Химический факультет",
	"ФМО":"Факультет международных отношений",
	"ГЕОЛ":"Геологический факультет",
	"ЭКО":"Экономический факультет",
	"ЮР":"Юридический факультет",
	"ГГИТ":"Факультет географии, геоэкологии и туризма",
	"ФКН":"Факультет компьютерных наук",
	"ПММ":"Факультет прикладной математики, информатики и механики",
	"ФИПСИ":"Факультет философии и психологии",
	"ИСТ":"Исторический факультет",
	"ЖУР":"Факультет журналистики",
	"ИНО":"Институт международного образования",
	"?":"Неизвестно",
};

var defaultNolist={};
for(var chto in podskaz){
	defaultNolist[chto]=1;
}
defaultNolist['МАТ']=0;
defaultNolist['?']=0;

for(var i=0;i<korpusa.length;i++){
	podskaz[korpusa[i]]='Корпус №'+korpusa[i];
	defaultNolist[korpusa[i]]=1;
}
defaultNolist[1]=0;
