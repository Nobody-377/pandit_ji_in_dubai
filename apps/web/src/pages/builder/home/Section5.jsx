import React, { useRef, useState, useEffect } from 'react';
import './Section5.css';

const steps = [
	{
		number: '01',
		title: 'Choose your puja',
		description:
			'Browse the ceremony or simply describe the occasion. pandit Ji will advise which ritual fits',
	},
	{
		number: '02',
		title: 'Contact & fix a date',
		description:
			'Call,WhatsApp or send the form,Muhurat options,duration and a clear price come back the same day.',
	},
	{
		number: '03',
		title: 'We arrange everythings',
		description:
			'Samagri,havan kund,idols and prasad items are prepared. You receive a short checklist of what to keep ready.',
	},
	{
		number: '04',
		title: 'Ceremony performed',
		description:
			'Pandit Ji arrives early, sets up and performs the full rituals with translation, Aarti and blessings',
	},
];

export default function Section5() {
	const gridRef = useRef(null);
	const [activeIdx, setActiveIdx] = useState(0);

	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const handleScroll = () => {
			const scrollLeft = grid.scrollLeft;
			const cardWidth = grid.querySelector('.section-steps-card')?.offsetWidth || 260;
			const newIdx = Math.round(scrollLeft / cardWidth);
			setActiveIdx(Math.min(Math.max(newIdx, 0), steps.length - 1));
		};

		grid.addEventListener('scroll', handleScroll, { passive: true });
		return () => grid.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToStep = (index) => {
		const grid = gridRef.current;
		if (!grid) return;
		const cards = grid.querySelectorAll('.section-steps-card');
		if (cards[index]) {
			cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	};

	return (
		<section
			id="bq9G53"
			className="block section-steps-block"
			data-block-id="bq9G53"
		>
			<div className="section-steps-container">
				<div className="section-steps-header">
					<h5
						className="section-steps-eyebrow"
						style={{ color: 'rgb(229, 179, 97)' }}
					>
						H O W &nbsp; I T &nbsp; W O R K S
					</h5>
					<h2
						className="section-steps-heading"
						style={{ color: 'rgb(140, 43, 29)' }}
					>
						Four simple steps to a ceremony done properly
					</h2>
				</div>
				<div className="section-steps-grid" ref={gridRef}>
					{steps.map((step) => (
						<div key={step.number} className="section-steps-card">
							<h3
								className="section-steps-card-title"
								style={{ color: 'rgb(140, 43, 29)' }}
							>
								{step.title}
							</h3>
							<div className="section-steps-card-body">
								<span
									className="section-steps-card-number"
									style={{ color: 'rgb(229, 179, 97)' }}
								>
									{step.number}
								</span>
								<p className="section-steps-card-text">{step.description}</p>
							</div>
						</div>
					))}
				</div>
				<div className="section-steps-dots" aria-label="Step carousel navigation">
					{steps.map((step, idx) => (
						<button
							key={step.number}
							type="button"
							className={`section-steps-dot ${activeIdx === idx ? 'active' : ''}`}
							onClick={() => scrollToStep(idx)}
							aria-label={`Go to step ${step.number}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
