import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const donorData = JSON.parse(localStorage.getItem('donationDataList')) || [];

    const totalFood = donorData.reduce((sum, d) => sum + (parseFloat(d.foodData?.quantity) || 0), 0);
    const peopleServed = totalFood * 2; // assuming 0.5 kg per person
    const emissionSaved = totalFood * 2.5; // 2.5 kg CO₂-eq per kg food

    setAnalysis({ totalFood, peopleServed, emissionSaved });
  }, []);

  if (!analysis) return <p className="text-center mt-10">Calculating analysis...</p>;

  const chartData = {
    labels: ['🥘 Food Saved (kg)', '👥 People Served', '🌿 Emissions Prevented (kg CO₂-eq)'],
    datasets: [{
      data: [analysis.totalFood, analysis.peopleServed, analysis.emissionSaved],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
    }],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-100 py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">📈 Food Donation Analysis</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-3xl mx-auto border border-green-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2 border">Metric</th>
              <th className="px-4 py-2 border">Estimate</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-green-50">
              <td className="px-4 py-2 border">🥘 Food Saved</td>
              <td className="px-4 py-2 border">{analysis.totalFood.toFixed(2)} kg</td>
            </tr>
            <tr className="hover:bg-green-50">
              <td className="px-4 py-2 border">👥 People Served</td>
              <td className="px-4 py-2 border">{analysis.peopleServed}</td>
            </tr>
            <tr className="hover:bg-green-50">
              <td className="px-4 py-2 border">🌿 Emissions Prevented</td>
              <td className="px-4 py-2 border">{analysis.emissionSaved.toFixed(2)} kg CO₂-eq</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-800">🍰 Pie Chart Visualization</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AnalysisPage;
