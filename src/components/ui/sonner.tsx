import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {
  theme?: string
}

const Toaster = ({ theme: customTheme, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={(customTheme || theme) as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }