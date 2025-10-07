import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/getCroppedImg"; // util abaixo
import { Image as ImageIcon } from "lucide-react";

type Props = {
  initialImage?: string | null; // base64 or URL
  onComplete: (base64: string) => void; // chamado quando salvar
  buttonLabel?: string;
  className?: string;
};

export default function ProfilePhotoUploader({
  initialImage,
  onComplete,
  buttonLabel = "Alterar foto",
  className,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null); // imagem enviada (DataURL)
  const [open, setOpen] = useState(false); // modal aberto
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // para mostrar preview (se não tiver imagem enviada, mostra initialImage)
  const previewSrc = imageSrc || initialImage || "";

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixelsLocal: any) => {
    setCroppedAreaPixels(croppedAreaPixelsLocal);
  }, []);

  const handleSave = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const base64 = await getCroppedImg(imageSrc, croppedAreaPixels);
      // chama o callback do pai com o base64 da imagem recortada
      onComplete(base64);
      // fecha modal e limpa estado temporário (opcional)
      setOpen(false);
      setImageSrc(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (err) {
      console.error("Erro ao gerar imagem recortada:", err);
    }
  }, [imageSrc, croppedAreaPixels, onComplete]);

  return (
    <div className={className ?? ""}>
      {/* preview da imagem atual */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={previewSrc || "/placeholder-profile.png"}
          alt="Perfil"
          className="config-avatar"
          style={{ width: 180, height: 180, objectFit: "cover", borderRadius: "50%" }}
        />

        {/* botão - estilo tipo link (sem fundo) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <button
          className="alterar-foto-btn"
          onClick={() => fileInputRef.current?.click()}
          style={{ marginTop: 8 }}
        >
          <ImageIcon size={14} style={{ marginRight: 6 }} />
          {buttonLabel}
        </button>
      </div>

      {/* Modal simples para o crop */}
      {open && (
        <div className="crop-modal-overlay">
          <div className="crop-modal">
            <h3 style={{ margin: 0, marginBottom: 12 }}>Editar foto de perfil</h3>

            <div className="crop-area">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={true}
                />
              )}
            </div>

            <div className="crop-controls">
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-range"
              />

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  className="crop-button crop-cancel"
                  onClick={() => {
                    setOpen(false);
                    setImageSrc(null);
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                  }}
                >
                  Cancelar
                </button>
                <button className="crop-button crop-save" onClick={handleSave}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
