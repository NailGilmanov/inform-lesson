
const quizData = [
  {
    question: 'Когда начался электронный этап?',
    a: 'в середине 20 века',
    b: '19 век',
    c: '21 век',
    correct: 'a',
  },
  {
    question: 'В каком году появились электронные калькуляторы',
    a: '1961',
    b: '1913',
    c: '1977',
    correct: 'a',
  },
  {
    question: 'Когда был создан первый компьютер?',
    a: '1946',
    b: '2005',
    c: '1995',
    correct: 'a',
  },
  {
    question: 'В каком году ученый Лейбниц изобрел устройство которое вычисляло квадратный корень?',
    a: '1673',
    b: '1955',
    c: '1903',
    correct: 'a',
  },
  {
    question: 'В каком году была разработана электромеханическая машина для двоичного сложения?',
    a: '1937',
    b: '1999',
    c: '1901',
    correct: 'a',
  },
  {
    question: 'В каком году  В СССР был разработан первый компьютер на микросхемах?',
    a: '1972',
    b: '1946',
    c: '1978',
    correct: 'a',
  },
];

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
}

function deselectAnswers() {
  answerElements.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submit.addEventListener('click', () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Ты ответил правильно лишь на ${score} из ${quizData.length} вопросов</h2>
            <h4>Надо было слушать Егора и Дениса лучше</h4>
            <button onclick="location.reload()">Начать сначала</button><br/>
            <button data-t data-ac onclick="pr()">Нажми и не пожалеешь</button>
            `;
    }
  }
});

function StartAnim() {
	const c = document.createElement("div");
	c.style.position = "fixed";
	c.style.top = `${-10}px`;
	c.style.left = `${-10}px`;
	c.style.width = `${1}px`;
	c.style.height = `${1}px`;
	c.style.border = `4px solid red`;
	c.style.zIndex = `99999`;
	c.style.borderRadius = "50%";
	c.style.pointerEvents = "none";
	c.style.transform = `translate(-50%, -50%) scale(1)`;
	c.style.transition = "width, height, border";
	c.style.transitionDuration = "250ms";
	c.style.boxShadow = "0 0 6px 3px blue";
	document.body.appendChild(c);
	let ac = false;

	window.addEventListener("mousemove", e =>
	{
		const x = e.clientX;
		const y = e.clientY;
		c.style.top = `${y}px`;
		c.style.left = `${x}px`;
		if (e.target?.getAttribute?.("data-ac"))
		{
			c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
			c.style.transition = "width, height, border";
			c.style.transitionDuration = "250ms";
			c.style.width = `${20}px`;
			c.style.height = `${20}px`;
			c.style.border = `2px solid red`;
			if (!ac) burst(x, y);
			ac = true;
		}
		else
		{
			ac = false;
			c.style.width = `${1}px`;
			c.style.height = `${1}px`;
			c.style.border = `4px solid red`;
		}
		const el = document.createElement("div");
		el.style.position = "fixed";
		el.style.top = `${y}px`;
		el.style.left = `${x}px`;
		const s = Math.random() * 10 + 10;
		el.style.width = `${s}px`;
		el.style.height = `${s}px`;
		el.style.transform = `translate(-50%, -50%) scale(1)`;
		el.style.transition = "transform";
		el.style.transitionDuration = "500ms";
		el.style.transitionTimingFunction = "cubic-bezier(1.000, -0.600, 0.475, 1.035)";
		el.style.borderRadius = "50%";
		el.style.pointerEvents = "none";
		el.style.backgroundColor = color(0.5);
		document.body.appendChild(el);
		setTimeout(() => el.style.transform = `translate(-50%, -50%) scale(0)`, 1);
		setTimeout(() => document.body.removeChild(el), 1500);
	});
	window.addEventListener("click", e =>
	{
		const x = e.clientX;
		const y = e.clientY;
		c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
		c.style.width = `${10}px`;
		c.style.height = `${10}px`;
		c.style.border = `2px solid red`;
		setTimeout(() =>
		{
			if (ac)
			{
				c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
				c.style.width = `${20}px`;
				c.style.height = `${20}px`;
				c.style.border = `2px solid red`;
			}
			else
			{
				c.style.width = `${1}px`;
				c.style.height = `${1}px`;
				c.style.border = `4px solid red`;
			}
		}, 150);
		burst(x, y);
	});
}

function color(a)
{
	const c = () => Math.floor(Math.random() * 255);
	return `rgba(${c()}, ${c()}, ${c()}, ${a})`;
}

function burst(x, y)
{
	for (let i = 0; i < 20; i++)
	{
		const el = document.createElement("div");
		el.style.position = "fixed";
		el.style.top = `${y}px`;
		el.style.left = `${x}px`;
		el.style.width = "5px";
		el.style.height = "5px";
		el.style.borderRadius = "50%";
		el.style.zIndex = "10";
		el.style.pointerEvents = "none";
		el.style.backgroundColor = color(0.8);
		document.body.appendChild(el);
		const dx = Math.random() * 3 - 1.5;
		let dy = Math.random() * -4 - 8;
		let X = x;
		let Y = y;
		let w = 0;
		const h = setInterval(() =>
		{
			X += dx;
			Y += dy;
			w += 1;
			dy += 0.4;
			el.style.top = `${Y}px`;
			el.style.left = `${X}px`;
			if (w > 250)
			{
				clearInterval(h);
				document.body.removeChild(el);
			}
		}, 20);
	}
}

StartAnim();

function coolAnim(el) {
	const o = { current: null };
	const m = Math.random() * 1 - 0.5;
	const d = Math.random() * 70 + 10;
	window.addEventListener("scroll", e =>
	{
		if (!o.current) return;
		if (o.current.getAttribute("data-da")) return;
		if (o.current.parentElement.id != "coolAnim")
		{
			const el = o.current.cloneNode(true);
			const el2 = o.current.cloneNode(true);
			el.id = "coolAnim";
			el.style.position = "relative";
			el.style.display = "inline-block";
			el.innerHTML = "";
			const p = o.current.parentElement;
			p.insertBefore(el, o.current);
			el.appendChild(el2);
			el.appendChild(o.current);
			el2.style.margin = "0";
			el2.style.opacity = "0";
			el2.removeAttribute("data-t");
			el.removeAttribute("data-t");
		}
		o.current.style.margin = "0";
		o.current.style.position = "absolute";
		o.current.style.top = `${window.scrollY * m % d}px`;
		o.current.style.left = `0px`;
		o.current.style.height = `100%`;
		o.current.style.zIndex = `10`;
	});
	return o;
}

let dpr_a = false;
function dpr()
{
	if (dpr_a) return;
	dpr_a = true;
	const els = document.body.querySelectorAll("*:not(#root):not(#root > div)");
	const rects = []
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		rects.push(el.getBoundingClientRect());
		let x = rects[i].left;
		let y = rects[i].top;
		let dy = 0;
		setTimeout(() =>
		{
			document.body.appendChild(el);
			el.setAttribute("data-da", true);
			el.style.position = "fixed";
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			el.style.width = `${rects[i].width}px`;
			el.style.height = `${rects[i].height}px`;
			el.style.transition = "transform";
			el.style.transitionDuration = "100ms";

		}, 1);
		setTimeout(() =>
		{
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			let r = Math.floor(Math.random() * 10) - 5;
			el.style.transform = `rotate(${r}deg)`;
			el.style.transformOrign = Math.random() > 0.5 ? "top left" : "top right";

			setTimeout(() =>
			{
				let w = 0;
				const h = setInterval(() =>
				{
					w += 1;
					dy += 0.2;
					y += dy;
					el.style.top = `${y}px`;
					if (r > 0) r += 0.6;
					else r -= 0.6;
					el.style.transform = `rotate(${r}deg)`;
					if (w > 250)
						clearInterval(h);

				}, 25);
			}, Math.floor(Math.random() * 800) + 400);
		}, Math.floor(Math.random() * 1600) + 600);
	}
}

function pr()
{
	if (dpr_a) return;
	dpr_a = true;
	const w = window.innerWidth;
	const h = window.innerHeight;
	const els = document.body.querySelectorAll("[data-t]");
	const letters = [];
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		// el.style.color = "transparent";
		const t = el.innerText;
		el.innerHTML = ""
		const s = getComputedStyle(el);
		for (let j = 0; j < t.length; j++)
		{
			const l = t[j];
			const ch = document.createElement("span");
			ch.innerText = l;
			ch.style.color = s.color;
			ch.style.fontSize = s.fontSize;
			el.appendChild(ch);
			letters.push(ch);
		}
	}
	sf();
	const b = document.createElement("div");
	b.style.backgroundColor = "transparent";
	b.style.position = "fixed";
	b.style.top = "0";
	b.style.left = "0";
	b.style.width = "100%";
	b.style.height = "100%";
	b.style.zIndex = "100";
	b.style.transition = "background-color";
	b.style.transitionDuration = "500ms";
	document.body.appendChild(b);
	setTimeout(() =>
	{
		b.style.backgroundColor = "black";
	}, 1);

		const t = "Автор сего ШЕДЕВРА";
	setTimeout(() =>
	{
	for (let i = 0; i < letters.length; i++)
	{
		const ch = letters[i];
		const p = [];
		for (let j = 0; j < t.length; j++)
		{
			if (ch.innerText.toLowerCase() == t[j].toLowerCase())
				p.push(j);
		}
		let X = 0;
		let Y = 0;
		let v = 0;
		if (p.length > 0)
		{
			v = p[Math.floor(Math.random() * p.length)];
			Y = (h - 100) / 2 - 90;
			X = (w - 100) / 2 + v * 15 - 120;
		}
		else
		{
			Y = Math.sin(i / 15) * (150 + 100 * (i / 100) / (2 * Math.PI)) + (h - 100) / 2;
			X = Math.cos(i / 15) * (150 + 100 * (i / 100) / (2 * Math.PI)) + (w - 100) / 2;
		}
		const rect = ch.getBoundingClientRect();
		ch.style.transition = "left, top";
		ch.style.zIndex = "100000";
		ch.style.transitionDuration = "500ms";
		setTimeout(() =>
		{
			ch.style.left = `${X}px`;
			ch.style.top = `${Y}px`;
			if (p.length > 0)
			{
				ch.style.fontFamily = "Arial";
				ch.style.fontSize = "16px";
				ch.innerText = t[v];
			}
		}, Math.floor(Math.random() * 100) + 1050);
	}
	}, 10)
	function crI(src, x, y, W, H, href)
	{
		const a = document.createElement("a");
		if (href) a.href = href;
		const img = document.createElement("img");
		a.appendChild(img);
		img.style.width = "100%";
		img.style.height = "100%";
		img.src = src;
		a.style.position = "fixed";
		a.style.top = `${(h - 100) / 2 + y}px`;
		a.style.left = `${(w - 100) / 2 + x}px`;
		a.style.width = `${W}px`;
		a.style.height = `${H}px`;
		a.style.zIndex = "101";
		a.style.transition = "opacity";
		a.style.transitionDuration = "500ms";
		img.style.borderRadius = "20px";
		a.style.opacity = "0";
		if (href)
		{
			a.target = "_blank";
			a.setAttribute("data-ac", "true");
			img.setAttribute("data-ac", "true");
		}
		document.body.appendChild(a);
		setTimeout(() =>
		{
			a.style.opacity = "1";
		}, Math.floor(Math.random() * 100) + 10);
	}
	setTimeout(() =>
	{
		crI("./avatar.jpg", -60, -50, 120, 120);
		crI("./Dark_gh-logo.svg", -90, 80, 50, 50, "https://github.com/NailGilmanov");
		crI("./TG-logo.svg", 40, 80, 50, 50, "https://t.me/mdaamn");
	}, 1300);
}

function sf()
{
	const els = document.body.querySelectorAll("*:not(#root):not(#root > div)");
	const rects = []
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		rects.push(el.getBoundingClientRect());
		let x = rects[i].left;
		let y = rects[i].top;
		setTimeout(() =>
		{
			document.body.appendChild(el);
			el.setAttribute("data-da", true);
			el.style.position = "fixed";
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			el.style.width = `${rects[i].width}px`;
			el.style.height = `${rects[i].height}px`;
			el.style.transition = "transform";
			el.style.transitionDuration = "100ms";
		}, 1);
	}
}
