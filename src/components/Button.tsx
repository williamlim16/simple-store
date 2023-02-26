type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

function Button(props: Props) {
  return (
    <button
      type="button"
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      {...props}
    />
  )
}
export default Button
