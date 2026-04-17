/*
 * CVTemplateRenderer — renders the actual CV document in different template styles
 * Used both for live preview and PDF export
 */
import React from 'react';
import { CVData, TemplateId } from '@/lib/types';

interface CVTemplateRendererProps {
  data: CVData;
  templateId: TemplateId;
  accentColor: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function SkillLevel({ level, color }: { level: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: i <= level ? color : '#e5e7eb',
          }}
        />
      ))}
    </div>
  );
}

// ===== CLASSIC TEMPLATE =====
function ClassicTemplate({ data, accentColor }: { data: CVData; accentColor: string }) {
  const { personal, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'experience':
        if (!experience.length) return null;
        return (
          <div key="experience" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>
                Work Experience
              </h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</div>
                    <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && <p style={{ fontSize: '10.5px', color: '#374151', margin: '4px 0', lineHeight: '1.5' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '14px' }}>
                    {exp.achievements.map((a, i) => (
                      <li key={i} style={{ fontSize: '10.5px', color: '#374151', lineHeight: '1.5', marginBottom: '2px' }}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      case 'education':
        if (!education.length) return null;
        return (
          <div key="education" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>Education</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                    <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600' }}>{edu.institution}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.gpa && <div style={{ fontSize: '10px', color: '#6b7280' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        );
      case 'skills':
        if (!skills.length) return null;
        return (
          <div key="skills" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>Skills</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map(skill => (
                <span key={skill.id} style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', backgroundColor: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30`, fontWeight: '500' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects.length) return null;
        return (
          <div key="projects" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>Projects</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{proj.name}</div>
                <p style={{ fontSize: '10.5px', color: '#374151', margin: '3px 0', lineHeight: '1.5' }}>{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {proj.technologies.map((t, i) => (
                      <span key={i} style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', backgroundColor: '#f3f4f6', color: '#6b7280' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'certifications':
        if (!certifications.length) return null;
        return (
          <div key="certifications" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>Certifications</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            {certifications.map(cert => (
              <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}</div>
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>{formatDate(cert.date)}</div>
              </div>
            ))}
          </div>
        );
      case 'languages':
        if (!languages.length) return null;
        return (
          <div key="languages" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: 0 }}>Languages</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: accentColor, opacity: 0.3 }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {languages.map(lang => (
                <div key={lang.id} style={{ fontSize: '10.5px', color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ color: '#9ca3af' }}> · {lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", backgroundColor: 'white', color: '#111827', padding: '40px', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${accentColor}`, paddingBottom: '16px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.5px', fontFamily: "'Sora', sans-serif" }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '14px', color: accentColor, fontWeight: '600', marginBottom: '8px' }}>
          {personal.jobTitle || 'Job Title'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10px', color: '#6b7280' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>
      {personal.summary && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{personal.summary}</p>
        </div>
      )}
      {sectionOrder.map(key => renderSection(key))}
    </div>
  );
}

// ===== MODERN TEMPLATE (Two-column with dark sidebar) =====
function ModernTemplate({ data, accentColor }: { data: CVData; accentColor: string }) {
  const { personal, experience, education, skills, languages } = data;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", backgroundColor: 'white', color: '#111827', display: 'flex', minHeight: '297mm' }}>
      {/* Left sidebar */}
      <div style={{ width: '35%', backgroundColor: accentColor, color: 'white', padding: '32px 20px', flexShrink: 0 }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}>
            {(personal.fullName || 'U').charAt(0)}
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', fontFamily: "'Sora', sans-serif", lineHeight: '1.2' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: '500' }}>{personal.jobTitle}</div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px', fontWeight: '700' }}>Contact</h3>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((item, i) => (
            <div key={i} style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.9, wordBreak: 'break-all' }}>{item}</div>
          ))}
        </div>
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px', fontWeight: '700' }}>Skills</h3>
            {skills.map(skill => (
              <div key={skill.id} style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '10px', marginBottom: '3px', fontWeight: '500' }}>{skill.name}</div>
                <SkillLevel level={skill.level} color="rgba(255,255,255,0.9)" />
              </div>
            ))}
          </div>
        )}
        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px', fontWeight: '700' }}>Languages</h3>
            {languages.map(lang => (
              <div key={lang.id} style={{ fontSize: '10px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>{lang.name}</span>
                <span style={{ opacity: 0.7 }}> · {lang.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Right content */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        {personal.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: '0 0 8px 0' }}>Profile</h2>
            <p style={{ fontSize: '10.5px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{personal.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: '0 0 10px 0' }}>Work Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `2px solid ${accentColor}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>{formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                </div>
                <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600', marginBottom: '4px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '10px', color: '#374151', margin: '0', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: accentColor, margin: '0 0 10px 0' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `2px solid ${accentColor}30` }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600' }}>{edu.institution}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af' }}>{formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== CREATIVE TEMPLATE =====
function CreativeTemplate({ data, accentColor }: { data: CVData; accentColor: string }) {
  const { personal, experience, education, skills, projects } = data;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", backgroundColor: 'white', color: '#111827', padding: '40px', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '-1px', fontFamily: "'Sora', sans-serif" }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ width: '60px', height: '3px', backgroundColor: accentColor, marginBottom: '8px' }} />
        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>{personal.jobTitle}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: '#9ca3af' }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
        <div>
          {personal.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, margin: '0 0 8px 0' }}>Profile</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{personal.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, margin: '0 0 8px 0' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '20px', backgroundColor: skill.level >= 4 ? accentColor : `${accentColor}20`, color: skill.level >= 4 ? 'white' : accentColor, fontWeight: '600' }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, margin: '0 0 8px 0' }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}</div>
                  <div style={{ fontSize: '10px', color: accentColor, fontWeight: '600' }}>{edu.institution}</div>
                  <div style={{ fontSize: '9px', color: '#9ca3af' }}>{formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, margin: '0 0 10px 0' }}>Experience</h2>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: '14px', position: 'relative', paddingLeft: '16px' }}>
                  <div style={{ position: 'absolute', left: 0, top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accentColor }} />
                  {i < experience.length - 1 && <div style={{ position: 'absolute', left: '3.5px', top: '12px', bottom: '-14px', width: '1px', backgroundColor: `${accentColor}30` }} />}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</div>
                    <div style={{ fontSize: '9px', color: '#9ca3af' }}>{formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: accentColor, fontWeight: '600', marginBottom: '3px' }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', margin: 0, lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, margin: '0 0 8px 0' }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{proj.name}</div>
                  <p style={{ fontSize: '10px', color: '#374151', margin: '2px 0', lineHeight: '1.5' }}>{proj.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {proj.technologies.map((t, i) => (
                      <span key={i} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', backgroundColor: '#f3f4f6', color: '#6b7280' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== EXECUTIVE TEMPLATE (serif, premium) =====
function ExecutiveTemplate({ data, accentColor }: { data: CVData; accentColor: string }) {
  const { personal, experience, education, skills, certifications } = data;

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", backgroundColor: 'white', color: '#111827', padding: '48px', minHeight: '297mm' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '400', color: '#111827', margin: '0 0 6px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '13px', color: accentColor, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontFamily: "'DM Sans', sans-serif" }}>
          {personal.jobTitle}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: '#6b7280', fontFamily: "'DM Sans', sans-serif" }}>
          {[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      {personal.summary && (
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.8', margin: 0, fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}>{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '3px', color: '#111827', margin: '0 0 12px 0', textAlign: 'center' }}>
            Professional Experience
          </h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: accentColor, margin: '0 auto 16px' }} />
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '13px', fontWeight: '400', color: '#111827' }}>{exp.position}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontFamily: "'DM Sans', sans-serif" }}>{formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
              </div>
              <div style={{ fontSize: '11px', color: accentColor, marginBottom: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '600' }}>{exp.company}</div>
              {exp.description && <p style={{ fontSize: '10.5px', color: '#374151', margin: 0, lineHeight: '1.6', fontFamily: "'DM Sans', sans-serif" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '3px', color: '#111827', margin: '0 0 12px 0', textAlign: 'center' }}>Education</h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: accentColor, margin: '0 auto 16px' }} />
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: '400', color: '#111827' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
              <div style={{ fontSize: '11px', color: accentColor, fontFamily: "'DM Sans', sans-serif", fontWeight: '600' }}>{edu.institution}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontFamily: "'DM Sans', sans-serif" }}>{formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '12px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '3px', color: '#111827', margin: '0 0 12px 0', textAlign: 'center' }}>Expertise</h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: accentColor, margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', fontFamily: "'DM Sans', sans-serif" }}>
            {skills.map(skill => (
              <span key={skill.id} style={{ fontSize: '10px', color: '#374151' }}>
                {skill.name}{skills.indexOf(skill) < skills.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MINIMAL TEMPLATE =====
function MinimalTemplate({ data, accentColor }: { data: CVData; accentColor: string }) {
  const { personal, experience, education, skills, projects } = data;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", backgroundColor: 'white', color: '#111827', padding: '48px', minHeight: '297mm' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', fontFamily: "'Sora', sans-serif" }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>{personal.jobTitle}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10px', color: '#9ca3af' }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7', margin: 0, borderLeft: `3px solid ${accentColor}`, paddingLeft: '12px' }}>{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af', margin: '0 0 12px 0' }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '14px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af', paddingTop: '2px' }}>
                <div>{formatDate(exp.startDate)}</div>
                <div>— {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</div>
                <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600', marginBottom: '3px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '10px', color: '#374151', margin: 0, lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af', margin: '0 0 12px 0' }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>{formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600' }}>{edu.institution}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af', margin: '0 0 10px 0' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map(skill => (
              <span key={skill.id} style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#374151' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CVTemplateRenderer({ data, templateId, accentColor }: CVTemplateRendererProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern': return <ModernTemplate data={data} accentColor={accentColor} />;
      case 'creative': return <CreativeTemplate data={data} accentColor={accentColor} />;
      case 'executive': return <ExecutiveTemplate data={data} accentColor={accentColor} />;
      case 'minimal': return <MinimalTemplate data={data} accentColor={accentColor} />;
      default: return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return <div style={{ width: '794px', minHeight: '1123px', backgroundColor: 'white' }}>{renderTemplate()}</div>;
}
