import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = function getArticle(){
    return(`
    <article>
        <div id="intro">
            <div>
                <h2>This is CatBet Casino</h2>
            </div>
            <p>Here you can bet all your hard earned money into virtual cats</p>
            <p>The developers of this site are eagerly awaiting your review on the randomnes of the cats</p>
            <div>
                <h3>How does it work? you may ask</h3>
            </div>
            <p>Well it's pretty easy when you start to understand it.</p>
            <ol>
                <li><p>we made a homepage that is rendered using javascript</p></li>
                <li><p>then we E X P A N D to other pages to keep html files to a minimum</p></li>
                <li><p>and then we profit</p></li>
            </ol>
            <p style="font-size:6px;">*i was told i can write anything i want here and that's exactly what i did</p>
            <div>    
                <h3>Scrolling down you can see a calendar of the now racing/already raced and future racing cats</h3>
            </div>
        </div>
        <div id="calendar">
            <h2 align="center" style="color: orange;">
                January 2021
            </h2>
            <br />
        
            <table bgcolor="lightgrey" align="center" 
                cellspacing="21" cellpadding="21">
        
                <!-- The tr tag is used to enter 
                    rows in the table -->
        
                <!-- It is used to give the heading to the
                    table. We can give the heading to the 
                    top and bottom of the table -->
        
                <caption align="top">
                    <!-- Here we have used the attribute 
                        that is style and we have colored 
                        the sentence to make it better 
                        depending on the web page-->
                </caption>
        
                <!-- Here th stands for the heading of the
                    table that comes in the first row-->
        
                <!-- The text in this table header tag will 
                    appear as bold and is center aligned-->
        
                <thead>
                    <tr>
                        <!-- Here we have applied inline style 
                            to make it more attractive-->
                        <th style="color: white; background: purple;">
                            Sun</th>
                        <th style="color: white; background: purple;">
                            Mon</th>
                        <th style="color: white; background: purple;">
                            Tue</th>
                        <th style="color: white; background: purple;">
                            Wed</th>
                        <th style="color: white; background: purple;">
                            Thu</th>
                        <th style="color: white; background: purple;">
                            Fri</th>
                        <th style="color: white; background: purple;">
                            Sat</th>
                    </tr>
                </thead>
        
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>31</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </article>
    `);
}

var acasaHTML = '';
export default function buildHome(){
    acasaHTML = 
    Header +
    Navbar +
    Article() +
    Footer;
    return acasaHTML;
}
buildHome();