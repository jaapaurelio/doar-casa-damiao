import Image from "./Image";

export default function AboutChildren() {
  return (
    <div>
      <div className="pageWidthAlign">
        <h1>Quem Somos?</h1>
        <div>
          <Image src="/images/logo_casa_damiao.jpg"></Image>
        </div>
        A Casa Damião é uma resposta social inovadora no acolhimento temporário
        de crianças. Asseguramos assistência nos cuidados de saúde e garantimos
        um acolhimento confortável, seguro e digno num ambiente tanto quanto
        possível familiar.
      </div>
    </div>
  );
}
