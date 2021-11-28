import faqData from '../data/faqData.json'
import {GrAdd} from 'react-icons/gr'
import { IoIosAdd } from 'react-icons/io'
const FAQ: React.FC = () => {
    return (
        <div className="faq">
            <h1>Frequently Asked Questions</h1>

            {
                faqData.map(each => {
                    return (
                        <div key={each.question} className='faq-row'>
                            <button>{each.question} <IoIosAdd  /></button>
                            <p>{each.answer}</p>
                        </div>

                    )
                })
            }

        </div>
    )
}

export default FAQ
