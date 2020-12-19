import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { calculateSalaryFrom } from '../../components/calculoBase'
import ProgressLine from '../../components/progressiveLine'

function Salario() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [baseInss, setBaseInss] = useState(0);
  const [descontoInss, setDescontoInss] = useState(0);
  const [baseIrpf, setBaseIrpf] = useState(0);
  const [descontoIrpf, setDescontoIrpf] = useState(0);
  const [salarioLiquido, setSalarioLiquido] = useState(0);
  const [percentualDescontoIrpf, setPercentualDescontoIrpf] = useState(0);
  const [percentualDescontoInss, setPercentualDescontoInss] = useState(0);
  const [progressBar, setProgressBar] = useState([
    {
      name: "DescontoInss",
      percentage: "0%",
      color: "#e67e22"
    },
    {
      name: "DescontoIrpf",
      percentage: "0%",
      color: "#c0392b"
    }
  ]);

  useEffect(() => {
      progressBar.forEach((element) => {
        if(element.name == "DescontoIrpf"){
          let desconto = percentualDescontoIrpf;
          element.percentage = desconto + "%";
        }
        else {
          let desconto = percentualDescontoInss;
          element.percentage = "" + desconto + "%";
        }
      });
    progressBar[0].percentage = progressBar[0].percentage.split(".")[0] + "%"
    progressBar[1].percentage = progressBar[1].percentage.split(".")[0] + "%"
    setProgressBar(progressBar);

  }, [salarioBruto])

  const handleChangeSalario = (e) => {
    let salario = calculateSalaryFrom(e.target.value);
    
    setBaseInss(salario.baseINSS);
    setBaseIrpf(salario.baseIRPF);
    
    let percentualInss = ((salario.discountINSS * 100) / salario.baseINSS).toFixed(2);
    setPercentualDescontoInss(percentualInss);
    setDescontoInss("R$ " + salario.discountINSS + " (" + percentualInss + "%)");
    
    let percentualIrpf = ((salario.discountIRPF * 100) / salario.baseINSS).toFixed(2);
    setPercentualDescontoIrpf(percentualIrpf);
    setDescontoIrpf("R$ " + salario.discountIRPF + " (" + percentualIrpf + "%)");

    let percentualSalario = ((salario.netSalary * 100) / salario.baseINSS).toFixed(2);
    setSalarioLiquido("R$ " + salario.netSalary + " (" + percentualSalario + "%)");
    
    setSalarioBruto(e.target.value);
  }

    return (
      <div className="container">
        <div className="titulo">Calculadora de salário</div>
        <div className="text-field">
          <TextField autoFocus value={salarioBruto} onChange={handleChangeSalario} id="salario-bruto" label="Salário Bruto" 
            variant="outlined" className="grande" type="number" fullWidth />
        </div>
        <div className="text-field">
          <TextField value={baseInss} id="base-inss" label="Base INSS" variant="outlined" readOnly/>
          <TextField value={descontoInss} id="desconto-inss" label="Desconto INSS" variant="outlined" readOnly/>
          <TextField value={baseIrpf} id="base-irpf" label="Base IRPF" variant="outlined" readOnly/>
          <TextField value={descontoIrpf} id="desconto-irpf" label="Desconto IRPF" variant="outlined" readOnly/>
        </div>
        <div className="text-field">
          <TextField value={salarioLiquido} id="salario-liquido" label="Salário Líquido" variant="outlined" readOnly/>
        </div>
        <div className="multi-part-progress">
          <ProgressLine 
            backgroundColor="#16a085"
            visualParts={progressBar}/>
        </div>
        <style jsx>{`
          .container {
            margin: 80px 120px 0px 120px;
            padding: 20px;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
          }

          .titulo {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            color: gray;
            font-weight: 600;
            margin: 10px 5px 20px 5px;
          }

          .text-field {
            margin:10px;
            display flex;
            justify-content: space-between;
          }

          .MuiFormControl-root {
            margin-right: 10px ;
          }
        `}</style>
  
      </div>
    );
  } 

  export default Salario;