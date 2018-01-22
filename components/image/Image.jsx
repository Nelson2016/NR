import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from "./style/image.scss";

class Image extends React.Component {

    onLoad() {
        this.imageCover.classList.add(styles["n-active"]);
    }

    componentDidMount() {
        this.image.complete && this.onLoad();
    }

    setSrc(src) {
        this.image.src = src;
        this.imageCover.style.backgroundImage = "url('" + src + "')";
    }

    render() {
        return <div className={styles["n-image"]} style={{width: this.props.width, height: this.props.height}}>
            <div className={styles["n-image-cover"]}
                 ref={e => this.imageCover = e}
                 style={{backgroundImage: "url('" + this.props.src + "')"}}>
                <img ref={e => this.image = e}
                     src={this.props.src}
                     onLoad={this.onLoad.bind(this)}
                     alt={this.props.alt}/>
            </div>
            <i className={fonts['icon-loading']} data-icon></i>
        </div>;
    }
}

export default Image;