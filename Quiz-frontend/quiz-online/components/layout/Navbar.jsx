const navbar = () => {
    return (
        <ul className="nav nav-tabs">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Welcome to Quiz-online</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/create-quiz">Create a New Quiz</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/all-quizzes">Manage existing Quizzes</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
    )
}

export default navbar;