import { Helmet } from 'react-helmet'

interface TitleProps {
    title: string
}

export default function Title({ title }: TitleProps) {
    return <Helmet>
        <title>{title}</title>
    </Helmet>
}