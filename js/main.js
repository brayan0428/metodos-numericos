const btnNR = document.getElementById("calcularNR");
if (btnNR != undefined) {
  btnNR.addEventListener("click", () => {
    try {
      let ecuacion = document.getElementById("txtEcuacion").value;
      if (ecuacion == "") {
        alert("Debe ingresar una ecuación");
        return;
      }
      var x = nerdamer(`diff(${ecuacion}, x)`);
      let derivada = x.toString();
      document.getElementById("txtDerivada").value = derivada;

      let xi = document.getElementById("txtValorInicial").value;
      if (xi == "") {
        alert("Debe ingresar un valor inicial");
        return;
      }
      let xiAnt = -100000;
      let html = "";
      i = 0;
      document.getElementById("bodyNR").innerHTML = "";
      while (xi != xiAnt && i <= 50) {
        xiAnt = xi;
        let fxi = nerdamer(ecuacion, { x: xi });
        let fxi_derivada = nerdamer(derivada, { x: xi });
        console.log(fxi.toString())
        console.log(fxi_derivada.toString())
        fxi = nerdamer(fxi.toString())
        console.log(fxi.toString())
        let division = fxi / fxi_derivada;
        xi = xiAnt - division;
        console.log(xi);
        html =
          html +
          `
          <tr>
            <td>${i}</td>
            <td>${parseFloat(xiAnt).toFixed(6)}</td>
            <td>${eval(fxi.toString()).toFixed(4)}</td>
            <td>${eval(fxi_derivada.toString()).toFixed(4)}</td>
            <td>${parseFloat(division).toFixed(4)}</td>
          </tr>
        `;
        i += 1;
        console.log(i)
      }
      if(i>= 50){
        alert('Error al procesar esta ecuación.')
        return
      }
      document.getElementById("bodyNR").innerHTML = html;
      let resultado = parseFloat(xiAnt).toFixed(6);
      document.getElementById(
        "lbResultado"
      ).innerText = `La solución a esta ecuación es ${resultado} con una aproximación de 6 decimales`;
    } catch (error) {
      alert(error.message);
    }
  });
}

const btnRF = document.getElementById("calcularRF");
if (btnRF != undefined) {
  btnRF.addEventListener("click", () => {
    let ecuacion = document.getElementById("txtEcuacion").value;
    if (ecuacion == "") {
      alert("Debe ingresar una ecuación");
      return;
    }
    let a = document.getElementById("txtRangoInicial").value;
    let b = document.getElementById("txtRangoFinal").value;
    if (a == "") {
      alert("Debe ingresar un valor inicial");
      return;
    }
    if (b == "") {
      alert("Debe ingresar un valor final");
      return;
    }

    let aAnt = 0;
    let bAnt = 0;
    let html = "";
    document.getElementById("bodyRF").innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      let fa = eval(nerdamer(ecuacion, { x: a }).toString());
      let fb = nerdamer(ecuacion, { x: b });
      let xi = (a * fb - b * fa) / (fb - fa);
      let fi = eval(nerdamer(ecuacion, { x: xi }).toString());
      html =
        html +
        `
        <tr>
        <td>${i}</td>
        <td>${decimales(a, 4)}</td>
        <td>${decimales(b, 4)}</td>
        <td>${decimales(fa, 4)}</td>
        <td>${decimales(fb, 4)}</td>
        <td>${decimales(xi, 4)}</td>
        <td>${decimales(fi, 4)}</td>
      </tr>
      `;
      if (fi < 0) {
        a = xi;
      } else {
        b = xi;
      }
    }
    document.getElementById("bodyRF").innerHTML = html;
  });
}

function decimales(valor, decimales) {
  return parseFloat(valor).toFixed(decimales);
}
