export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="text-xl font-bold tracking-tight text-foreground">
              FAMA<span className="text-accent">.</span>
            </a>
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
                <a href="/como-funciona" className="transition-colors hover:text-foreground">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="/simulador" className="transition-colors hover:text-foreground">
                  Simulador
                </a>
              </li>
              <li>
                <a href="/precios" className="transition-colors hover:text-foreground">
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
                <a href="/faq" className="transition-colors hover:text-foreground">
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

          {/* Cuenta */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Cuenta</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="/login" className="transition-colors hover:text-foreground">
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a href="/signup" className="transition-colors hover:text-foreground">
                  Crear cuenta gratis
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
