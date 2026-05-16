import React, {Component} from 'react';

const GIT_SHA = process.env.REACT_APP_GIT_SHA;
const COMMIT_URL = GIT_SHA ? `https://github.com/aktech/gitspace/commit/${GIT_SHA}` : null;

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>
                    Source code at <a className="footer-text" href="https://github.com/aktech/gitspace">Github</a>
                    {' • '}Made by <a className="footer-text" href="https://iamit.in/">Amit</a>
                    {GIT_SHA && (
                        <>
                            {' • '}Build <a className="footer-text" href={COMMIT_URL}><code>{GIT_SHA}</code></a>
                        </>
                    )}
                </p>
            </footer>
        )
    }
}

export default Footer;
