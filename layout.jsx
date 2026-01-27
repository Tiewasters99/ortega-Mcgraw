import './globals.css'

export const metadata = {
  title: 'Stephanie Peloso v. Curtis McGraw, et al.',
  description: 'Demonstrative Exhibit - AAA Case No. 01-25-0001-8558',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
