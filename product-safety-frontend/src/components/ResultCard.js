import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, YAxis, CartesianGrid, LabelList } from 'recharts';
import './ResultCard.css';

// Utility function to determine colors based on grade
const getColor = (grade) => {
  switch (grade) {
    case 'Unknown':
      return { background: '#6b7280', text: '#d1d5db', border: '#4b5563' };
    case '1':
      return { background: '#10b981', text: '#d1fae5', border: '#059669' };
    case '3':
      return { background: '#f59e0b', text: '#fef3c7', border: '#d97706' };
    case '5':
      return { background: '#ef4444', text: '#fee2e2', border: '#dc2626' };
    default:
      return { background: '#1e3a8a', text: '#dbeafe', border: '#1e40af' };
  }
};

const ResultCard = React.memo(({ result }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  const chartData = useMemo(() => {
    if (!result?.gradedIngredients || !Array.isArray(result.gradedIngredients)) {
      return {
        safePercentage: 0,
        pieData: [
          { name: 'Safe', value: 0 },
          { name: 'Other', value: 0 },
        ],
        barData: [
          { name: 'Safe', count: 0, fill: '#10b981' },
          { name: 'Moderate', count: 0, fill: '#f59e0b' },
          { name: 'Unsafe', count: 0, fill: '#ef4444' },
          { name: 'Unknown', count: 0, fill: '#6b7280' },
        ],
      };
    }

    const total = result.gradedIngredients.length;
    const counts = {
      safe: result.gradedIngredients.filter(item => item.grade === '1').length,
      moderate: result.gradedIngredients.filter(item => item.grade === '3').length,
      unsafe: result.gradedIngredients.filter(item => item.grade === '5').length,
      unknown: result.gradedIngredients.filter(item => item.grade === 'Unknown').length,
    };
    const safePercentage = total > 0 ? Math.round((counts.safe / total) * 100) : 0;

    return {
      safePercentage,
      pieData: [
        { name: 'Safe', value: counts.safe },
        { name: 'Other', value: total - counts.safe },
      ],
      barData: [
        { name: 'Safe', count: counts.safe, fill: '#10b981' },
        { name: 'Moderate', count: counts.moderate, fill: '#f59e0b' },
        { name: 'Unsafe', count: counts.unsafe, fill: '#ef4444' },
        { name: 'Unknown', count: counts.unknown, fill: '#6b7280' },
      ],
    };
  }, [result]);

  const PIE_COLORS = ['#10b981', '#6b7280'];

  if (!result?.gradedIngredients || !Array.isArray(result.gradedIngredients)) {
    return (
      <div className={`report-card ${isLoaded ? 'loaded' : ''}`}>
        <header className="report-header">
          <h1 className="report-title">Analysis Error</h1>
          <p className="report-subtitle">Unable to generate report due to invalid data.</p>
        </header>
      </div>
    );
  }

  return (
    <div className={`report-card ${isLoaded ? 'loaded' : ''}`} role="document" aria-label="Safety Analysis Report">
      <header className="report-header">
        <h1 className="report-title">Safety Analysis Report</h1>
        <p className="report-subtitle">
          Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <section className="report-section summary">
        <h2 className="section-title">Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Ingredients</span>
            <span className="summary-value">{result.gradedIngredients.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Safety Score</span>
            <span className={`summary-value ${chartData.safePercentage >= 60 ? 'safe' : 'warning'}`}>
              {chartData.safePercentage}%
            </span>
          </div>
        </div>
      </section>

      <section className="report-section product-details">
        <h2 className="section-title">Product Snapshot</h2>
        <div className="product-container">
          <img
            src={result.url}
            alt="Product"
            className="product-image"
            loading="lazy"
            onError={(e) => (e.target.src = '/fallback-image.jpg')}
          />
        </div>
      </section>

      <section className="report-section ingredients">
        <h2 className="section-title">Ingredient Breakdown</h2>
        <div className="ingredients-list">
          {result.gradedIngredients.length > 0 ? (
            result.gradedIngredients.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="ingredient-item"
                style={{
                  backgroundColor: getColor(item.grade).background,
                  color: getColor(item.grade).text,
                  borderColor: getColor(item.grade).border,
                }}
              >
                <span className="ingredient-name">{item.name || 'Unnamed'}</span>
                <span className="ingredient-grade">Grade: {item.grade || 'N/A'}</span>
              </div>
            ))
          ) : (
            <p className="no-data">No ingredients to display</p>
          )}
        </div>
      </section>

      <section className="report-section insights">
        <h2 className="section-title">Safety Insights</h2>
        <div className="insights-grid">
          <div className="chart-box">
            <h3 className="chart-title">Safety Distribution</h3>
            <PieChart width={350} height={350}>
              <Pie
                data={chartData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={{ stroke: '#ffffff', strokeWidth: 1 }}
              >
                {chartData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} items`, name]} />
              <Legend verticalAlign="bottom" iconType="circle" height={50} />
            </PieChart>
          </div>
          <div className="chart-box">
            <h3 className="chart-title">Grade Breakdown</h3>
            <BarChart width={350} height={350} data={chartData.barData} margin={{ top: 50, right: 30, bottom: 30, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <YAxis stroke="#ffffff" tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => `${value} items`} />
              <Bar dataKey="count" barSize={40} radius={[6, 6, 0, 0]}>
                {chartData.barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="name"
                  position="top"
                  angle={-90}
                  offset={10}
                  fill="#ffffff"
                  fontSize={14}
                />
              </Bar>
            </BarChart>
          </div>
        </div>
        <p className="insights-summary">
          {chartData.safePercentage >= 60
            ? `✅ Product is ${chartData.safePercentage}% safe`
            : `⚠️ Product safety is only ${chartData.safePercentage}%`}
        </p>
      </section>
    </div>
  );
});

export default ResultCard;