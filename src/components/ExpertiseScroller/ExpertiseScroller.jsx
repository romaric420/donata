import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './ExpertiseScroller.css'

const ExpertiseScroller = () => {
    const { t } = useLanguage()
    const [textIndex, setTextIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const texts = t.expertiseScroller.texts

    const floatingWords = [
        "Salesforce", "CRM Strategy", "Clienteling", "Luxury Retail",
        "Governance", "Transformation", "Program Delivery", "Roadmap",
        "Executive Steering", "Data Integrity", "Multi-Market", "PMO",
        "Change Management", "Adoption", "Stakeholder Alignment", "Risk Management",
        "Go-Live", "Rollout", "KPI Tracking", "Vendor Orchestration",
        "Performance", "ROI", "Digital Enablement", "Omnichannel",
        "Client Engagement", "Value Creation", "Retail Operations", "Business Continuity",
        "Decision Framework", "Haute Couture", "Maison", "Joaillerie",
        "Premium Retail", "EMEA", "Middle East", "Dubai",
        "Global Programs", "Enterprise CRM", "User Adoption", "Retail Excellence",
        "Sales Associates", "HQ Alignment", "Continuous Improvement", "Product Stabilization",
        "Run Optimization", "Independence", "Discipline", "Accountability",
        "Transparency", "Measurable Results", "Sustainable Impact", "Quality Assurance",
        "Structured Delivery", "Innovation", "PMP®", "Scrum",
        "Design Thinking", "Agile", "Best Practices", "Executive Visibility",
        "Market Intelligence", "Leadership", "Precision", "Excellence",
    ]

    useEffect(() => {
        const initialTimeout = setTimeout(() => setIsVisible(true), 500)
        const textInterval = setInterval(() => {
            setIsVisible(false)
            setTimeout(() => {
                setTextIndex((prev) => (prev + 1) % texts.length)
                setTimeout(() => setIsVisible(true), 150)
            }, 800)
        }, 6000)
        return () => { clearTimeout(initialTimeout); clearInterval(textInterval) }
    }, [texts.length])

    return (
        <section className="expertise-scroller" id="expertise-scroller">
            <div className="expertise-scroller__background" />
            <div className="expertise-scroller__glow expertise-scroller__glow--1" />
            <div className="expertise-scroller__glow expertise-scroller__glow--2" />

            {[
                { row: 1, slice: [0, 16], dir: 'left' },
                { row: 2, slice: [16, 32], dir: 'right' },
                { row: 3, slice: [32, 48], dir: 'left', slow: true },
                { row: 4, slice: [48, 64], dir: 'right', slow: true },
                { row: 5, slice: [0, 16], dir: 'left' },
            ].map(({ row, slice, dir, slow }) => (
                <div key={row} className={`expertise-scroller__row expertise-scroller__row--${row}`}>
                    <div className={`expertise-scroller__track expertise-scroller__track--${dir}${slow ? ' expertise-scroller__track--slow' : ''}`}>
                        {[...floatingWords.slice(...slice), ...floatingWords.slice(...slice)].map((w, i) => (
                            <span key={`r${row}-${i}`} className="expertise-scroller__word">{w}</span>
                        ))}
                    </div>
                </div>
            ))}

            <div className={`expertise-scroller__content ${isVisible ? 'visible' : 'hidden'}`}>
                <h2 className="expertise-scroller__title">{texts[textIndex]}</h2>
            </div>
            <div className="expertise-scroller__vignette" />
        </section>
    )
}

export default ExpertiseScroller
