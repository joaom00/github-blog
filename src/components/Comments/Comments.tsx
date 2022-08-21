import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ConfusedIcon } from '../../icons/Confused'
import { EyesIcon } from '../../icons/Eyes'
import { HeartIcon } from '../../icons/Heart'
import { HoorayIcon } from '../../icons/Hooray'
import { LaughIcon } from '../../icons/Laugh'
import { RocketIcon } from '../../icons/Rocket'
import { ThumbsDownIcon } from '../../icons/ThumbsDown'
import { ThumbsUpIcon } from '../../icons/ThumbsUp'
import type { CommentProp } from '../../pages/posts/[issueNumber]'
import styles from './styles.module.scss'

interface CommentsProps {
  comments: Array<CommentProp>
}

function isEmpty<T>(array: ReadonlyArray<T> | undefined) {
  return !!array && array.length === 0
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Comentários ({comments.length})</span>
      <div className={styles.commentsContainer}>
        {isEmpty(comments) ? (
          <div className={styles.empty}>Nenhum comentário ainda...</div>
        ) : (
          <>
            {comments.map((comment) => (
              <div className={styles.comment} key={comment.id}>
                <img src={comment.author.avatar} alt={`Avatar de ${comment.author.username}`} />
                <div>
                  <p>{comment.author.username}</p>
                  <span>{comment.author.bio}</span>
                </div>
                <span>
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
                <p>{comment.body}</p>
                <div className={styles.reactions}>
                  {Boolean(comment.reactions['+1']) && (
                    <div>
                      <ThumbsUpIcon />
                      {comment.reactions['+1']}
                    </div>
                  )}
                  {Boolean(comment.reactions['-1']) && (
                    <div>
                      <ThumbsDownIcon />
                      {comment.reactions['-1']}
                    </div>
                  )}
                  {Boolean(comment.reactions.laugh) && (
                    <div>
                      <LaughIcon />
                      {comment.reactions.laugh}
                    </div>
                  )}
                  {Boolean(comment.reactions.hooray) && (
                    <div>
                      <HoorayIcon />
                      {comment.reactions.hooray}
                    </div>
                  )}
                  {Boolean(comment.reactions.confused) && (
                    <div>
                      <ConfusedIcon />
                      {comment.reactions.confused}
                    </div>
                  )}
                  {Boolean(comment.reactions.heart) && (
                    <div>
                      <HeartIcon />
                      {comment.reactions.heart}
                    </div>
                  )}
                  {Boolean(comment.reactions.rocket) && (
                    <div>
                      <RocketIcon />
                      {comment.reactions.rocket}
                    </div>
                  )}
                  {Boolean(comment.reactions.eyes) && (
                    <div>
                      <EyesIcon />
                      {comment.reactions.eyes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
