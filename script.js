document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const result = document.getElementById('result');
    const tips = document.getElementById('tips');
  
    if (height > 0 && weight > 0) {
      const heightM = height / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(2);
      let status = '';
  
      if (bmi < 18.5) status = 'Underweight';
      else if (bmi < 24.9) status = 'Normal';
      else if (bmi < 29.9) status = 'Overweight';
      else status = 'Obese';
  
      result.textContent = `${name}, your BMI is ${bmi} (${status})`;
  
      // Send to PHP
      fetch('save_bmi.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `name=${name}&height=${height}&weight=${weight}&bmi=${bmi}&status=${status}`
      })
      .then(response => response.text())
      .then(data => tips.textContent = "Tip: " + data);
    } else {
      result.textContent = 'Enter valid height and weight.';
      tips.textContent = '';
    }
  });
  
