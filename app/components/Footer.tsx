export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-bold tracking-tight text-foreground">
              FAMA<span className="text-accent">.</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Tu copiloto financiero personal.
              <br />
              Hecho para Colombia.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Producto</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#como-funciona" className="transition-colors hover:text-foreground">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-foreground">
                  Precios
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#faq" className="transition-colors hover:text-foreground">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="mailto:info@example.com" className="transition-colors hover:text-foreground">
                  info@example.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Términos de servicio
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} FAMA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
